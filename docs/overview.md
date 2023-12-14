# Project overview

## Purpose and goals of the application
Logo Code Editor is a simple IDE designed for the Logo programming language. This application uses a [forked](https://github.com/theJSZ/logomotion) version of a [compiler](https://github.com/logo-to-lego/logomotion) created to compile Logo to Java. The application provides a streamlined process for sending functional Java programs to Lego Mindstorm robot model EV3. It was primarily developed to help children learn programming.

## How it works
Logo Code Editor IDE is a full-stack application meant to run on a local network. The IDE is specifically designed with a classroom environment in mind. The server runs on a local network hosted on the teacher's computer, to which children connect with their machines. The primary reason for this approach is consideration for children who may have rented or borrowed machines on which they can't install anything, thus requiring this application to be runnable in a browser environment. The entire IDE is also translated into English and Finnish, and the language can be switched on the fly. This is a client-side operation.

## Features
This IDE provides a functional login and registration system and a basic file-handling system for all users. A normal user is limited to seeing and accessing only the files they own. Regular users can "soft" delete their own files, marking the files as *not* visible. All file and user data are stored in an SQL database. In the normal view for regular users, there is a sidebar component that shows all pre-defined keywords of Logo, and choosing a keyword reveals its documentation if available. The sidebar also provides a search functionality for searching specific keywords. The normal view has a button that sends the current content of the editor to the compiler. When this operation finishes, a notification message appears below the editor, describing possible errors in the sent code or confirming success.

### Admin dashboard
In the admin dashboard, the admin can access and modify all file- and user-related data. Files that have been marked as hidden by regular users can still be found in the admin dashboard and can be permanently deleted or reverted back to the state in which the normal user can see and access their files again. One requirement for this application was making the password requirement for registration and login optional by the admin, and this can be done in the admin dashboard. In the admin dashboard, a password can be modified for any user, and any file can be deleted. The admin has the ability to upload and download files to/from the database from the dashboard. Perhaps the single most important feature of the admin dashboard is the ability to forward programs to the EV3-robot. The admin chooses which file to send, plugs the robot into their machine via USB, clicks send, and after a short while, the program has been sent to the robot. Sending programs to robots has been restricted to the admin's machine because configuring the connection of the robot for each machine it is plugged into is not straightforward. The idea was that if the teacher uses the same computer, all the robots which have already been configured still remember this machine and won't need to be configured again by the next lesson. 


Features of the editor itself:

- Syntax higlighting
- Autocompletion hints for keywords
- Autocompletion hints for user-defined functions in code (ie. "to square" would register square as a new keyword)
- Hovering the mouse over keywords produces a hover tooltip containing the documentation for said keyword
- Errors are underlined in the editor when the code is sent to the compiler
- Hovering the mouse over an error reveals the details of said error
