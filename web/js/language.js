// 语言切换功能
(function() {
    'use strict';
    
    // 获取浏览器语言并映射到站点支持的语言
    function getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        const lang = browserLang.toLowerCase();
        
        // 映射到站点支持的语言
        if (lang.startsWith('zh')) {
            // 繁体中文：台湾、香港、澳门
            if (lang.includes('tw') || lang.includes('hk') || lang.includes('mo') || lang.includes('hant')) {
                return 'zh-Hant';
            }
            // 简体中文：其他中文地区
            return 'zh-Hans';
        }
        // 默认英文
        return 'en';
    }
    
    // 获取当前页面语言
    function getCurrentPageLanguage() {
        const path = window.location.pathname;
        if (path.includes('/zh-Hans/')) {
            return 'zh-Hans';
        } else if (path.includes('/zh-Hant/')) {
            return 'zh-Hant';
        } else if (path.includes('/en/')) {
            return 'en';
        }
        // 根目录默认为简体中文
        return 'zh-Hans';
    }

    // 获取当前页面文件名（用于在语言跳转时尽量保留当前页面）
    function getCurrentPageName() {
        const path = window.location.pathname;
        const last = path.lastIndexOf('/');
        const name = last >= 0 ? path.slice(last + 1) : path;
        return name || 'index.html';
    }
    
    // 获取语言对应的路径
    function getLanguagePath(lang) {
        const currentPath = window.location.pathname;
        const pageName = getCurrentPageName();
        const supportedPages = new Set(['index.html', 'history.html']);
        const targetPage = supportedPages.has(pageName) ? pageName : 'index.html';

        let basePath = '';
        // 如果当前在语言子目录中，需要返回到根目录
        if (currentPath.includes('/zh-Hans/') || currentPath.includes('/zh-Hant/') || currentPath.includes('/en/')) {
            basePath = '../';
        }

        switch(lang) {
            case 'zh-Hans':
                // 根目录即简体中文
                return basePath + targetPage;
            case 'zh-Hant':
                return basePath + 'zh-Hant/' + targetPage;
            case 'en':
                return basePath + 'en/' + targetPage;
            default:
                return basePath + 'index.html';
        }
    }
    
    // 检查是否需要自动跳转
    function checkAndRedirect() {
        // 检查用户是否手动选择过语言
        const userSelectedLang = localStorage.getItem('user-selected-language');
        
        // 如果用户手动选择过，不自动跳转
        if (userSelectedLang) {
            return;
        }
        
        const browserLang = getBrowserLanguage();
        const currentLang = getCurrentPageLanguage();
        
        // 如果当前语言与浏览器语言不匹配，自动跳转
        if (browserLang !== currentLang) {
            const targetPath = getLanguagePath(browserLang);
            window.location.href = targetPath;
        }
    }
    
    // 页面加载时检查并跳转
    // 立即执行检查，不等待 DOM 加载
    checkAndRedirect();
    
    // 根据选项值获取对应的语言
    function getLanguageFromOptionValue(value) {
        const currentPath = window.location.pathname;
        
        // 如果明确包含语言路径，直接判断
        if (value.includes('/zh-Hans/')) {
            return 'zh-Hans';
        } else if (value.includes('/zh-Hant/')) {
            return 'zh-Hant';
        } else if (value.includes('/en/')) {
            return 'en';
        }
        
        // ../index.html 总是指向根目录，是简体中文
        if (value === '../index.html') {
            return 'zh-Hans';
        }
        
        // 处理相对路径 index.html 的情况（不包含 ../）
        if (value === 'index.html') {
            // 如果当前在语言子目录中，index.html 指向当前目录的语言
            if (currentPath.includes('/en/')) {
                return 'en';
            } else if (currentPath.includes('/zh-Hant/')) {
                return 'zh-Hant';
            } else if (currentPath.includes('/zh-Hans/')) {
                return 'zh-Hans';
            } else {
                // 根目录的 index.html 是简体中文
                return 'zh-Hans';
            }
        }
        
        // 默认英文
        return 'en';
    }
    
    // 同步多个语言选择器的选中值
    function syncLanguageSelectors(selectors, selectedValue) {
        selectors.forEach(function(selector) {
            if (selector.value !== selectedValue) {
                selector.value = selectedValue;
            }
        });
    }

    // 监听语言选择器的变化，处理跳转和记录用户选择
    document.addEventListener('DOMContentLoaded', function() {
        const languageSelectors = Array.from(document.querySelectorAll('[data-language-selector]'));
        const legacySelector = document.getElementById('languageSelector');
        if (legacySelector && !languageSelectors.includes(legacySelector)) {
            languageSelectors.push(legacySelector);
        }

        if (!languageSelectors.length) {
            return;
        }

        // 设置当前选中项
        const currentLang = getCurrentPageLanguage();
        languageSelectors.forEach(function(selector) {
            const options = selector.options;
            for (let i = 0; i < options.length; i++) {
                const value = options[i].value;
                const optionLang = getLanguageFromOptionValue(value);
                if (optionLang === currentLang) {
                    options[i].selected = true;
                    break;
                }
            }
        });

        // 监听选择变化
        languageSelectors.forEach(function(selector) {
            selector.addEventListener('change', function() {
                const selectedValue = this.value;

                syncLanguageSelectors(languageSelectors, selectedValue);

                // 获取目标语言
                const selectedLang = getLanguageFromOptionValue(selectedValue);

                // 保存用户选择
                localStorage.setItem('user-selected-language', selectedLang);

                // 跳转到选中的语言版本
                window.location.href = selectedValue;
            });
        });
    });
})();

