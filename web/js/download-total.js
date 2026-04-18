const GITHUB_RELEASES_API =
    'https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/releases?per_page=100';

function getStrings() {
    const lang = document.documentElement.lang || 'en';
    if (lang.startsWith('zh-Hant')) {
        return {
            loading: '…',
            label: (n) => `累計下載 ${n} 次`,
        };
    }
    if (lang.startsWith('zh')) {
        return {
            loading: '…',
            label: (n) => `累计下载 ${n} 次`,
        };
    }
    return {
        loading: '…',
        label: (n) => `Total downloads: ${n}`,
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
    let url = GITHUB_RELEASES_API;
    while (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        out.push(...(await res.json()));
        url = parseNextUrl(res.headers.get('Link'));
    }
    return out;
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

document.addEventListener('DOMContentLoaded', async () => {
    const el = document.getElementById('downloadTotal');
    if (!el) return;

    const str = getStrings();
    const locale = localeFromDoc();
    el.textContent = str.loading;

    try {
        const releases = await fetchAllReleases();
        const n = sumReleaseDownloads(releases);
        const formatted = new Intl.NumberFormat(locale).format(n);
        el.textContent = str.label(formatted);
    } catch (e) {
        console.error('download-total:', e);
        el.remove();
    }
});
