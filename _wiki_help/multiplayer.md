<span id="multiplayer"></span>

<figure class="topicIcon">
<img width="48" height="48" src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher/main/SwiftCraftLauncher/Assets.xcassets/AppIcon.appiconset/mac32pt2x.png" alt="">
</figure>

# Multiplayer Features

Swift Craft Launcher uses **EasyTier** as the underlying networking technology to provide convenient Minecraft multiplayer functionality. This feature allows players to quickly create or join multiplayer rooms via room codes without complex network configuration.

# Feature Overview

The main features of the multiplayer functionality include:

- **Room Code System**: Uses room codes in the format `U/XXXX-XXXX-XXXX-XXXX`, easy to share and enter

- **Automatic Network Configuration**: Automatically creates virtual networks without manual port forwarding configuration

- **Cross-Platform Compatibility**: Supports interconnection with other launchers that implement the Scaffolding protocol (such as HMCL, PCL)

- **Peer Node Management**: Displays other players and devices in the network in real-time

- **Automatic Download and Installation**: Automatically downloads and installs EasyTier core components on first use

- **Administrator Permission Management**: Automatically requests system administrator permissions to configure the network

# Create Room

Creating a room allows you to act as the host, letting other players join your multiplayer network via room code.

<div id="create-room-step1" class="Task">

## Step 1: Open Create Room Window

<div id="aria-create-room-step1" class="TaskBody" role="region" aria-hidden="false">

Select "Multiplayer" → "Create Room" from the menu bar, or open the create room window through the launcher's multiplayer feature entry.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_1.png" alt="Create Room Window">
</figure>

</div>

</div>

<div id="create-room-step2" class="Task">

## Step 2: View Room Code

<div id="aria-create-room-step2" class="TaskBody" role="region" aria-hidden="false">

The window will automatically generate a room code in the format `U/XXXX-XXXX-XXXX-XXXX`. You can click the refresh button to regenerate the room code, or click the share button to copy the room code to the clipboard.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_2.png" alt="Room Code Display">
</figure>

<div class="Alert">

*Note:* Room codes use base-34 encoding (0-9, A-Z, excluding I and O) and include a checksum to ensure validity. Character mapping is supported (I→1, O→0).

</div>

</div>

</div>

<div id="create-room-step3" class="Task">

## Step 3: Start Connection

<div id="aria-create-room-step3" class="TaskBody" role="region" aria-hidden="false">

Click the "Create" button to start the connection. On first use, EasyTier core components will be automatically downloaded and installed, which may take some time. The system will ask you to enter an administrator password to configure the virtual network.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_3.png" alt="Start Connection">
</figure>

<div class="Alert">

*Important:* EasyTier needs to create a virtual network interface (TUN device), which requires system administrator privileges. Please ensure you have administrator privileges and enter the correct password.

</div>

</div>

</div>

<div id="create-room-step4" class="Task">

## Step 4: Connection Successful

<div id="aria-create-room-step4" class="TaskBody" role="region" aria-hidden="false">

After a successful connection, the create room window will automatically close, and the status bar will display the connection status. You can now share the room code with other players so they can join your room.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_4.png" alt="Connection Successful">
</figure>

</div>

</div>

# Join Room

Joining a room allows you to connect to a multiplayer network created by other players via room code.

<div id="join-room-step1" class="Task">

## Step 1: Open Join Room Window

<div id="aria-join-room-step1" class="TaskBody" role="region" aria-hidden="false">

Select "Multiplayer" → "Join Room" from the menu bar, or open the join room window through the launcher's multiplayer feature entry.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_5.png" alt="Join Room Window">
</figure>

</div>

</div>

<div id="join-room-step2" class="Task">

## Step 2: Enter Room Code

<div id="aria-join-room-step2" class="TaskBody" role="region" aria-hidden="false">

Obtain the room code from the player who created the room, in the format `U/XXXX-XXXX-XXXX-XXXX`. Enter the room code into the input field. The launcher will automatically validate the room code format and supports character mapping (I→1, O→0).

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_6.png" alt="Enter Room Code">
</figure>

<div class="Alert">

*Note:* If the room code format is invalid, the launcher will display an error message. Please ensure the room code format is correct and all characters are in the valid character set (0-9, A-Z, excluding I and O).

</div>

</div>

</div>

<div id="join-room-step3" class="Task">

## Step 3: Start Connection

<div id="aria-join-room-step3" class="TaskBody" role="region" aria-hidden="false">

Click the "Join" button to start the connection. On first use, EasyTier core components will be automatically downloaded and installed. The system will ask you to enter an administrator password to configure the virtual network.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_7.png" alt="Start Connection">
</figure>

</div>

</div>

<div id="join-room-step4" class="Task">

## Step 4: Connection Successful

<div id="aria-join-room-step4" class="TaskBody" role="region" aria-hidden="false">

After a successful connection, the join room window will automatically close, and the status bar will display the connection status. You can now view other players and devices in the network.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_8.png" alt="Connection Successful">
</figure>

</div>

</div>

# View Peer Nodes

After a successful connection, you can view information about other players and devices in the network.

<div id="peer-list-step1" class="Task">

## Step 1: Open View Details

<div id="aria-peer-list-step1" class="TaskBody" role="region" aria-hidden="false">

In the create room or join room window, click the "View Details" button to open the peer node list window.

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_9.png" alt="View Details Window">
</figure>

</div>

</div>

<div id="peer-list-step2" class="Task">

## Step 2: View Node Information

<div id="aria-peer-list-step2" class="TaskBody" role="region" aria-hidden="false">

The peer node list displays information about all devices in the network, including:

- **IPv4 Address**: The device's virtual network IP address

- **Hostname**: The device's hostname

- **Latency**: Network latency (milliseconds)

- **Packet Loss**: Data packet loss rate (percentage)

- **Data Traffic**: Amount of data received (RX) and sent (TX)

<figure>
<img src="https://raw.githubusercontent.com/suhang12332/Swift-Craft-Launcher-Assets/refs/heads/main/imagebed/multiplayer/6_10.png" alt="Node Information">
</figure>

<div class="Alert">

*Note:* The peer node list automatically refreshes every 5 seconds. You can also click the refresh button to manually refresh the list.

</div>

</div>

</div>

# Close Connection

When you no longer need multiplayer, you can close the connection.

<div id="close-room" class="Task">

## Close Created Room

<div id="aria-close-room" class="TaskBody" role="region" aria-hidden="false">

If you are the room creator, select "Multiplayer" → "Close Room" from the menu bar to close the room you created. After closing, all players will be disconnected.

</div>

</div>

<div id="leave-room" class="Task">

## Leave Joined Room

<div id="aria-leave-room" class="TaskBody" role="region" aria-hidden="false">

If you are a player who joined the room, select "Multiplayer" → "Leave Room" from the menu bar to leave the current room. After leaving, you will be disconnected from the network.

</div>

</div>

# Frequently Asked Questions

<div id="faq-roomcode" class="Task">

## What is the room code format?

<div id="aria-faq-roomcode" class="TaskBody" role="region" aria-hidden="false">

The room code format is `U/XXXX-XXXX-XXXX-XXXX`, where X is 0-9 or A-Z (excluding I and O). Room codes include a checksum to ensure validity.

</div>

</div>

<div id="faq-permission" class="Task">

## Why is administrator permission required?

<div id="aria-faq-permission" class="TaskBody" role="region" aria-hidden="false">

EasyTier needs to create a virtual network interface (TUN device), which requires system administrator privileges. This is a macOS system security requirement.

</div>

</div>

<div id="faq-compatibility" class="Task">

## Can I connect with other launchers?

<div id="aria-faq-compatibility" class="TaskBody" role="region" aria-hidden="false">

Yes. As long as other launchers implement the Scaffolding protocol, you can connect via room codes. Known compatible launchers include HMCL (Hello Minecraft Launcher) and PCL (PCL2).

</div>

</div>

<div id="faq-view-players" class="Task">

## How do I view other players in the network?

<div id="aria-faq-view-players" class="TaskBody" role="region" aria-hidden="false">

After a successful connection, you can click the "View Details" button in the create room or join room window to view the peer node list. The list automatically refreshes every 5 seconds, and you can also manually refresh it.

</div>

</div>

<div id="faq-connection-failed" class="Task">

## What should I do if the connection fails?

<div id="aria-faq-connection-failed" class="TaskBody" role="region" aria-hidden="false">

If the connection fails, try the following steps:

1.  Check if the room code is correct

2.  Ensure the network connection is normal

3.  Confirm that you have entered the administrator password

4.  Check the error message for detailed information

5.  Try reconnecting

</div>

</div>

<div id="faq-easytier-location" class="Task">

## Where are EasyTier files stored?

<div id="aria-faq-easytier-location" class="TaskBody" role="region" aria-hidden="false">

EasyTier core files are stored in the `easytier/` folder in the application support directory:

- `easytier-core`: Core program

- `easytier-cli`: Command-line tool

</div>

</div>

<div id="faq-update-easytier" class="Task">

## How do I update EasyTier?

<div id="aria-faq-update-easytier" class="TaskBody" role="region" aria-hidden="false">

Each time you start the network, it automatically checks and downloads the latest version of EasyTier. If you need to manually update, you can delete the `easytier/` folder, and it will automatically download the latest version on the next connection.

</div>

</div>

<div id="faq-multiple-rooms" class="Task">

## Can I create multiple rooms at the same time?

<div id="aria-faq-multiple-rooms" class="TaskBody" role="region" aria-hidden="false">

No. You can only connect to one room at a time. If you need to switch to another room, you need to close the current connection first.

</div>

</div>

<div id="faq-roomcode-expire" class="Task">

## Do room codes expire?

<div id="aria-faq-roomcode-expire" class="TaskBody" role="region" aria-hidden="false">

No. Room codes themselves do not expire, but the validity of the room depends on the network connection status. If all players disconnect, the room will become invalid.

</div>

</div>

<div class="LinkUniversal">

<a href="home" class="xRef AppleTopic">← Back to Index</a>

</div>
