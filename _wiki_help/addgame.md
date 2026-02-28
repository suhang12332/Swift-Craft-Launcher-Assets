<span id="addgame"></span>

<figure class="topicIcon">
<img width="48" height="48" src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher/main/SwiftCraftLauncher/Assets.xcassets/AppIcon.appiconset/mac32pt2x.png" alt="">
</figure>

# Add Game

Swift Craft Launcher supports installing Vanilla Minecraft as well as mod loaders: NeoForge, Fabric, Forge, and Quilt.

# Mod Loader Types

**Vanilla**: Original Minecraft with no modifications. Provides a pure official experience and gameplay, but cannot run any mods.

**Fabric**: An emerging mod loader with low performance overhead, fast updates, and quick adaptation to new versions. Although it has fewer mods than Forge, its ecosystem is active and suitable for lightweight and modern mods.

**Forge**: A long-established mod loader with a large community and extensive mod library. Stable and reliable, suitable for players who need many mods.

**NeoForge**: A Forge fork created by former Forge developers. Emphasizes modernization, open source, and high performance. Incompatible with high-version Forge mods, considered a strong competitor to Forge.

**Quilt**: An improved fork of Fabric, compatible with most Fabric mods. Aims to provide a better development experience and more advanced internal APIs.

# Install Game

<div id="step1-add-game" class="Task">

## Step 1: Click "Add Game"

<div id="aria-step1-add-game" class="TaskBody" role="region" aria-hidden="false">

Click "Add Game" in the launcher.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/2_1.png" alt="Add Game button">
</figure>

</div>

</div>

<div id="step2-config-game" class="Task">

## Step 2: Configure Game

<div id="aria-step2-config-game" class="TaskBody" role="region" aria-hidden="false">

Select the mod loader, game version, and game name (the name displayed in the game list). You can also click the "Game Icon" area to select an image as the game icon. When done, click "Confirm".

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/2_2.png" alt="Game configuration">
</figure>

</div>

</div>

<div id="step3-wait-install" class="Task">

## Step 3: Wait for Installation to Complete

<div id="aria-step3-wait-install" class="TaskBody" role="region" aria-hidden="false">

Wait for the download to complete. When the newly installed version appears in the "Game List" on the left, the game has been successfully installed. You can then click "Launch" to start the game, or click "Path" to open the version's folder.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/2_3.png" alt="Game list">
</figure>

</div>

</div>

# Import Mod Pack

Swift Craft Launcher supports importing mod packs (ModPack) from local file system, supporting Modrinth and CurseForge format mod packs. Supported formats include `.zip` and `.mrpack` files.

<div id="import-modpack-step1" class="Task">

## Step 1: Select Mod Pack File

<div id="aria-import-modpack-step1" class="TaskBody" role="region" aria-hidden="false">

Click the "Import Mod Pack" button in the launcher, then select a local mod pack file (.zip or .mrpack format). You can also drag and drop the mod pack file directly into the launcher.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/5_1.png" alt="Select mod pack file">
</figure>

</div>

</div>

<div id="import-modpack-step2" class="Task">

## Step 2: View Mod Pack Information

<div id="aria-import-modpack-step2" class="TaskBody" role="region" aria-hidden="false">

The launcher will automatically parse the mod pack file and display mod pack information, including: mod pack name, version, game version, and Mod Loader type. The game name will be automatically filled (format: mod pack name-version-timestamp), and you can also customize it.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/5_2.png" alt="Mod pack information">
</figure>

</div>

</div>

<div id="import-modpack-step3" class="Task">

## Step 3: Wait for Installation to Complete

<div id="aria-import-modpack-step3" class="TaskBody" role="region" aria-hidden="false">

After clicking "Confirm", the launcher will start installing the mod pack. The installation process includes:

- Create game directory structure

- Copy Overrides files (configuration files, etc.)

- Download Mod files from Modrinth/CurseForge

- Install required dependencies

- Install game files and Mod Loader

You can view detailed installation progress in the progress interface. After installation is complete, the mod pack will appear in the game list.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/5_3.png" alt="Mod pack installation progress">
</figure>

<div class="Alert">

*【Note】*Importing mod packs requires a stable network connection, as Mod files and dependencies need to be downloaded from Modrinth or CurseForge. Make sure you have enough disk space to store the mod pack files.

</div>

</div>

</div>

# Import from Other Launchers

Swift Craft Launcher supports importing game instances from other Minecraft launchers (such as MultiMC, Prism Launcher, etc.), including Mods, configuration files, saves, etc. Supported launcher types include MultiMC and Prism Launcher (MultiMC fork).

<div id="import-launcher-step1" class="Task">

## Step 1: Select Launcher Type and Instance Folder

<div id="aria-import-launcher-step1" class="TaskBody" role="region" aria-hidden="false">

Click the "Import from Other Launcher" button in the launcher, then select the launcher type (MultiMC or Prism Launcher), and select the instance folder to import.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/addgame/5_4.png" alt="Select launcher type and instance">
</figure>

</div>

</div>

<div id="import-launcher-step2" class="Task">

## Step 2: View Instance Information

<div id="aria-import-launcher-step2" class="TaskBody" role="region" aria-hidden="false">

The launcher will automatically parse the instance configuration file and display instance information, including: game name, game version, Mod Loader type and version. The game name will be automatically filled with the instance name, and you can also customize it.

<figure>

</figure>

<div class="Alert">

*【Important】*Only Fabric, Quilt, Forge, and NeoForge Mod Loaders are supported. If the instance uses an unsupported Mod Loader, the launcher will display a notification.

</div>

</div>

</div>

<div id="import-launcher-step3" class="Task">

## Step 3: Wait for Import to Complete

<div id="aria-import-launcher-step3" class="TaskBody" role="region" aria-hidden="false">

After clicking "Confirm", the launcher will start the import process. The import process includes:

- Copy game directory contents (Mods, configuration files, saves, resource packs, data packs, shader packs, etc.)

- Download missing game version files (if needed)

- Install Mod Loader (if needed)

You can view detailed import progress in the progress interface. After import is complete, the game instance will appear in the game list, and all Mods, configurations, and saves will be preserved.

<figure>

</figure>

<div class="Alert">

*【Note】*Make sure you have read permissions for the source instance folder. The import process will preserve all game data, including saves, Mods, and configuration files, without needing to reconfigure.

</div>

</div>

</div>

<div class="LinkUniversal">

<a href="home" class="xRef AppleTopic">← Back to Index</a>

</div>
