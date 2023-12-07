# Instructions for installing and using Logo code editor

This document contains instructions on how to setup and use this application in a classroom setting. This application has been developed and tested on Linux and Mac OS systems and we cannot guarantee that everything will work on Windows.

## Prerequisites
Ensure that you have the following installed on your computer:

- npm
- Python (version 3.8 or higher)
- Poetry
- Java
- Gradle

`Java` and `Gradle` are only required if written Logo scripts are to be run on a Lego Mindstorm EV3 Robot.


## Installation
When you are sure everything is installed and up to date on your machine, you should navigate in a terminal to:

```
/scripts
```

and execute

```
chmod +x setup_production_environment.sh
./setup_production_environment.sh
```

After the script has finished running, everything has been installed.

## Running the application
Before running the application, you should configure your computer to be a Wi-Fi hotspot. This can be done in your system settings, under network or Wi-Fi, etc.

After setting up your Wi-Fi hotspot, you should navigate to:
```
/backend
```

And run
```
poetry run invoke gunicorn
```
Now you need to find your hotspot's ip address. Ip address can be found by running: 
```
ifconfig
```

in a terminal. Look for `inet` or `ipv4`, for example:
![image showing example address](/media/Inet.png)


Now, have the students connect to your hotspot and type the address onto a browser's address bar, following `:5000/`. In the case of the address in the image, the proper address would be:
```
10.42.0.1:5000/
```

And now the students should be presented with the application if everything went right.