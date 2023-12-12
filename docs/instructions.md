# Instructions for installing and using Logo code editor

This document contains instructions on how to set up and use this application in a classroom setting. The application has been developed and tested on Linux and macOS systems. However, we cannot guarantee that everything will work seamlessly on Windows.

## Prerequisites
Ensure that you have the following installed on your computer:

- npm
- Python (version 3.8 or higher)
- Poetry
- Java
- Gradle

Note: `Java` and `Gradle` are only required if you intend to run Logo scripts on a Lego Mindstorm EV3 Robot.


## Installation
Once you have confirmed that everything is installed and up-to-date on your machine, navigate to the following directory in a terminal:

```
/scripts
```

Execute the following commands:

```
chmod +x setup_production_environment.sh
./setup_production_environment.sh
```

After the script finishes running, everything will be installed. The script creates a default admin user with the following credentials:
```
name: admin
password: password
```
It is recommended to change this password as soon as possible.

## Running the application
Before running the application, configure your computer to be a Wi-Fi hotspot. This can be done in your system settings under network or Wi-Fi settings.

After setting up your Wi-Fi hotspot, navigate to the following directory:
```
/backend
```

Run the command:
```
poetry run invoke gunicorn
```
Now, you need to find your hotspot's IP address. The IP address can be found by running the following command in a terminal:
```
ifconfig
```

Look for `inet` or `ipv4`; for example:
![image showing example address](/media/Inet.png)


Now, have the students connect to your hotspot and type the address into a browser's address bar, following `:5000/`. In the case of the address in the image, the proper address would be:
```
10.42.0.1:5000/
```

If everything went right, the students should now be presented with the application.