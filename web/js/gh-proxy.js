/**
 * 中国大陆网络下为 GitHub 相关 URL 增加反向代理前缀（默认 gh-proxy.com）。
 * 仅影响 fetch / 由脚本写入的链接，不修改静态 HTML 里的 GitHub 链接。
 *
 * 与页面语言无关：简体 / 英文 / 繁体等入口均加载本脚本，共用同一套地域检测与 sessionStorage（scl-gh-cn）。
 *
 * gh-proxy 等公共服务通常只转发「资源直链」，拒绝 HTML（如 /releases/latest、/blob/）。
 *
 * 地域：Cloudflare trace → ipapi；结果写入 sessionStorage。
 * 若曾误判为「非国内」，可调用 sclGhProxy.clearCache() 再试。
 *
 * 可选强制（调试 / 部署）：?ghproxy=1、localStorage scl-gh-proxy-force、meta scl-gh-proxy。
 */
(function () {
    'use strict';

    /** 与目标 URL 拼接：{PROXY}{完整 https://...} */
    const PROXY_PREFIX = 'https://gh-proxy.com/';
    const SESSION_KEY = 'scl-gh-cn';
    const FORCE_SESSION_KEY = 'scl-gh-proxy-force-session';
    const LOG_PREFIX = '[scl-gh-proxy]';

    function logRegion(decision) {
        const parts = [
            decision.useGhProxy ? 'useGhProxy=yes' : 'useGhProxy=no',
            `path=${decision.path}`,
            `ipLookup=${decision.ipLookup}`,
            `sessionCache=${decision.sessionCache}`,
            `sessionKey=${decision.sessionKey}`
        ];
        if (decision.ipSource) parts.push(`ipSource=${decision.ipSource}`);
        if (decision.forceReason) parts.push(`force=${decision.forceReason}`);
        console.log(`${LOG_PREFIX} ${parts.join(' | ')}`);
    }

    function shouldWrap(url) {
        if (!url || typeof url !== 'string') return false;
        try {
            const u = new URL(url);
            const h = u.hostname.toLowerCase();
            if (h === 'api.github.com') return true;
            if (h === 'raw.githubusercontent.com') return true;
            if (h === 'objects.githubusercontent.com') return true;
            if (h === 'avatars.githubusercontent.com') return true;
            if (h === 'github.com' || h === 'www.github.com') {
                const p = u.pathname;
                return p.includes('/releases/download/');
            }
            return false;
        } catch {
            return false;
        }
    }

    function wrap(url) {
        if (!window.__sclGhUseProxy) return url;
        if (!shouldWrap(url)) return url;
        const base = PROXY_PREFIX.replace(/\/+$/, '');
        return `${base}/${url}`;
    }

    async function fetchWithTimeout(url, ms) {
        const ctrl = new AbortController();
        const id = setTimeout(() => ctrl.abort(), ms);
        try {
            return await fetch(url, { signal: ctrl.signal });
        } finally {
            clearTimeout(id);
        }
    }

    async function detectFromIpApi() {
        const res = await fetchWithTimeout('https://ipapi.co/json/', 4500);
        if (!res.ok) throw new Error(String(res.status));
        const j = await res.json();
        return String(j.country_code || '').toUpperCase() === 'CN';
    }

    async function detectFromCloudflareTrace() {
        const res = await fetchWithTimeout(
            'https://www.cloudflare.com/cdn-cgi/trace',
            4500
        );
        if (!res.ok) throw new Error(String(res.status));
        const text = await res.text();
        const m = text.match(/^loc=(.+)$/m);
        return String(m ? m[1] : '').trim().toUpperCase() === 'CN';
    }

    function getForceProxyState() {
        try {
            const p = new URLSearchParams(window.location.search);
            if (p.get('ghproxy') === '1' || p.get('gh_proxy') === '1') {
                sessionStorage.setItem(FORCE_SESSION_KEY, '1');
                return { force: true, reason: 'url-param-ghproxy' };
            }
            if (sessionStorage.getItem(FORCE_SESSION_KEY) === '1') {
                return { force: true, reason: 'session-flag-ghproxy' };
            }
            if (localStorage.getItem('scl-gh-proxy-force') === '1') {
                return { force: true, reason: 'localStorage-scl-gh-proxy-force' };
            }
            const meta = document.querySelector('meta[name="scl-gh-proxy"]');
            const c = meta?.getAttribute('content')?.trim();
            if (c && /^(cn|force|1|true|yes)$/i.test(c)) {
                return { force: true, reason: 'meta-scl-gh-proxy' };
            }
        } catch (_) {
            /* ignore */
        }
        return { force: false, reason: null };
    }

    async function detectMainlandChina() {
        const forced = getForceProxyState();
        if (forced.force) {
            sessionStorage.setItem(SESSION_KEY, '1');
            logRegion({
                useGhProxy: true,
                path: 'force',
                forceReason: forced.reason,
                ipLookup: false,
                sessionCache: 'write',
                sessionKey: `${SESSION_KEY}=1`
            });
            return true;
        }

        const cached = sessionStorage.getItem(SESSION_KEY);
        if (cached === '1') {
            logRegion({
                useGhProxy: true,
                path: 'sessionStorage-cache',
                ipLookup: false,
                sessionCache: 'hit',
                sessionKey: `${SESSION_KEY}=1`
            });
            return true;
        }
        if (cached === '0') {
            logRegion({
                useGhProxy: false,
                path: 'sessionStorage-cache',
                ipLookup: false,
                sessionCache: 'hit',
                sessionKey: `${SESSION_KEY}=0`
            });
            return false;
        }

        let cn = false;
        let ipSource = 'none';
        try {
            cn = await detectFromCloudflareTrace();
            ipSource = 'cloudflare-cdn-cgi-trace';
        } catch {
            try {
                cn = await detectFromIpApi();
                ipSource = 'ipapi.co';
            } catch {
                cn = false;
                ipSource = 'failed (cloudflare+ipapi)';
            }
        }
        sessionStorage.setItem(SESSION_KEY, cn ? '1' : '0');
        logRegion({
            useGhProxy: cn,
            path: 'ip-detection',
            ipLookup: true,
            ipSource,
            sessionCache: 'write',
            sessionKey: `${SESSION_KEY}=${cn ? '1' : '0'}`
        });
        return cn;
    }

    let initPromise = null;

    window.sclGhProxy = {
        wrap(url) {
            return wrap(url);
        },
        ensureInit() {
            if (!initPromise) {
                initPromise = detectMainlandChina().then((cn) => {
                    window.__sclGhUseProxy = cn;
                    return cn;
                });
            }
            return initPromise;
        },
        isProxyActive() {
            return !!window.__sclGhUseProxy;
        },
        clearCache() {
            try {
                sessionStorage.removeItem(SESSION_KEY);
                sessionStorage.removeItem(FORCE_SESSION_KEY);
            } catch (_) {
                /* ignore */
            }
            initPromise = null;
            window.__sclGhUseProxy = false;
        }
    };
})();
