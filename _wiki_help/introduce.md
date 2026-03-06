<span id="introduce"></span>

<figure class="topicIcon">
<img width="48" height="48" src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher/main/SwiftCraftLauncher/Assets.xcassets/AppIcon.appiconset/mac32pt2x.png" alt="">
</figure>

# Project Overview

Swift Craft Launcher is a native macOS Minecraft launcher built with SwiftUI, providing a smooth and efficient gaming experience. Designed for modern macOS systems, it features comprehensive mod loader support, Microsoft account authentication, and intuitive game management.

<div id="core-features" class="Task">

## Core Features

<div id="aria-core-features" class="TaskBody" role="region" aria-hidden="false">

- **Multi-version Minecraft Support** - ARM: 1.13+, Intel: Untested

- **Microsoft Account Authentication** - Secure OAuth integration with device code flow support

- **Mod Loader Support** - Fabric, Quilt, Forge, and NeoForge with automatic installation

- **Resource Management** - One-click installation of mods, data packs, shaders, and resource packs

</div>

</div>

<div id="user-experience" class="Task">

## User Experience

<div id="aria-user-experience" class="TaskBody" role="region" aria-hidden="false">

- **Native macOS Design** - Built with SwiftUI, following Apple Human Interface Guidelines

- **Multi-language Support** - Localized interface with flag indicators

- **Smart Path Management** - Finder-style breadcrumb navigation with automatic path truncation

- **Performance Optimization** - Efficient caching and memory management

</div>

</div>

<div id="advanced-config" class="Task">

## Advanced Configuration

<div id="aria-advanced-config" class="TaskBody" role="region" aria-hidden="false">

- **Java Management** - Independent Java path configuration for each profile with automatic version detection

- **Memory Allocation** - Visual slider for setting Xms/Xmx parameters

- **Custom Launch Arguments** - Default JVM parameter configuration with optional garbage collector and other advanced options

</div>

</div>

<div id="system-requirements" class="Task">

## System Requirements

<div id="aria-system-requirements" class="TaskBody" role="region" aria-hidden="false">

- **macOS**: 14.0 or later

- **Java**: 8 or later (for Minecraft runtime)

</div>

</div>

# Installation

<div id="install-homebrew" class="Task">

## Using Homebrew Tap (Recommended)

<div id="aria-install-homebrew" class="TaskBody" role="region" aria-hidden="false">

`brew install --cask suhang12332/swiftcraftlauncher/swift-craft-launcher` `brew tap suhang12332/swiftcraftlauncher` `brew install --cask swift-craft-launcher`  

**Tip:** We've created a dedicated <a href="https://github.com/suhang12332/homebrew-swiftcraftlauncher" class="URL">Homebrew Tap</a> for SwiftCraft Launcher.

</div>

</div>

<div id="install-release" class="Task">

## Pre-built Releases

<div id="aria-install-release" class="TaskBody" role="region" aria-hidden="false">

Download the latest version from <a href="https://github.com/suhang12332/Swift-Craft-Launcher/releases/latest" class="URL">GitHub Releases</a>.

<div class="Alert">

*Note:* All currently available versions are beta releases; stable versions are coming soon.

</div>

</div>

</div>

<div id="install-source" class="Task">

## Build from Source

<div id="aria-install-source" class="TaskBody" role="region" aria-hidden="false">

1.  **Clone the repository**

    `git clone https://github.com/suhang12332/Swift-Craft-Launcher.git` `cd Swift-Craft-Launcher`

2.  **Open in Xcode**

    `open SwiftCraftLauncher.xcodeproj`

3.  **Build and Run** using Xcode (⌘R)

**Build Requirements:**

- Xcode 13.0+

- Swift 5.5+

</div>

</div>

# Technical Architecture

<div class="table-wrapper">

| Component            | Technology  |
|----------------------|-------------|
| UI Framework         | SwiftUI     |
| Programming Language | Swift       |
| Reactive Programming | Combine     |
| Target Platform      | macOS 14.0+ |

</div>

# License and Acknowledgments

<div id="info" class="Task">

## Open Source License

<div id="aria-info" class="TaskBody" role="region" aria-hidden="false">

This project is licensed under the GNU Affero General Public License v3.0. See the LICENSE file for details.

**Community and Support**

- **Official QQ Group**: <a href="https://qm.qq.com/cgi-bin/qm/qr?k=1057517524" class="URL">1057517524</a>

- **Issue Reports**: <a href="https://github.com/suhang12332/Swift-Craft-Launcher/issues" class="URL">GitHub Issues</a>

- **Feature Suggestions**: <a href="https://github.com/suhang12332/Swift-Craft-Launcher/discussions" class="URL">GitHub Discussions</a>

**Acknowledgments**

Special thanks to the following projects for their contributions to this launcher:

- <a href="https://github.com/Oct4Pie/archify" class="URL">Archify - macOS Application Universal Binary Optimization Tool</a>

</div>

</div>

<div class="LinkUniversal">

<a href="home" class="xRef AppleTopic">← Back to Index</a>

</div>
