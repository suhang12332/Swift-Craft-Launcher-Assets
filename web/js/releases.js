// Render release notes (Markdown) into the Version History page.
// Release file list is read from repository directory via GitHub API.
(function () {
  'use strict';

  const DEFAULT_RELEASES_BASE =
    'https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/main/releases-notes/';

  async function tryFetchJson(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  }

  async function tryFetchText(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.text();
  }

  function parseReleasesBase(baseUrl) {
    // Example:
    //   https://raw.githubusercontent.com/<owner>/<repo>/<ref>/releases-notes/
    const m = String(baseUrl).match(
      /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/releases-notes\/?$/
    );
    if (!m) return null;
    return { owner: m[1], repo: m[2], ref: m[3] };
  }

  function versionSortKey(filename) {
    const v = filenameToVersion(filename);
    const m = v.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
    if (!m) return [-1, -1, -1, 1, v];
    const major = Number(m[1]);
    const minor = Number(m[2]);
    const patch = Number(m[3]);
    const suffix = m[4] || '';
    const isPrerelease = suffix ? 1 : 0; // stable first when sorting desc by this key
    return [major, minor, patch, -isPrerelease, suffix];
  }

  function compareVersionFilesDesc(a, b) {
    const ka = versionSortKey(a);
    const kb = versionSortKey(b);
    for (let i = 0; i < Math.min(ka.length, kb.length); i++) {
      if (ka[i] < kb[i]) return 1;
      if (ka[i] > kb[i]) return -1;
    }
    return a.localeCompare(b);
  }

  function parseGitHubPagesRepoInfo() {
    const host = String(window.location.hostname || '');
    const owner = host.endsWith('.github.io') ? host.slice(0, -'.github.io'.length) : '';
    const segs = String(window.location.pathname || '').split('/').filter(Boolean);
    const repo = segs.length > 0 ? segs[0] : '';
    return { owner, repo };
  }

  function getRepoRef() {
    const meta = document.querySelector('meta[name="releases-ref"]');
    const ref = meta?.getAttribute('content')?.trim();
    return ref || 'main';
  }

  function getDirectoryPathFromBaseUrl(baseUrl) {
    try {
      const u = new URL(baseUrl, window.location.href);
      const p = String(u.pathname || '').replace(/^\/+|\/+$/g, '');
      const segs = p.split('/').filter(Boolean);
      const i = segs.lastIndexOf('releases-notes');
      if (i >= 0) return segs.slice(i).join('/');
      return 'releases-notes';
    } catch (_) {
      return 'releases-notes';
    }
  }

  async function loadReleaseFilesFromDirectory(baseUrl) {
    const parsed = parseReleasesBase(baseUrl);
    let owner = '';
    let repo = '';
    let ref = '';
    if (parsed) {
      owner = parsed.owner;
      repo = parsed.repo;
      ref = parsed.ref;
    } else {
      const inferred = parseGitHubPagesRepoInfo();
      owner = inferred.owner;
      repo = inferred.repo;
      ref = getRepoRef();
    }
    if (!owner || !repo) return null;
    const releasesPath = parsed ? 'releases-notes' : getDirectoryPathFromBaseUrl(baseUrl);
    const apiUrl = `https://api.github.com/repos/${encodeURIComponent(
      owner
    )}/${encodeURIComponent(repo)}/contents/${releasesPath}?ref=${encodeURIComponent(ref)}`;

    const data = await tryFetchJson(apiUrl);
    if (!Array.isArray(data)) return null;

    const files = data
      .filter((item) => item && item.type === 'file' && typeof item.name === 'string')
      .map((item) => item.name)
      .filter((name) => name.toLowerCase().endsWith('.md'));

    files.sort(compareVersionFilesDesc);
    return files.length ? files : null;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  // A tiny markdown renderer for the project's release notes format:
  // - `## Heading` -> <h3>
  // - `- item` -> <ul><li>
  // - blank lines separate blocks
  function renderMarkdown(md) {
    const lines = String(md).replaceAll('\r\n', '\n').split('\n');
    let html = '';
    let inList = false;

    function closeList() {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
    }

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      const trimmed = line.trim();

      if (!trimmed) {
        closeList();
        continue;
      }

      if (trimmed.startsWith('## ')) {
        closeList();
        html += `<h3>${escapeHtml(trimmed.slice(3))}</h3>`;
        continue;
      }

      if (trimmed.startsWith('# ')) {
        closeList();
        html += `<h2>${escapeHtml(trimmed.slice(2))}</h2>`;
        continue;
      }

      if (trimmed.startsWith('- ')) {
        if (!inList) {
          html += '<ul class="release-ul">';
          inList = true;
        }
        html += `<li>${escapeHtml(trimmed.slice(2))}</li>`;
        continue;
      }

      closeList();
      html += `<p>${escapeHtml(trimmed)}</p>`;
    }

    closeList();
    return html;
  }

  function filenameToVersion(filename) {
    return filename.replace(/\.md$/i, '');
  }

  async function fetchText(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  }

  function setBusy(el, busy) {
    if (!el) return;
    el.setAttribute('aria-busy', busy ? 'true' : 'false');
  }

  function setSelected(listEl, version) {
    if (!listEl) return;
    for (const a of listEl.querySelectorAll('a[data-version]')) {
      a.classList.toggle('is-selected', a.dataset.version === version);
      a.setAttribute('aria-current', a.dataset.version === version ? 'page' : 'false');
    }
  }

  async function showRelease({ baseUrl, filename, listEl, contentEl, titleEl, rawLinkEl }) {
    const version = filenameToVersion(filename);
    setSelected(listEl, version);
    if (titleEl) titleEl.textContent = version;
    if (!contentEl) return;

    setBusy(contentEl, true);
    contentEl.innerHTML = '';

    const url = baseUrl + filename;
    try {
      const md = await fetchText(url);
      contentEl.innerHTML = renderMarkdown(md);
      if (rawLinkEl) rawLinkEl.setAttribute('href', url);
      const rawLink = contentEl.parentElement?.querySelector('[data-raw-link="release"]');
      if (rawLink) rawLink.setAttribute('href', url);
    } catch (e) {
      const msg = escapeHtml(String(e && e.message ? e.message : e));
      contentEl.innerHTML =
        `<p class="release-error">无法加载该版本的更新内容。` +
        `</p><p class="release-error-detail">` +
        `请求：<code>${escapeHtml(url)}</code><br>` +
        `错误：<code>${msg}</code></p>`;
    } finally {
      setBusy(contentEl, false);
    }
  }

  function getBaseUrl() {
    const meta = document.querySelector('meta[name="releases-base"]');
    const fromMeta = meta?.getAttribute('content')?.trim();
    return fromMeta || DEFAULT_RELEASES_BASE;
  }

  function toGitHubBlobUrl(baseUrl, filename) {
    // Convert:
    //   https://raw.githubusercontent.com/<owner>/<repo>/<ref>/releases-notes/
    // to:
    //   https://github.com/<owner>/<repo>/blob/<ref>/releases-notes/<filename>
    const m = String(baseUrl).match(
      /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/releases-notes\/?$/
    );
    if (!m) return baseUrl + filename;
    const owner = m[1];
    const repo = m[2];
    const ref = m[3];
    return `https://github.com/${owner}/${repo}/blob/${ref}/releases-notes/${filename}`;
  }

  function makeTask({ version, filename, baseUrl, initiallyOpen }) {
    const task = document.createElement('div');
    task.className = 'Task';
    task.setAttribute('data-istaskopen', initiallyOpen ? 'true' : 'false');

    const h2 = document.createElement('h2');
    h2.className = 'Name';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'TaskButtonName';
    btn.setAttribute('aria-expanded', initiallyOpen ? 'true' : 'false');

    const btnText = document.createElement('span');
    btnText.textContent = version;
    btn.appendChild(btnText);

    const arrow = document.createElement('span');
    arrow.className = 'task-arrow';
    btn.appendChild(arrow);

    h2.appendChild(btn);
    task.appendChild(h2);

    const body = document.createElement('div');
    body.className = 'TaskBody';
    body.setAttribute('aria-hidden', initiallyOpen ? 'false' : 'true');
    task.appendChild(body);

    const outro = document.createElement('p');
    outro.className = 'Outro footer';
    const link = document.createElement('a');
    link.textContent = '查看原始文件';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('data-raw-link', 'release');
    link.href = baseUrl + filename;
    outro.appendChild(link);

    let hasLoaded = false;
    async function loadIfNeeded() {
      if (hasLoaded) return;
      hasLoaded = true;
      await showRelease({
        baseUrl,
        filename,
        listEl: null,
        contentEl: body,
        titleEl: null,
        rawLinkEl: link
      });
      body.appendChild(outro);
    }

    function setOpen(open) {
      task.setAttribute('data-istaskopen', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) void loadIfNeeded();
    }

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
      if (!open) {
        history.replaceState(null, '', `#${encodeURIComponent(version)}`);
      }
    });

    if (initiallyOpen) void loadIfNeeded();

    return task;
  }

  function init() {
    const initAsync = async () => {
      const baseUrl = getBaseUrl();
      const files = await loadReleaseFilesFromDirectory(baseUrl);
      const isNarrowScreen = window.matchMedia('(max-width: 736px)').matches;

    // Two-column layout (left: toc list, right: content)
    const tocEl = document.getElementById('releaseToc');
    const contentEl2 = document.getElementById('releaseContent');
    const titleEl2 = document.getElementById('releaseTitle');
    const titleLinkEl2 = document.getElementById('releaseTitleLink');
      const tasksEl = document.getElementById('releaseTasks');
      if (isNarrowScreen && tasksEl) {
        if (!files || !files.length) {
          tasksEl.innerHTML =
            '<p class="release-error">无法读取 <code>releases-notes/</code> 目录。</p>';
          return;
        }

        tasksEl.innerHTML = '';
        const hash = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
        const initialFilename =
          (hash && files.find((f) => filenameToVersion(f) === hash)) || files[0];
        const initialVersion = filenameToVersion(initialFilename);

        for (const filename of files) {
          const version = filenameToVersion(filename);
          const initiallyOpen = version === initialVersion;
          tasksEl.appendChild(makeTask({ version, filename, baseUrl, initiallyOpen }));
        }
        return;
      }

    if (tocEl && contentEl2) {
      if (!files || !files.length) {
        tocEl.innerHTML =
          '<li><p>无法读取 <code>releases-notes/</code> 目录。</p></li>';
        contentEl2.innerHTML =
          '<p class="release-error">无法加载版本列表。</p>' +
          '<p class="release-error-detail">请确认仓库公开可访问，且 GitHub API 可以读取 <code>releases-notes</code> 目录。</p>';
        if (titleEl2) titleEl2.textContent = '—';
        return;
      }

      tocEl.innerHTML = '';

      for (const filename of files) {
        const version = filenameToVersion(filename);
        const li = document.createElement('li');
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = `#${encodeURIComponent(version)}`;
        a.textContent = version;
        a.dataset.version = version;
        a.addEventListener('click', (ev) => {
          ev.preventDefault();
          history.replaceState(null, '', `#${encodeURIComponent(version)}`);
          if (titleLinkEl2) titleLinkEl2.setAttribute('href', toGitHubBlobUrl(baseUrl, filename));
          void showRelease({
            baseUrl,
            filename,
            listEl: tocEl,
            contentEl: contentEl2,
            titleEl: titleEl2
          });
        });
        p.appendChild(a);
        li.appendChild(p);
        tocEl.appendChild(li);
      }

      const hash = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
      const initialFilename =
        (hash && files.find((f) => filenameToVersion(f) === hash)) || files[0];
      if (titleLinkEl2) titleLinkEl2.setAttribute('href', toGitHubBlobUrl(baseUrl, initialFilename));
      void showRelease({
        baseUrl,
        filename: initialFilename,
        listEl: tocEl,
        contentEl: contentEl2,
        titleEl: titleEl2
      });
      return;
    }

    // Help-style Task list layout (single column)
    if (tasksEl) {
      if (!files || !files.length) {
        tasksEl.innerHTML =
          '<p class="release-error">无法读取 <code>releases-notes/</code> 目录。</p>';
        return;
      }

      tasksEl.innerHTML = '';
      const hash = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
      const initialFilename =
        (hash && files.find((f) => filenameToVersion(f) === hash)) || files[0];
      const initialVersion = filenameToVersion(initialFilename);

      for (const filename of files) {
        const version = filenameToVersion(filename);
        const initiallyOpen = version === initialVersion;
        tasksEl.appendChild(makeTask({ version, filename, baseUrl, initiallyOpen }));
      }
      return;
    }

    const listEl = document.getElementById('releaseList');
    const contentEl = document.getElementById('releaseContent');
    const titleEl = document.getElementById('releaseTitle');
    if (!listEl || !contentEl) return;

    if (!files || !files.length) {
      listEl.innerHTML =
        '<li><p>无法读取 <code>releases-notes/</code> 目录。</p></li>';
      contentEl.innerHTML =
        '<p class="release-error">无法加载版本列表。</p>';
      if (titleEl) titleEl.textContent = '—';
      return;
    }

    // baseUrl already resolved above

    listEl.innerHTML = '';
    for (const filename of files) {
      const version = filenameToVersion(filename);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${encodeURIComponent(version)}`;
      a.textContent = version;
      a.dataset.version = version;
      a.className = 'release-link';
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        history.replaceState(null, '', `#${encodeURIComponent(version)}`);
        void showRelease({ baseUrl, filename, listEl, contentEl, titleEl });
      });
      li.appendChild(a);
      listEl.appendChild(li);
    }

    const hash = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
    const initialFilename =
      (hash && files.find((f) => filenameToVersion(f) === hash)) || files[0];
    void showRelease({ baseUrl, filename: initialFilename, listEl, contentEl, titleEl });
    };

    void initAsync();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

