document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("languageSelector")
    .addEventListener("change", function () {
      window.location.href = this.value;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("themeSelector");
  const buttons = Array.from(themeSelector.children);
  const htmlElement = document.documentElement;

  // 应用主题
  function applyTheme(theme) {
    if (theme) {
      htmlElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } else {
      htmlElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
    updateActiveButton(theme);
  }

  // 更新按钮状态
  function updateActiveButton(theme) {
    buttons.forEach((btn) =>
      btn.classList.remove("text-white", "bg-button-blue")
    );
    const index = theme === "light" ? 0 : theme === "dark" ? 1 : 2;
    buttons[index].classList.add("text-white", "bg-button-blue");
  }

  // 初始化：从 localStorage 或系统偏好获取主题
  let savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme);

  // 按钮事件绑定
  const themes = ["light", "dark", null];
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => applyTheme(themes[index]));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const langRaw = navigator.language || "en";
  const language = langRaw.toLowerCase();
  const htmlLangRaw = document.documentElement.lang || "";
  const htmlLang = htmlLangRaw.toLowerCase();

  // 统一映射语言到站点支持的三类
  const mapToSiteLocale = (l) => {
    if (!l) return "en";
    if (l.startsWith("zh")) {
      if (
        l.includes("tw") ||
        l.includes("hk") ||
        l.includes("mo") ||
        l.includes("hant")
      ) {
        return "zh-tw";
      }
      return "zh-cn";
    }
    return "en";
  };

  const browserLocale = mapToSiteLocale(language);
  const pageLocale = mapToSiteLocale(htmlLang);

  const textByLocale = {
    en: "View in English",
    "zh-cn": "查看简体中文页面",
    "zh-tw": "查看繁體中文頁面",
  };
  const hrefByLocale = {
    en: "/swift-craft-launcher-web.github.io/",
    "zh-cn": "./zh-cn",
    "zh-tw": "./zh-tw",
  };

  // 如果页面语言和浏览器语言不一致，显示提示
  if (pageLocale !== browserLocale) {
    const banner = document.createElement("div");
    banner.id = "banner";
    banner.className =
      "w-full h-[52px] relative bg-black z-5 flex justify-center items-center px-5";

    banner.innerHTML = `
      <div class="flex justify-center text-sm max-w-5xl w-full relative">
        <a id="lang-Link" href="${hrefByLocale[browserLocale]}" 
           class="group flex text-blue-500 items-center">
          <span id="lang" class="group-hover:underline flex items-center">${textByLocale[browserLocale]}
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 3.28125 5.44922" class="h-2.5 w-2.5 ml-1"> <g> <rect height="5.44922" opacity="0" width="3.28125" x="0" y="0"/> <path d="M3.28125 2.72266C3.28125 2.63672 3.25 2.55859 3.18359 2.49219L0.769531 0.09375C0.710938 0.03125 0.632812 0 0.542969 0C0.359375 0 0.21875 0.136719 0.21875 0.320312C0.21875 0.40625 0.257812 0.488281 0.3125 0.550781L2.49609 2.72266L0.3125 4.89453C0.257812 4.95703 0.21875 5.03516 0.21875 5.125C0.21875 5.30859 0.359375 5.44531 0.542969 5.44531C0.632812 5.44531 0.710938 5.41406 0.769531 5.35156L3.18359 2.95312C3.25 2.88672 3.28125 2.80859 3.28125 2.72266Z" fill="#2997ff" /> </g> </svg>
          </span>
        </a>
        <button id="close-banner" 
          class="h-full absolute right-0 cursor-pointer"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 5.46779 4.91211" class="h-2.5 w-2.5"> <g> <rect height="4.91211" opacity="0" width="5.46779" x="0" y="0"/> <path d="M0.0893615 4.82129C0.214361 4.94238 0.417486 4.94238 0.53858 4.82129L2.45264 2.90332L4.37061 4.82129C4.4878 4.94238 4.69483 4.94238 4.81592 4.82129C4.93702 4.69629 4.93702 4.49316 4.81592 4.37598L2.89796 2.45801L4.81592 0.543945C4.93702 0.422852 4.94092 0.21582 4.81592 0.0947266C4.69092-0.0224609 4.4878-0.0224609 4.37061 0.0947266L2.45264 2.0127L0.53858 0.0947266C0.417486-0.0224609 0.210455-0.0263672 0.0893615 0.0947266C-0.027826 0.219727-0.027826 0.422852 0.0893615 0.543945L2.00733 2.45801L0.0893615 4.37598C-0.027826 4.49316-0.0317323 4.7002 0.0893615 4.82129Z" fill="white"/> </g> </svg></button>
      </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);

    // 关闭按钮
    const closeBtn = banner.querySelector("#close-banner");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => banner.remove());

    }
  }
});

// 处理手机端导航栏
function handleNavbar(func, wait) {
  const toggle = document.getElementById("header-toggle");
  const header = document.querySelector(".header");

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      window.addEventListener("scroll", () => {
        toggle.checked = false;
      });
      document.addEventListener("click", (e) => {
        if (header.contains(e.target) || toggle.contains(e.target)) {
          return;
        }
        toggle.checked = false;
      });
    }
  });
}

// 处理下载链接
async function handleDownloadLink() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/releases/latest"
    );

    const data = await res.json();
    const assets = data.assets.filter((a) => a && a.name && a.name.endsWith(".dmg"));

    const arm64 = assets.find(
      (a) => a.browser_download_url && a.browser_download_url.includes("arm64")
    );
    const x86 = assets.find(
      (a) => a.browser_download_url && a.browser_download_url.includes("x86_64")
    );

    console.log("当前最新版本：", data.tag_name);
    console.log("Apple Silicon：", arm64.browser_download_url);
    console.log("Intel：", x86.browser_download_url);

    document.getElementById("arm64").href = arm64.browser_download_url;
    document.getElementById("x86_64").href = x86.browser_download_url;
  } catch (error) {
    console.error("获取或处理下载链接时发生错误：", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  handleNavbar();
  handleDownloadLink();
});
