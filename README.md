# Swift Craft Launcher Assets

这是一个整合了 Swift Craft Launcher 所有相关资源的统一仓库。

## 仓库结构

本仓库整合了以下子项目：

### 📚 help/
**Swift-Craft-Launcher-Help** - macOS 应用帮助文档
- 包含多语言帮助文档（英文、简体中文、繁体中文）
- macOS Help Book 格式的帮助文档资源
- 目录结构：`SwiftCraftLauncher.help/Contents/Resources/`

### 📰 news/
**Swift-Craft-Launcher-News** - 版本公告

基于 GitHub Pages + GitHub Actions 的静态公告 API。

#### 使用方法

**添加公告**

在 `news/` 目录下创建 JSON 文件，文件名使用版本号格式：`[version].json`

例如：`0.3.1-beta.json`、`1.0.0.json`

JSON 格式（支持22种语言）：
```json
{
  "en": {
    "title": "Important Notice",
    "content": "Content",
    "author": "Swift Craft Launcher Team"
  },
  "zh-Hans": {
    "title": "重要通知",
    "content": "内容",
    "author": "Swift Craft Launcher 团队"
  },
  "es": {
    "title": "Aviso importante",
    "content": "Contenido",
    "author": "Equipo Swift Craft Launcher"
  }
}
```

**API 端点**

`/api/announcements/[version]/[lang].json`

示例：
- `/api/announcements/0.3.1-beta/en.json`
- `/api/announcements/0.3.1-beta/zh-Hans.json`

**使用函数**

```javascript
const { getAnnouncement } = require('./scripts/generate-api.js');
const result = getAnnouncement('0.3.1-beta', 'en');
```

**生成静态文件**

```bash
node scripts/generate-api.js
```

#### 支持的22种语言

ar, da, de, en, es, fi, fr, hi, it, ja, ko, nb, nl, pl, pt, ru, sv, th, tr, vi, zh-Hans, zh-Hant

### 👥 contributors/
**Swift-Craft-Launcher-Contributors** - 贡献者信息
- 包含贡献者列表和致谢信息
- JSON 格式的数据文件

### 🖼️ imagebed/
**Swift-Craft-Launcher-ImageBed** - 图床
- 用于存储 macOS 应用帮助文档的图片资源
- 按功能模块分类存储（注册、添加游戏、添加资源、设置、编辑皮肤等）

### 🌐 docs/
**Swift-Craft-Launcher-Web** - 前端代码
- 项目官网前端代码
- 包含多语言支持（英文、简体中文、繁体中文）
- 静态网站资源

## 原始仓库

- [Swift-Craft-Launcher-Help](https://github.com/suhang12332/Swift-Craft-Launcher-Help)
- [Swift-Craft-Launcher-News](https://github.com/suhang12332/Swift-Craft-Launcher-News)
- [Swift-Craft-Launcher-Contributors](https://github.com/suhang12332/Swift-Craft-Launcher-Contributors)
- [Swift-Craft-Launcher-HelpBook](https://github.com/suhang12332/Swift-Craft-Launcher-HelpBook)
- [swift-craft-launcher-web.github.io](https://github.com/suhang12332/swift-craft-launcher-web.github.io)

## 使用说明

各个子目录保持原有的结构和功能，可以独立使用。整合后的仓库便于统一管理和维护所有相关资源。

