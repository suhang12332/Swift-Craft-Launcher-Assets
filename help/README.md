# Help Documentation

## Authoring Guide

Help pages follow the macOS Help Book format and use specific HTML structures and CSS classes so they display correctly in the macOS Help Viewer.

### Basic HTML Structure

Every help page should follow this basic structure:

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page title</title>
    <meta name="description" content="Page description">
    <meta name="keywords" content="keyword1, keyword2">
    <meta content="light dark" name="color-scheme">
    <link media="all" href="../css/app.css" type="text/css" rel="stylesheet">
</head>
<body dir="ltr" id="page-id" class="AppleTopic apd-topic dark-mode-enabled" data-istaskopen="true" data-designversion="2">
    <a name="page-id"></a>
    <!-- Page content -->
</body>
</html>
```

**Key attributes:**

- `lang`: language code (`en`, `zh-Hans`, `zh-Hant`, etc.)
- `dir`: text direction (`ltr` for left-to-right, `rtl` for right-to-left)
- `id`: unique page identifier, matching `<a name>`
- `class`: must include `AppleTopic apd-topic dark-mode-enabled`
- `data-istaskopen`: task expansion state (`true` expanded, `false` collapsed)
- `data-designversion`: design version (`1` or `2`; `2` is recommended)

### Page Elements

#### 1. Topic Icon

Displays the app icon at the top of the page:

```html
<figure class="topicIcon">
    <img src="icon URL" alt="" height="30" width="30">
</figure>
```

#### 2. Main Heading (H1)

```html
<h1>Main title</h1>
```

Styled subtitle:

```html
<h1 class="Name" style="margin-top: 0.8em;">Subtitle</h1>
```

#### 3. Paragraph

Regular paragraph:

```html
<p>Paragraph content</p>
```

Paragraph with a bottom border, commonly used for section introductions:

```html
<p style="border-bottom: 1px solid var(--border-color); padding-bottom: 1em;">Introductory text</p>
```

#### 4. Task Steps

Used for step-by-step instructions with expand/collapse support:

```html
<div id="step-id" class="Task">
    <h2 aria-controls="aria-step-id" class="Name">Step title</h2>
    <div class="TaskBody" role="region" aria-hidden="false" id="aria-step-id">
        <p>Step description</p>
        <figure>
            <img src="image URL" alt="Image description">
        </figure>
    </div>
</div>
```

**Key attributes:**

- `id`: unique task identifier
- `aria-controls`: points to the matching `TaskBody` `id` (format: `aria-{step-id}`)
- `aria-hidden`: `false` visible, `true` hidden
- `role="region"`: semantic marker

**Consecutive tasks merge their borders automatically; no extra handling is needed.**

#### 5. Figure

```html
<figure>
    <img src="image URL" alt="Image description">
</figure>
```

Images should use full URLs; GitHub raw links are recommended.

#### 6. Alert

Used for important notices and warnings:

```html
<div class="Alert">
    <p class="Important"><em>Important:</em> Important notice</p>
</div>
```

**Alert types:**

- `Important`: important notice (red emphasis)
- `Note`: note (blue)
- `Warning`: warning
- `Caution`: caution

Examples:

```html
<!-- Important notice -->
<div class="Alert">
    <p class="Important"><em>Important:</em> This is an important notice.</p>
</div>

<!-- Note -->
<div class="Alert">
    <p class="Note"><em>Note:</em> This is a note.</p>
</div>
```

#### 7. Lists

Unordered list:

```html
<ul>
    <li><p>List item 1</p></li>
    <li><p>List item 2</p></li>
</ul>
```

Ordered list:

```html
<ol>
    <li><p>Step 1</p></li>
    <li><p>Step 2</p></li>
</ol>
```

List item with emphasis:

```html
<ul>
    <li><p><strong>Keyword</strong>: Description</p></li>
</ul>
```

#### 8. Code

Inline code:

```html
<code>code</code>
```

Code block:

```html
<code class="CodeLine">single-line code</code>
```

#### 9. Navigation Links

Back to the index page:

```html
<div class="LinkUniversal">
    <a href="index.html#index" class="xRef AppleTopic">← Back to Index</a>
</div>
```

### CSS Classes and Styles

#### Primary CSS Classes

- `.AppleTopic`: topic container
- `.apd-topic`: help topic
- `.dark-mode-enabled`: enables dark mode support
- `.Task`: task/step container
- `.TaskBody`: task body
- `.Alert`: alert container
- `.Name`: heading style
- `.LinkUniversal`: navigation link container
- `.topicIcon`: topic icon container

#### Common Inline Styles

- `margin-top: 0.8em`: top spacing for subtitles
- `border-bottom: 1px solid var(--border-color)`: bottom border
- `padding-bottom: 1em`: bottom padding

### Best Practices

1. **File naming**
   - Use lowercase letters and hyphens: `add-game.html`, `edit-skins.html`
   - Keep names short and descriptive

2. **ID naming**
   - Use hyphen-separated names: `step-1`, `mod-step1`, `skin-step2`
   - Keep IDs unique and consistent

3. **Images**
   - Use full URLs; GitHub raw links are recommended
   - Provide meaningful `alt` text
   - Store images in `imagebed/`, grouped by feature

4. **Localization**
   - Place each language in its own `.lproj` directory
   - Keep file structure and naming consistent
   - Preserve the HTML structure when translating

5. **Accessibility**
   - Use `aria-controls` and `aria-hidden` correctly
   - Provide `alt` text for images
   - Use semantic HTML elements

6. **Content organization**
   - Use `h1` for the main title
   - Use `h1.Name` for section headings
   - Use `Task` for step-by-step instructions
   - Use `Alert` for important information

### Example: Complete Page

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Game</title>
    <meta name="description" content="Learn how to add and install Minecraft games">
    <meta name="keywords" content="add game, install minecraft">
    <meta content="light dark" name="color-scheme">
    <link media="all" href="../css/app.css" type="text/css" rel="stylesheet">
</head>
<body dir="ltr" id="addgame" class="AppleTopic apd-topic dark-mode-enabled" data-istaskopen="true" data-designversion="2">
    <a name="addgame"></a>
    <figure class="topicIcon">
        <img src="icon URL" alt="" height="30" width="30">
    </figure>
    <h1>Add Game</h1>
    <p style="border-bottom: 1px solid var(--border-color); padding-bottom: 1em;">
        Introductory text
    </p>

    <h1 class="Name" style="margin-top: 0.8em;">Install Game</h1>

    <div id="step1" class="Task">
        <h2 aria-controls="aria-step1" class="Name">Step 1: Title</h2>
        <div class="TaskBody" role="region" aria-hidden="false" id="aria-step1">
            <p>Step description</p>
            <figure>
                <img src="image URL" alt="Image description">
            </figure>
        </div>
    </div>

    <div class="Alert">
        <p class="Note"><em>Note:</em> Note text</p>
    </div>

    <div class="LinkUniversal">
        <a href="index.html#index" class="xRef AppleTopic">← Back to Index</a>
    </div>
</body>
</html>
```

### Directory Structure

```
help/SwiftCraftLauncher.help/Contents/Resources/
├── css/
│   └── app.css                    # Stylesheet
├── en.lproj/                      # English
│   ├── index.html
│   ├── addgame.html
│   └── ...
├── zh-Hans.lproj/                 # Simplified Chinese
│   ├── index.html
│   ├── addgame.html
│   └── ...
└── zh-Hant.lproj/                 # Traditional Chinese
    ├── index.html
    ├── addgame.html
    └── ...
```

### Reference Files

See the existing help pages for reference:

- `help/SwiftCraftLauncher.help/Contents/Resources/en.lproj/addgame.html` - simple page example
- `help/SwiftCraftLauncher.help/Contents/Resources/en.lproj/addresources.html` - complex page example
- `help/SwiftCraftLauncher.help/Contents/Resources/en.lproj/settings.html` - settings page example
