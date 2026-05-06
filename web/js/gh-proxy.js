/**
 * 中国大陆网络下为 GitHub 相关 URL 增加反向代理前缀（默认 gh-proxy.com）。
 * 依赖浏览器端 IP 地域检测；仅影响 fetch / 由脚本写入的链接，不修改静态 HTML 里的 GitHub 链接。
 *
 * gh-proxy 等公共服务通常只转发「资源直链」，拒绝 HTML（如 /releases/latest、/blob/）。
 */
(function () {
    'use strict';

    /** 与目标 URL 拼接：{PROXY}{完整 https://...} */
    const PROXY_PREFIX = 'https://gh-proxy.com/';
    const SESSION_KEY = 'scl-gh-cn';

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

    async function detectMainlandChina() {
        const cached = sessionStorage.getItem(SESSION_KEY);
        if (cached === '1') return true;
        if (cached === '0') return false;

        let cn = false;
        try {
            cn = await detectFromIpApi();
        } catch {
            try {
                cn = await detectFromCloudflareTrace();
            } catch {
                cn = false;
            }
        }
        sessionStorage.setItem(SESSION_KEY, cn ? '1' : '0');
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
        }
    };
})();
