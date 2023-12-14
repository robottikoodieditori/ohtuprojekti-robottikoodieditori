# Configuring Lego Mindstorms EV3
This document provides instructions on how to configure the robot for use with this application.

## Installing ev3dev
To begin, install an operating system on an SD card. Follow these steps:

- Download the [ev3dev](https://www.ev3dev.org/downloads/) operating system image, selecting the one specified for LEGO MINDSTORMS EV3.
- Extract the `.zip` file of the OS image you downloaded.
- Ensure you have SD card flashing software on your machine. We recommend [Balena Etcher](https://etcher.balena.io/). If you don't have one installed, do so now.
- Launch the flashing application.
- Insert the SD card into an SD card reader.
- Choose the SD card in the flashing application. Navigate to the directory where you extracted the OS image contents, find a file ending with `.img`, and select it.
- Start the flashing procedure.
- After successful flashing, remove the SD card and insert it into the robot.
- Power on the robot; the monitor should display various commands, and booting may take some time.
- Finally, a text displaying "Brickman" should appear on the monitor, indicating that the OS is ready.

## Configuring the connection to the robot

- Begin by connecting the robot to your machine via USB and wait for a minute.
- An IP address should appear on the robot's display.
- If not, navigate to the robot's menu to `Wireless and Networks` > `All Network Connections` > `Wired`. Press `Connect` and select `Connect automatically` for future use. This step may not be necessary after the initial setup; the robot should establish a connection automatically when the USB is plugged in.

Now, an IP address should be displayed on the robot's monitor. Verify the connection via SSH by opening a terminal and typing: `ssh robot@ev3dev.local`. The password is `maker`. If connecting to the robot fails, configure the connection on your machine as well.

### Configuring connection on your machine
If an SSH connection could not be established or an IP address is not displayed on the robot's monitor, configure the connection on your machine:

- Open network settings on your machine.
- Look for `USB Ethernet`, click on configuration.
- Look for `IPv4` or similar option.
- Locate `IPv4 Method` and select `Shared to other computers` or a similar option, then apply.
- Enable connection if not already done.

Now the connection should be established and configured. Test this with establishing an SSH connection again.


## Finally
Now the connection should be configured correctly, and the robot is ready for use with this application.