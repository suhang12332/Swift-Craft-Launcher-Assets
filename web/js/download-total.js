const GITHUB_RELEASES_API =
    'https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/releases?per_page=100';
const GITHUB_REPO_OWNER = 'suhang12332';
const GITHUB_REPO_NAME = 'Swift-Craft-Launcher';

function ghWrap(url) {
    try {
        if (window.sclGhProxy && typeof window.sclGhProxy.wrap === 'function') {
            return window.sclGhProxy.wrap(url);
        }
    } catch (_) {
        /* ignore */
    }
    return url;
}

function getStrings() {
    const lang = document.documentElement.lang || 'en';
    if (lang.startsWith('zh-Hant')) {
        return {
            loading: '…',
            label: (n) => `累計下載 ${n} 次`,
            selectAria: '下載',
        };
    }
    if (lang.startsWith('zh')) {
        return {
            loading: '…',
            label: (n) => `累计下载 ${n} 次`,
            selectAria: '下载',
        };
    }
    return {
        loading: '…',
        label: (n) => `Total downloads: ${n}`,
        selectAria: 'Download',
    };
}

function localeFromDoc() {
    const lang = document.documentElement.lang || 'en';
    if (lang.startsWith('zh-Hant')) return 'zh-Hant';
    if (lang.startsWith('zh')) return 'zh-Hans';
    return lang;
}

function parseNextUrl(linkHeader) {
    if (!linkHeader) return null;
    for (const part of linkHeader.split(',')) {
        if (part.includes('rel="next"')) {
            const m = part.match(/<([^>]+)>/);
            return m ? m[1].trim() : null;
        }
    }
    return null;
}

async function fetchAllReleases() {
    const out = [];
    let url = ghWrap(GITHUB_RELEASES_API);
    while (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        out.push(...(await res.json()));
        const next = parseNextUrl(res.headers.get('Link'));
        url = next ? ghWrap(next) : null;
    }
    return out;
}

/** 与 GitHub 列表顺序一致：靠前即较新；优先正式版 */
function pickLatestRelease(releases) {
    if (!Array.isArray(releases)) return null;
    return (
        releases.find((r) => r && !r.draft && !r.prerelease) ||
        releases.find((r) => r && !r.draft) ||
        null
    );
}

function sumReleaseDownloads(releases) {
    let total = 0;
    for (const r of releases) {
        if (r.draft) continue;
        for (const a of r.assets || []) {
            total += a.download_count || 0;
        }
    }
    return total;
}

function pickDmgByArch(release) {
    const assets = (release.assets || []).filter(
        (a) => a && a.name && a.name.endsWith('.dmg')
    );
    const arm64 = assets.find((a) => /arm64/i.test(a.name));
    const x86 = assets.find((a) => /x86_64/i.test(a.name));
    return { arm64, x86 };
}

/** 来自 pickLatestRelease 的 tag_name；去掉前缀 v 以匹配 /releases/download/1.2.3/ */
function releaseDownloadPathSegment(release) {
    let tag = typeof release?.tag_name === 'string' ? release.tag_name.trim() : '';
    if (/^v\d/i.test(tag)) tag = tag.slice(1);
    return tag;
}

/**
 * 拼 GitHub /releases/download/{segment}/{filename} 直链。
 * 地域检测判定为 CN（与页面语言无关）时由 ghWrap 加 gh-proxy.com 前缀。
 */
function releaseAssetDownloadUrl(release, asset) {
    if (!release || !asset) return '';
    const name = typeof asset.name === 'string' ? asset.name.trim() : '';
    if (!name) return '';
    const segment = releaseDownloadPathSegment(release);
    if (!segment) return '';
    const raw = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/download/${encodeURIComponent(segment)}/${encodeURIComponent(name)}`;
    return ghWrap(raw);
}

function wireNativeDownloadSelect(select) {
    select.addEventListener('change', () => {
        const url = select.value;
        if (!url) return;
        console.log('[Swift Craft Launcher] download URL:', url);
        const a = document.createElement('a');
        a.href = url;
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        a.remove();
        select.selectedIndex = 0;
    });
}

function applyLatestToSelect(select, release) {
    const optArm = document.getElementById('downloadOptArm64');
    const optX86 = document.getElementById('downloadOptX86');
    if (!select) return;

    if (!release) {
        if (optArm) {
            optArm.value = '';
            optArm.disabled = true;
        }
        if (optX86) {
            optX86.value = '';
            optX86.disabled = true;
        }
        select.disabled = true;
        return;
    }

    const { arm64, x86 } = pickDmgByArch(release);
    const armUrl = arm64 ? releaseAssetDownloadUrl(release, arm64) : '';
    const x86Url = x86 ? releaseAssetDownloadUrl(release, x86) : '';

    if (optArm) {
        optArm.value = armUrl;
        optArm.disabled = !armUrl;
    }
    if (optX86) {
        optX86.value = x86Url;
        optX86.disabled = !x86Url;
    }

    select.disabled = !armUrl && !x86Url;

    const proxyOn =
        typeof window.sclGhProxy?.isProxyActive === 'function'
            ? window.sclGhProxy.isProxyActive()
            : !!window.__sclGhUseProxy;
    console.log(
        '[Swift Craft Launcher] download links ready — gh-proxy (geo IP):',
        proxyOn,
        '| arm:',
        armUrl || '(none)',
        '| intel:',
        x86Url || '(none)'
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    if (window.sclGhProxy && typeof window.sclGhProxy.ensureInit === 'function') {
        await window.sclGhProxy.ensureInit();
    }

    const statOpt = document.getElementById('downloadStatOption');
    const select = document.getElementById('downloadArchSelect');
    const str = getStrings();
    const locale = localeFromDoc();

    if (select) {
        select.disabled = true;
        select.setAttribute('aria-label', str.selectAria);
        wireNativeDownloadSelect(select);
    }

    if (statOpt) statOpt.textContent = `· ${str.loading}`;

    const jobs = [];

    if (statOpt || select) {
        jobs.push(
            fetchAllReleases()
                .then((releases) => {
                    if (statOpt) {
                        const n = sumReleaseDownloads(releases);
                        const formatted = new Intl.NumberFormat(locale).format(n);
                        statOpt.textContent = str.label(formatted);
                    }
                    if (select) {
                        applyLatestToSelect(select, pickLatestRelease(releases));
                    }
                })
                .catch((e) => {
                    console.error('download-total:', e);
                    if (statOpt) {
                        statOpt.remove();
                        if (select && select.options.length > 0) {
                            select.selectedIndex = 0;
                        }
                    }
                    if (select) applyLatestToSelect(select, null);
                })
        );
    }

    await Promise.allSettled(jobs);
});
