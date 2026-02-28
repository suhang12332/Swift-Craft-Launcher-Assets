<span id="settings"></span>

<figure class="topicIcon">
<img width="48" height="48" src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher/main/SwiftCraftLauncher/Assets.xcassets/AppIcon.appiconset/mac32pt2x.png" alt="">
</figure>

# Launcher Settings

Swift Craft Launcher provides various configuration options to customize your experience.

# General Settings

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/settings/4-1_1.png" alt="General settings">
</figure>

<div id="settings-language" class="Task">

## Language Selection

<div id="aria-settings-language" class="TaskBody" role="region" aria-hidden="false">

Select the application language. Changes require restarting the application to take effect.

Supported languages: Arabic (ar), Danish (da), German (de), English (en), Spanish (es), Finnish (fi), French (fr), Hindi (hi), Italian (it), Japanese (ja), Korean (ko), Norwegian Bokmål (nb), Dutch (nl), Polish (pl), Portuguese (pt), Russian (ru), Swedish (sv), Thai (th), Turkish (tr), Vietnamese (vi), Simplified Chinese (zh-Hans), Traditional Chinese (zh-Hant).

</div>

</div>

<div id="settings-appearance" class="Task">

## Theme Selection

<div id="aria-settings-appearance" class="TaskBody" role="region" aria-hidden="false">

Select theme mode: System, Light, or Dark.

</div>

</div>

<div id="settings-workdir" class="Task">

## Launcher Working Directory

<div id="aria-settings-workdir" class="TaskBody" role="region" aria-hidden="false">

Set the launcher's working directory. All game files managed by the launcher will be placed in this folder. Can be reset to default value.

<div class="Alert">

*Important:* After changing the working directory, games in the original path will no longer appear in the "Game List". It is recommended to transfer or re-download them. It's best to change the working directory when first opening the launcher.

</div>

</div>

</div>

<div id="settings-download" class="Task">

## Concurrent Download Count

<div id="aria-settings-download" class="TaskBody" role="region" aria-hidden="false">

Set the number of concurrent downloads, range: 1-64. Higher concurrency can improve download speed but also brings greater performance overhead.

</div>

</div>

<div id="settings-github-proxy" class="Task">

## GitHub Proxy Settings

<div id="aria-settings-github-proxy" class="TaskBody" role="region" aria-hidden="false">

Configure GitHub proxy settings to automatically add proxy prefixes to GitHub-related URLs, helping resolve access issues in certain regions.

**Enable/Disable Toggle:** Control whether to apply proxy to GitHub URLs. Default: Enabled.

**Proxy URL:** Configure the proxy server address. Default: `https://gh-proxy.com`. The proxy URL must be a valid URL with `http://` or `https://` protocol.

**Automatic Application:** The launcher automatically applies proxy to the following GitHub domains:

- `github.com` - GitHub repository pages and releases

- `raw.githubusercontent.com` - Raw file content

**Excluded Domains:** The following domains are not proxied:

- `api.github.com` - GitHub API endpoints (usually accessible without proxy)

**Use Cases:**

- GitHub API calls (latest releases, contributors, appcast, etc.)

- File downloads from GitHub repositories

- Mod pack dependency downloads

- Sparkle update service downloads

<div class="Alert">

*Note:* The proxy is automatically applied when enabled. You don't need to manually configure each URL. If the default proxy is unavailable, you can replace it with other GitHub proxy services such as `https://ghproxy.com` or `https://mirror.ghproxy.com`.

</div>

</div>

</div>

# Game Settings

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/settings/4-3_1.png" alt="Game settings">
</figure>

<div id="settings-api-source" class="Task">

## Default API Source

<div id="aria-settings-api-source" class="TaskBody" role="region" aria-hidden="false">

Select the default data source. Available options: Morinth and CurseForge.

</div>

</div>

<div id="settings-ai-crash" class="Task">

## AI Crash Analysis

<div id="aria-settings-ai-crash" class="TaskBody" role="region" aria-hidden="false">

Enable/disable AI crash analysis feature. This feature requires successful AI settings configuration.

</div>

</div>

<div id="settings-default-memory" class="Task">

## Default Memory Allocation

<div id="aria-settings-default-memory" class="TaskBody" role="region" aria-hidden="false">

Set the global default memory range (Xms-Xmx).

</div>

</div>

<div id="settings-resource-info" class="Task">

## Game Resource Information

<div id="aria-settings-resource-info" class="TaskBody" role="region" aria-hidden="false">

Display cache file count and total size (read-only).

</div>

</div>

# Game Advanced Settings

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/settings/4-4_1.png" alt="Game advanced settings">
</figure>

<div id="settings-java-path" class="Task">

## Java Path

<div id="aria-settings-java-path" class="TaskBody" role="region" aria-hidden="false">

Customize the Java executable file path. Can be reset to default value.

Below are MC versions and their minimum required Java versions:

- **1.12** - Java 8

- **1.17** - Java 16

- **1.18** - Java 17

- **1.20.5** - Java 21 (64-bit)

</div>

</div>

<div id="settings-gc" class="Task">

## Garbage Collector

<div id="aria-settings-gc" class="TaskBody" role="region" aria-hidden="false">

Select garbage collector type. Available options are automatically filtered based on Java version.

Available garbage collector options:

- **G1GC** - Java 7+

- **ZGC** - Java 11+

- **Shenandoah** - Java 12+

- **Parallel** - Java 1.0+

- **Serial** - Java 1.0+

</div>

</div>

<div id="settings-performance" class="Task">

## Performance Optimization Preset

<div id="aria-settings-performance" class="TaskBody" role="region" aria-hidden="false">

Select performance optimization level:

- **Disabled** - No optimizations enabled

- **Basic** - Enable basic optimizations

- **Balanced** - Enable memory and thread optimizations (Recommended)

- **Maximum** - Enable all optimizations including Aikar Flags (G1GC only)

</div>

</div>

<div id="settings-memory-range" class="Task">

## Memory Range

<div id="aria-settings-memory-range" class="TaskBody" role="region" aria-hidden="false">

Set Xms-Xmx memory range (512 MB - Maximum memory).

</div>

</div>

<div id="settings-custom-jvm" class="Task">

## Custom JVM Arguments

<div id="aria-settings-custom-jvm" class="TaskBody" role="region" aria-hidden="false">

Manually enter JVM arguments (mutually exclusive with garbage collector and performance optimization).

</div>

</div>

<div id="settings-env-vars" class="Task">

## Environment Variables

<div id="aria-settings-env-vars" class="TaskBody" role="region" aria-hidden="false">

Set environment variables for game runtime.

</div>

</div>

# AI Settings

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/settings/4-5_1.png" alt="AI settings">
</figure>

Swift Craft Launcher integrates AI assistant functionality, supporting multiple AI providers for game crash analysis, problem solving, and other scenarios.

<div id="settings-ai-provider" class="Task">

## AI Provider Selection

<div id="aria-settings-ai-provider" class="TaskBody" role="region" aria-hidden="false">

Select AI service provider. The launcher supports multiple providers with unified interface:

- **OpenAI** - Default API URL: `https://api.openai.com`, API path: `/v1/chat/completions`. Supports custom API URL (compatible with DeepSeek and other OpenAI-format services). Uses Bearer Token authentication.

- **Ollama** - Local deployment option. Default API URL: `http://localhost:11434`, API path: `/api/chat`. Supports custom Base URL and remote Ollama servers. API Key is optional.

</div>

</div>

<div id="settings-api-key" class="Task">

## API Key

<div id="aria-settings-api-key" class="TaskBody" role="region" aria-hidden="false">

Enter your API key for the selected provider. The input field supports show/hide toggle (eye icon) for security. This is a required field and will be validated before sending messages.

<div class="Alert">

*Important:* The API key is required for AI functionality. Make sure to keep it secure and do not share it with others.

</div>

</div>

</div>

<div id="settings-openai-url" class="Task">

## API URL (OpenAI Format)

<div id="aria-settings-openai-url" class="TaskBody" role="region" aria-hidden="false">

Only displayed when OpenAI-format provider is selected. Allows customization of the API URL for compatibility with DeepSeek and other OpenAI-format compatible services. If left empty, the provider's default URL will be used.

</div>

</div>

<div id="settings-ollama-url" class="Task">

## Ollama Base URL

<div id="aria-settings-ollama-url" class="TaskBody" role="region" aria-hidden="false">

Only displayed when Ollama is selected. Set the Ollama service address. Default: `http://localhost:11434`. Supports remote Ollama servers if configured.

</div>

</div>

<div id="settings-ai-model" class="Task">

## Model Name

<div id="aria-settings-ai-model" class="TaskBody" role="region" aria-hidden="false">

Enter the AI model name to use. This is a required field and must be filled before sending messages. Leading and trailing whitespace will be automatically trimmed.

<div class="Alert">

*Important:* The model name must match the models available from your selected provider. For example, OpenAI uses models like "gpt-4" or "gpt-3.5-turbo", while Ollama uses model names you've installed locally.

</div>

</div>

</div>

<div id="settings-ai-avatar" class="Task">

## AI Avatar URL

<div id="aria-settings-ai-avatar" class="TaskBody" role="region" aria-hidden="false">

Set the AI avatar URL address. Supports real-time preview using MinecraftSkinUtils component (42x42 preview size). Default: `https://mcskins.top/assets/snippets/download/skin.php?n=7050`

</div>

</div>

## AI Features

<div id="settings-ai-crash-analysis" class="Task">

## AI Crash Analysis

<div id="aria-settings-ai-crash-analysis" class="TaskBody" role="region" aria-hidden="false">

When enabled, the launcher automatically collects crash logs and sends them to the AI window for analysis when a game crash is detected.

**Workflow:**

1.  Crash detection: The launcher monitors game process exit codes and checks for crash reports generated within the last 5 minutes.

2.  Log collection: Priority is given to all files in the `crash-reports` folder. If no crash reports are found, `logs/latest.log` is collected.

3.  AI analysis: The AI chat window automatically opens with collected log files attached, allowing you to interact with the AI to get crash analysis and solution suggestions.

<div class="Alert">

*Note:* This feature requires successful AI settings configuration. The toggle for this feature is located in the Game Settings section.

</div>

</div>

</div>

<div id="settings-ai-chat" class="Task">

## AI Chat Functionality

<div id="aria-settings-ai-chat" class="TaskBody" role="region" aria-hidden="false">

The AI chat feature supports:

- **Streaming responses:** Real-time streaming output (SSE format) for immediate feedback

- **Message history:** Maintains conversation context throughout the session

- **File attachments:** Support for sending text files for analysis (files ≤100KB are read and sent, larger files show file info only)

- **Text truncation:** Content exceeding 5000 characters is automatically truncated

**Use cases:**

- Game crash analysis (automatic or manual)

- Problem consultation and troubleshooting

- Log file and configuration file analysis

</div>

</div>

# Player Settings

<div class="Alert">

*Note:* Player settings feature is under development. Please stay tuned for updates.

</div>

<div class="LinkUniversal">

<a href="home" class="xRef AppleTopic">← Back to Index</a>

</div>
