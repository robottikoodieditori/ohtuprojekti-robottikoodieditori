import { createContext, useState } from 'react';
import en from '../static/en';
import fi from '../static/fi';

/**
 * LanguageContext and LanguageProvider
 * ------------------------------------
 *
 * Overview:
 * The LanguageContext is a React Context used for managing internationalization in the application.
 * It provides a way to manage the current language setting and the corresponding translations.
 *
 * LanguageProvider:
 * - A provider component that encapsulates the logic for language switching and provides the LanguageContext to its children.
 * - It initializes the language state to Finnish ('fi') and loads the corresponding translations.
 * - The LanguageProvider should wrap the root component or any component tree requiring internationalization support.
 *
 * Usage:
 * - Import LanguageContext and use the useContext hook in any component to access the current language, toggleLanguage function, and translations.
 *
 * Structure:
 * - LanguageContext: Created using createContext. It holds the current language, a toggleLanguage function, and the current translations.
 * - LanguageProvider: A functional component that uses useState to manage the language and translations state.
 * - toggleLanguage: A function that toggles the language between Finnish ('fi') and English ('en'), and updates the translations accordingly.
 * - translations: The current translations object, derived from either 'en.js' or 'fi.js' based on the current language.
 *
 * Example:
 * ```
 * import { LanguageContext, LanguageProvider } from './path/to/LanguageContext';
 *
 * const App = () => (
 *   <LanguageProvider>
 *     <MyComponent />
 *   </LanguageProvider>
 * );
 *
 * const MyComponent = () => {
 *   const { translations, toggleLanguage } = useContext(LanguageContext);
 *   return (
 *     <div>
 *       <h1>{translations.title}</h1>
 *       <button onClick={toggleLanguage}>Switch Language</button>
 *     </div>
 *   );
 * };
 * ```
 *
 * Notes:
 * - Ensure that all components using the LanguageContext are within the LanguageProvider tree.
 * - The translations are stored in separate files ('en.js' and 'fi.js') and imported at the top of the LanguageProvider. 
 *   They should contain an object with key-value pairs of translated strings.
 */

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fi');
    const [translations, setTranslations] = useState(language === 'fi' ? fi : en);

    const toggleLanguage = () => {
        setLanguage(prevLang => {
            const newLang = prevLang === 'fi' ? 'en' : 'fi';
            setTranslations(newLang === 'fi' ? fi : en);
            return newLang;
        });
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};
