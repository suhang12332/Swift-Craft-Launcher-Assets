document
    .getElementById("languageSelector")
    .addEventListener("change", function () {
        window.location.href = this.value;
    });

document.addEventListener('DOMContentLoaded', function () {
    const themeSelector = document.getElementById('themeSelector');
    const buttons = Array.from(themeSelector.children);
    const htmlElement = document.documentElement;

    // 应用主题
    function applyTheme(theme) {
        if (theme) {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        }
        updateActiveButton(theme);
    }

    // 更新按钮状态
    function updateActiveButton(theme) {
        buttons.forEach(btn => btn.classList.remove('text-white', 'bg-button-blue'));
        const index = theme === 'light' ? 0 : theme === 'dark' ? 1 : 2;
        buttons[index].classList.add('text-white', 'bg-button-blue');
    }

    // 初始化：从 localStorage 或系统偏好获取主题
    let savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme);

    // 按钮事件绑定
    const themes = ['light', 'dark', null];
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => applyTheme(themes[index]));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const langRaw = navigator.language || 'en';
    const language = langRaw.toLowerCase();
    const htmlLangRaw = document.documentElement.lang || '';
    const htmlLang = htmlLangRaw.toLowerCase();

    // 统一映射语言到站点支持的三类
    const mapToSiteLocale = (l) => {
        if (!l) return 'en';
        if (l.startsWith('zh')) {
            if (
                l.includes('tw') ||
                l.includes('hk') ||
                l.includes('mo') ||
                l.includes('hant')
            ) {
                return 'zh-tw';
            }
            return 'zh-cn';
        }
        return 'en';
    };

    const browserLocale = mapToSiteLocale(language);
    const pageLocale = mapToSiteLocale(htmlLang);

    const textByLocale = {
        en: 'View in English',
        'zh-cn': '查看简体中文页面',
        'zh-tw': '查看繁體中文頁面',
    };
    const hrefByLocale = {
        en: '/swift-craft-launcher-web.github.io/',
        'zh-cn': '/swift-craft-launcher-web.github.io/zh-cn',
        'zh-tw': '/swift-craft-launcher-web.github.io/zh-tw',
    };

    // 如果页面语言和浏览器语言不一致，显示提示
    if (pageLocale !== browserLocale) {
        const banner = document.createElement('div');
        banner.id = 'banner';
        banner.className =
            'w-full h-[52px] bg-black z-2 flex justify-center items-center px-5';

        banner.innerHTML = `
      <div class="flex justify-center text-sm max-w-[1280px] w-full relative">
        <a id="lang-Link" href="${hrefByLocale[browserLocale]}" 
           class="group flex text-blue-500 items-center after:contain-content after:content-['􀆊'] after:ml-1 after:text-[9px]">
          <span id="lang" class="group-hover:underline">${textByLocale[browserLocale]}</span>
        </a>
        <button id="close-banner" 
          class="h-full text-white absolute right-0 text-[10px] flex justify-center items-center cursor-pointer">􀆄</button>
      </div>
    `;
        document.body.insertBefore(banner, document.body.firstChild);

        // 关闭按钮
        const closeBtn = banner.querySelector('#close-banner');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => banner.remove());
            localStorage
        }
    }
});



