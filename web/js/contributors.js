// 渲染贡献者头像
function renderContributors(contributors, container) {
    if (!container) {
        console.error('Contributors container not found');
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 渲染贡献者头像
    contributors.forEach(contributor => {
        // 获取显示名称，优先使用 name，如果没有则使用 login
        const displayName = contributor.name || contributor.login || 'Contributor';
        const isEmoji = contributor.avatar && /^[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}]+$/u.test(contributor.avatar);
        
        if (isEmoji) {
            // 如果是 emoji，创建 span 元素
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'contributor-avatar-emoji';
            emojiSpan.textContent = contributor.avatar;
            emojiSpan.title = displayName;
            emojiSpan.setAttribute('aria-label', displayName);
            if (contributor.url || contributor.html_url) {
                emojiSpan.style.cursor = 'pointer';
                emojiSpan.addEventListener('click', () => {
                    window.open(contributor.url || contributor.html_url, '_blank');
                });
            }
            container.appendChild(emojiSpan);
        } else {
            // 如果是图片 URL，创建 img 元素
            const img = document.createElement('img');
            img.src = contributor.avatar || contributor.avatar_url;
            img.alt = displayName;
            img.className = 'contributor-avatar';
            img.title = displayName;
            img.setAttribute('aria-label', displayName);
            if (contributor.url || contributor.html_url) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    window.open(contributor.url || contributor.html_url, '_blank');
                });
            }
            // 添加错误处理
            img.onerror = function() {
                // 如果图片加载失败，使用 emoji 作为后备
                const emojiSpan = document.createElement('span');
                emojiSpan.className = 'contributor-avatar-emoji';
                emojiSpan.textContent = '👤';
                emojiSpan.title = displayName;
                emojiSpan.setAttribute('aria-label', displayName);
                if (contributor.url || contributor.html_url) {
                    emojiSpan.style.cursor = 'pointer';
                    emojiSpan.addEventListener('click', () => {
                        window.open(contributor.url || contributor.html_url, '_blank');
                    });
                }
                container.replaceChild(emojiSpan, img);
            };
            container.appendChild(img);
        }
    });
}

// 从 GitHub API 加载贡献者（仅调用 API，不回退）
async function loadGitHubContributors(container) {
    try {
        const response = await fetch('https://api.github.com/repos/suhang12332/Swift-Craft-Launcher/contributors?per_page=100');
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const contributors = await response.json();
        
        // 转换 GitHub API 格式为统一格式
        const formattedContributors = contributors.map(contributor => ({
            name: contributor.login,
            login: contributor.login,
            avatar: contributor.avatar_url,
            avatar_url: contributor.avatar_url,
            url: contributor.html_url,
            html_url: contributor.html_url
        }));
        
        renderContributors(formattedContributors, container);
        
        // 在网格最后添加"More"链接
        const moreLink = document.createElement('a');
        moreLink.href = 'https://github.com/suhang12332/Swift-Craft-Launcher/graphs/contributors';
        moreLink.className = 'contributor-more-link';
        moreLink.target = '_blank';
        moreLink.rel = 'noopener noreferrer';
        // 根据页面语言设置文本
        const lang = document.documentElement.lang || 'en';
        const moreText = lang.startsWith('zh-Hant') ? '更多' : lang.startsWith('zh-Hans') ? '更多' : 'More';
        moreLink.textContent = moreText;
        moreLink.title = lang.startsWith('zh-Hant') ? '查看所有貢獻者' : lang.startsWith('zh-Hans') ? '查看所有贡献者' : 'View all contributors';
        container.appendChild(moreLink);
    } catch (error) {
        console.error('Failed to load contributors from GitHub API:', error);
        // GitHub API 失败时不显示任何内容或显示错误提示
        container.innerHTML = '';
    }
}

// 从本地 JSON 加载核心贡献者（仅解析本地文件，只显示前8个）
async function loadCoreContributors(container) {
    try {
        // 根据当前页面路径确定 contributors.json 的相对路径
        const isSubDir = window.location.pathname.includes('/zh-Hans/') || window.location.pathname.includes('/zh-Hant/') || window.location.pathname.includes('/en/');
        const jsonPath = isSubDir ? '../../contributors/contributors.json' : '../contributors/contributors.json';
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error('Failed to load local contributors');
        }
        
        const data = await response.json();
        const contributors = data.contributors || [];
        
        // 只显示前8个（两排，每排4个）
        const maxDisplay = 8;
        const displayContributors = contributors.slice(0, maxDisplay);
        const hasMore = contributors.length > maxDisplay;
        
        renderContributors(displayContributors, container);
        
        // 如果有更多贡献者，添加省略号
        if (hasMore) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'contributor-ellipsis';
            ellipsis.textContent = '...';
            // 根据页面语言设置提示文本
            const lang = document.documentElement.lang || 'en';
            const remainingCount = contributors.length - maxDisplay;
            if (lang.startsWith('zh-Hant')) {
                ellipsis.title = `還有 ${remainingCount} 位貢獻者`;
            } else if (lang.startsWith('zh-Hans')) {
                ellipsis.title = `还有 ${remainingCount} 位贡献者`;
            } else {
                ellipsis.title = `${remainingCount} more contributors`;
            }
            container.appendChild(ellipsis);
        }
    } catch (error) {
        console.error('Failed to load contributors from local JSON:', error);
        // 本地 JSON 加载失败时不显示任何内容
        container.innerHTML = '';
    }
}

// 加载所有贡献者信息
async function loadContributors() {
    // 加载 GitHub Contributors（仅调用 API）
    const githubContainer = document.querySelector('.contributors-avatars[data-source="github"]');
    if (githubContainer) {
        await loadGitHubContributors(githubContainer);
    }
    
    // 加载 Core Contributors（仅解析本地 JSON）
    const coreContainer = document.querySelector('.contributors-avatars[data-source="core"]');
    if (coreContainer) {
        await loadCoreContributors(coreContainer);
    }
}

// 页面加载完成后加载贡献者
document.addEventListener('DOMContentLoaded', loadContributors);
