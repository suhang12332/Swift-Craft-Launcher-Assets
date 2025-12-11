const fs = require('fs');
const path = require('path');

// 支持的22种语言代码
const supportedLanguages = [
  'ar', 'da', 'de', 'en', 'es', 'fi', 'fr', 'hi', 'it', 'ja', 'ko',
  'nb', 'nl', 'pl', 'pt', 'ru', 'sv', 'th', 'tr', 'vi', 'zh-Hans', 'zh-Hant'
];

// 根据版本号和语言获取公告内容
function getAnnouncement(version, lang) {
  const newsDir = path.join(__dirname, '..', 'news');
  const filePath = path.join(newsDir, `${version}.json`);

  if (!fs.existsSync(filePath)) {
    return {
      success: false,
      error: 'Announcement not found',
      message: `Version ${version} does not exist`
    };
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const announcement = JSON.parse(content);

    // 新格式：直接按语言获取
    const langData = announcement[lang];
    if (!langData) {
      return {
        success: false,
        error: 'Language not found',
        message: `Language ${lang} not found for version ${version}`
      };
    }

    return {
      success: true,
      data: {
        title: langData.title || '',
        content: langData.content || '',
        author: langData.author || ''
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Parse error',
      message: error.message
    };
  }
}

// 生成所有版本的静态 API 文件（用于 GitHub Pages）
function generateAllAPIs() {
  const apiDir = path.join(__dirname, '..', 'api');
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  const newsDir = path.join(__dirname, '..', 'news');
  if (!fs.existsSync(newsDir)) {
    console.log('No news directory found');
    return;
  }

  const files = fs.readdirSync(newsDir)
    .filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.log('No announcement files found');
    return;
  }

  files.forEach(file => {
    const version = path.basename(file, '.json');
    const announcementDir = path.join(apiDir, 'announcements', version);
    if (!fs.existsSync(announcementDir)) {
      fs.mkdirSync(announcementDir, { recursive: true });
    }

    // 为每种语言生成静态 JSON 文件
    supportedLanguages.forEach(lang => {
      const result = getAnnouncement(version, lang);
      fs.writeFileSync(
        path.join(announcementDir, `${lang}.json`),
        JSON.stringify(result, null, 2),
        'utf-8'
      );
    });
  });

  console.log(`✅ Generated API files for ${files.length} version(s) in ${supportedLanguages.length} languages`);
}

// 命令行调用：生成所有静态文件（用于 GitHub Actions）
if (require.main === module) {
  generateAllAPIs();
}

// 导出函数供其他模块使用
module.exports = { getAnnouncement };

