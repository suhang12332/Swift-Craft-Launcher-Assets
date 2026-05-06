const GITHUB_RELEASES_API =
    'https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/releases?per_page=100';
const GITHUB_LATEST_RELEASE_API =
    'https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/releases/latest';
const FALLBACK_LATEST_URL =
    'https://github.com/suhang12332/Swift-Craft-Launcher/releases/latest';

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

async function fetchLatestRelease() {
    const res = await fetch(ghWrap(GITHUB_LATEST_RELEASE_API));
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
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
    const arm64 = assets.find(
        (a) =>
            a.browser_download_url &&
            a.browser_download_url.includes('arm64')
    );
    const x86 = assets.find(
        (a) =>
            a.browser_download_url &&
            a.browser_download_url.includes('x86_64')
    );
    return { arm64, x86 };
}

function wireNativeDownloadSelect(select) {
    select.addEventListener('change', () => {
        const url = select.value;
        if (!url) return;
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
    const { arm64, x86 } = pickDmgByArch(release);

    const armUrl = ghWrap(arm64?.browser_download_url || FALLBACK_LATEST_URL);
    const x86Url = ghWrap(x86?.browser_download_url || FALLBACK_LATEST_URL);

    if (optArm) optArm.value = armUrl;
    if (optX86) optX86.value = x86Url;
    select.disabled = false;
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

    if (statOpt) {
        jobs.push(
            fetchAllReleases()
                .then((releases) => {
                    const n = sumReleaseDownloads(releases);
                    const formatted = new Intl.NumberFormat(locale).format(n);
                    statOpt.textContent = str.label(formatted);
                })
                .catch((e) => {
                    console.error('download-total:', e);
                    statOpt.remove();
                    if (select && select.options.length > 0) {
                        select.selectedIndex = 0;
                    }
                })
        );
    }

    if (select) {
        jobs.push(
            fetchLatestRelease()
                .then((rel) => {
                    applyLatestToSelect(select, rel);
                })
                .catch((e) => {
                    console.error('download-links:', e);
                    applyLatestToSelect(select, { assets: [] });
                })
        );
    }

    await Promise.allSettled(jobs);
});
