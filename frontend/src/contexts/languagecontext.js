import { createContext, useState } from 'react';
import en from '../utils/en';
import fi from '../utils/fi';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fi');
    const [translations, setTranslations] = useState(language === 'fi' ? fi : en);

    const toggleLanguage = () => {
        setLanguage(prevLang => {
            console.log('Toggling language from:', language);
            const newLang = prevLang === 'fi' ? 'en' : 'fi';
            console.log('To:', newLang);
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
