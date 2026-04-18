// 按系统语言自动跳转
(function() {
    'use strict';

    function getSystemLanguage() {
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        const lang = browserLang.toLowerCase();
        if (lang.startsWith('zh')) {
            if (
                lang.includes('tw') ||
                lang.includes('hk') ||
                lang.includes('mo') ||
                lang.includes('hant')
            ) {
                return 'zh-Hant';
            }
            return 'zh-Hans';
        }
        return 'en';
    }

    function getCurrentPageLanguage() {
        const path = window.location.pathname;
        if (path.includes('/zh-Hant/')) {
            return 'zh-Hant';
        }
        if (path.includes('/en/')) {
            return 'en';
        }
        return 'zh-Hans';
    }

    function getCurrentPageName() {
        const path = window.location.pathname;
        const last = path.lastIndexOf('/');
        const pageName = last >= 0 ? path.slice(last + 1) : path;
        return pageName || 'index.html';
    }

    function getTargetPath(lang) {
        const pageName = getCurrentPageName();
        const supportedPages = new Set(['index.html', 'history.html']);
        const targetPage = supportedPages.has(pageName) ? pageName : 'index.html';
        const inLangFolder =
            window.location.pathname.includes('/zh-Hant/') ||
            window.location.pathname.includes('/en/');
        const basePath = inLangFolder ? '../' : '';

        if (lang === 'zh-Hant') {
            return basePath + 'zh-Hant/' + targetPage;
        }
        if (lang === 'en') {
            return basePath + 'en/' + targetPage;
        }
        return basePath + targetPage;
    }

    function redirectBySystemLanguage() {
        const systemLang = getSystemLanguage();
        const currentLang = getCurrentPageLanguage();
        if (systemLang !== currentLang) {
            window.location.replace(getTargetPath(systemLang));
        }
    }

    redirectBySystemLanguage();
})();

