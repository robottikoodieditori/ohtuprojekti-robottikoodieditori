/**
 * fi.js
 * ---------------------------------------------------
 * 
 * Overview:
 * The `fi.js` file contains Finnish translations for text elements used throughout the application.
 * It exports a single object with key-value pairs, where each key represents a specific UI element or label,
 * and the corresponding value is the text in Finnish.
 *
 * Structure:
 * - The file is structured as an object with nested objects for different sections of the application,
 *   such as the navigation bar, editor view, admin view, etc.
 * - Each nested object contains key-value pairs for specific text elements, like button labels, placeholders,
 *   and messages.
 *
 * Usage:
 * - This file is used in conjunction with the LanguageContext to provide Finnish translations for the app.
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
 * - The key names in this file should match those in other language translation files (e.g., `en.js`) for consistency.
 * - When adding new text elements to the application, ensure to add corresponding translations here.
 */

export default {
    searchPlaceholder: "Etsi käskyä",
    commandListTitle: "Käskyt",
    command: {
        anna: "anna",
        et: "et",
        eteen: "eteen",
        jos: "jos",
        luvuille: "luvuille",
        miten: "miten",
        oi: "oi",
        oikealle: "oikealle",
        olkoon: "olkoon",
        riippuen: "riippuen",
        ta: "ta",
        taakse: "taakse",
        toista: "toista",
        tulosta: "tulosta",
        va: "va",
        valmis: "valmis",
        vasemmalle: "vasemmalle",
    },
    returnbutton: "Takaisin",
    editorPlaceholder: "Kirjoita koodia tähän",
    navbar: {
        title: "Koodieditori",
        login: 'Kirjaudu sisään',
        loggedInAs: 'Olet kirjautunut nimellä: ',
        logOut: 'Kirjaudu ulos',
        changeView: 'Vaihda näkymää',
        on: 'POIS',
        off: 'PÄÄLLE',
        // passwordLogin: 'Salasana kirjautuminen: ',
        passwordLoginOn: 'Salasana VAADITAAN',
        passwordLoginOff: 'Salasanaa EI VAADITA'
    },
    editorView: {
        writeCode: "Kirjoita koodia:",
        sendToCompilerBtn: "Lähetä koodi kääntäjälle",
        sendToRobotBtn: "Lähetä koodi robotille",
    },
    response: {
        serverResponded: "Palvelin vastasi:",
        line: "rivi:",
        start: "alku:",
        end: "loppu:",
        message: "viesti:",
        confirmation: "Lähetetty kääntäjälle!"
    },
    login: {
        title: 'Anna nimesi',
        loginButton: 'Kirjaudu',
        nameInputPlaceholder: 'nimi',
        notificationNameMissing: 'Et voi kirjautua nimettömänä!',
        notificationPasswordMissing: 'Et voi kirjautua ilman salasanaa!',
        notificationWrongCredentials: 'Väärät kirjautumistiedot!',
        passwordInputPlaceholder: "salasana",
    },
    editorNavbar: {
        chooseFile: 'Valitse tiedosto',
        createdAt: 'Luotu',
        lastEdited: 'Viimeksi muokattu',
        newFile: 'Uusi Tiedosto',
        saveFile: 'Tallenna',
        filenamePlaceholder: 'Anna uusi tiedostonimi',
        saveWithName: 'Tallenna nimellä',
        openFile: 'Avaa Tiedosto',
        file: 'Tiedosto: ',
        open: 'Avaa',
        delete: 'Poista',
        confirmDeleteMessage: 'Haluatko varmasti poistaa tiedoston: {filename} ?',
        fileName: 'Tiedosto',
    },
    adminView:{
        adminDashboard: 'Admin näkymä',
        userManagement: 'Käyttäjien hallinta',
        back: 'Takaisin',
        showFiles:'Näytä tiedostot',
        showUserInfo:'Näytä käyttäjän tiedot',
        searchUser:'Etsi käyttäjää...',
        username:'Käyttäjä:',
        password:'Salasana:',
        deleteUser:'Poista Käyttäjä',
        noUserFilesFound:'Käyttäjälle ei löytynyt tiedostoja.',
        noFilesFound: 'Tiedostoja ei löytynyt.',
        allFiles:'Kaikki tiedostot',
        uploadFile:'Tuo Tiedosto',
        download:'Lataa',
        save:'Tallenna',
        delete:'Poista',
        info:'Käyttäjän {username} tiedot',
        files:'Käyttäjän {username} tiedostot',
        creator:'Tekijä: ',
        changePassword:'Vaihda salasana',
        chooseOwner: 'Valitse omistaja',
        chooseUser: 'Valitse käyttäjä',
        hide: 'Piilota',
        restore: 'Palauta',
        sendRobot: 'Lähetä robotille',
        confirmDeleteMessage: 'Haluatko varmasti poistaa tiedoston: {filename} ?',
        deleteSuccesful: 'Tiedosto {filename} poistettiin',
        deleteFailed: 'Tiedostoa {filename} ei pystytty poistamaan',
        saveConfirmedMessage: 'Tiedosto {filename} tallennettu',
        saveFailureMessage: 'Tiedoston {filename} tallentaminen epäonnistui',
        passwordChangeFailed: 'Salasanan vaihto epäonnistui',
        deployToRobotSuccesful: 'Ohjelma kääntyi onnistuneesti ja on lähetetty robotille',
        deployToRobotFailed: 'Yhteyden muodostaminen robottiin epäonnistui, tarkista onko yhteys konfiguroitu oikein',
        modified: 'Muokattu',
        change: 'Vaihda',
        upload: 'Tuo',
    },

    tooltipOpenSidebar: "Klikkaa sanaa avataksesi sen sivupalkissa",
    toggleLanguage: 'Switch to English'
};
