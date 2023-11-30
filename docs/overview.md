# Project overview

## Purpose and goals of the application
Logo code editor is a simple IDE designed for Logo programming language. This application uses a [compiler](https://github.com/logo-to-lego/logomotion) made to compile Logo to Java. This application provides a streamlined process for sending functional Java programs to Lego Mindstorm robot model EV3. This application was developed primarily for helping children to learn programming.

## How it works
Logo code editor IDE is a full stack application, meant to run on a local network. The IDE is specifically designed with a classroom environment in mind. The server runs on a local network hosted on the teacher's computer, to which children connect with their machines. The primary reason for this approach is the consideration for children having rented or borrowed machines, on which they can't install anything thus needing this application to be runnable in a browser environment. The whole IDE is also translated to English and Finnish, and the language can be switched on the fly. This is a client-side operation.

## Features
This IDE provides a functional login and registration system and a basic file-handling system for all users. A normal user is limited to see and access only the files which they own. Regular user can "soft" delete their own files, which only mark the files as *not* visible. All file and user data is stored in a sql-database. In the normal view for regular users there exists a sidebar component which shows all pre-defined keywords of Logo and choosing a keyword reveals its documentation, provided it has one. Sidebar also provides a search functionality for seaching specific keywords. The normal view has a button which sends the current content of the editor to the compiler. When this operation has finished, a notification message pops below the editor describing possible errors in the sent code or confirming success.

### Admin dashboard
In the admin dashboard, the admin can access and modify all file- and user-related data. Files which have been marked as hidden by regular users can still be found in the admin dashboard and can be permanently deleted or reverted back to the state in which the normal user can see and access their files again. One requirement for this application was setting the password requirement for registration and login optional by the admin and this can be done in the admin dashboard. In the admin dashboard a password can be modified for any user and any file can be deleted. The admin has the ability to upload and download files from/to the database from the dashboard.


Features of the editor itself:

- Syntax higlighting
- Autocompletion hints keywords
- Autocompletion hints for user-defined functions in code (ie. "to square" would register square as a new keyword)
- Hovering mouse over keywords produce a hover tooltip containing the documentation for said keyword
- Errors are underlined in the editor when the code is sent to the compiler
- Hovering mouse over an error reveals the details of said error
