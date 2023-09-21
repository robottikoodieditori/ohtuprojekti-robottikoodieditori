import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fi');  // Default language is Finnish

    const toggleLanguage = () => {
        setLanguage(prevLang => prevLang === 'fi' ? 'en' : 'fi');
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
