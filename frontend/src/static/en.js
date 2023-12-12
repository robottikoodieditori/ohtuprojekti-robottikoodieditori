/**
 * en.js
 * ---------------------------------------------------
 * 
 * Overview:
 * The `en.js` file contains English translations for various text elements used throughout the application.
 * It exports a single object with key-value pairs, where each key represents a specific UI element or label,
 * and the corresponding value is the text in English.
 *
 * Structure:
 * - The file is structured as an object with nested objects for different sections of the application,
 *   such as the navigation bar, editor view, admin view, etc.
 * - Each nested object contains key-value pairs for specific text elements, like button labels, placeholders,
 *   and messages.
 *
 * Usage:
 * - This file is used in conjunction with the LanguageContext to provide English translations for the app.
 * - The translations object from this file is loaded into the LanguageContext based on the user's language preference.
 *
 * Example:
 * - Accessing a translation in a component:
 * 
 *   import { useContext } from 'react';
 *   import { LanguageContext } from '../path/to/LanguageContext';
 *
 *   const MyComponent = () => {
 *       const { translations } = useContext(LanguageContext);
 *       return <h1>{translations.navbar.title}</h1>;
 *   };
 *
 * Note:
 * - The key names in this file should match those in other language translation files (e.g., `fi.js`) for consistency.
 * - When adding new text elements to the application, ensure to add corresponding translations here.
 */


export default {
    searchPlaceholder: "Search Command",
    commandListTitle: "Commands",
    command: {
        anna: "output",
        et: "fd",
        eteen: "forward",
        jos: "if",
        luvuille: "for",
        miten: "to",
        oi: "rt",
        oikealle: "right",
        olkoon: "make",
        riippuen: "ifelse",
        ta: "bk",
        taakse: "backward",
        toista: "repeat",
        tulosta: "show",
        va: "lt",
        valmis: "end",
        vasemmalle: "left",
    },
    returnbutton: "Return",
    editorPlaceholder: "Write code here",
    navbar: {
        title: "Code Editor",
        login: 'Log in',
        loggedInAs: 'Logged in as: ',
        logOut: 'Log out',
        changeView: 'Change view',
        on: 'TURN OFF',
        off: 'TURN ON',
        // passwordLogin: 'Password login: ',
        passwordLoginOn: 'Password IS REQUIRED',
        passwordLoginOff: 'Password IS NOT REQUIRED'
    },
    editorView: {
        writeCode: "Write code:",
        sendToCompilerBtn: "Send code to compiler",
        sendToRobotBtn: "Send code to robot",
    },
    response: {
        serverResponded: "Server responded:",
        line: "line:",
        start: "start:",
        end: "end:",
        message: "message:",
        confirmation: "Sent to compiler!",
    },
    login: {
        title: 'Your name',
        loginButton: 'Log in',
        nameInputPlaceholder: 'name',
        notificationNameMissing: 'You can\'t login without a name!',
        notificationPasswordMissing: 'Et voi kirjautua ilman salasanaa!',
        notificationWrongCredentials: 'Wrong login credentials!',
        passwordInputPlaceholder: "password",
    },
    editorNavbar: {
        chooseFile: 'Choose File',
        fileName: 'File',
        createdAt: 'Created at',
        lastEdited: 'Last edited',
        newFile: 'New File',
        saveFile: 'Save',
        filenamePlaceholder: 'Enter a new filename',
        saveWithName: 'Save as',
        openFile: 'Open File',
        file: 'File: ',
        open: 'Open',
        delete: 'Delete',
        confirmDeleteMessage: 'Are you sure you want to delete the file: {filename} ?'
    },
    adminView:{
        adminDashboard: 'Admin Dashboard',
        userManagement: 'User Management',
        back: 'Back',
        showFiles:'Show Files',
        showUserInfo:'Show User Info',
        searchUser:'Search user...',
        username:'Username:',
        password:'Password:',
        deleteUser:'Delete User',
        noUserFilesFound:'No files found for this user.',
        noFilesFound:'No files found',
        allFiles:'All Files',
        uploadFile:'Upload',
        download:'Download',
        save:'Save',
        delete:'Delete',
        info:'Info of user {username} ',
        files:'Files of user {username}',
        creator:'Creator:   ',
        changePassword:'Change password',
        chooseOwner: 'Choose owner',
        chooseUser: 'Choose user',
        hide: 'Hide',
        restore: 'Restore',
        sendRobot: 'Send to robot',
        confirmDeleteMessage: 'Are you sure you want to delete the file: {filename} ?',
        deleteSuccesful: 'Deleted file {filename}',
        deleteFailed: 'Could not delete file {filename}',
        saveConfirmedMessage: 'File {filename} saved successfully',
        saveFailureMessage: 'File {filename} saving failed',
        passwordChangeFailed: 'Could not change password',
        deployToRobotSuccesful: 'File succesfully compiled and sent to robot',
        deployToRobotFailed: 'Could not establish a connection to robot, check if configured correctly',
        modified: 'Modified',
        change: 'Change',
        upload: 'Upload',
    },
    tooltipOpenSidebar: "Click word to display on sidebar",
    toggleLanguage: 'Vaihda Suomeksi'
};