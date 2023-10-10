import { useContext } from 'react';
import { LanguageContext } from '../contexts/languagecontext';
import '../index.css';

const Navbar = () => {
    const { language, toggleLanguage, translations } = useContext(LanguageContext);  // Changed switchLanguage to toggleLanguage

    console.log("Navbar is rendering with language:", language);
    
    return (
        <div className={'navbar'} id='navbar'>
            <h1>{translations.navbar}</h1>
            <button onClick={toggleLanguage}>  {/* Directly using toggleLanguage from context */}
                {language === 'fi' ? 'Switch to English' : 'Vaihda suomeksi'}
            </button>
        </div>
    );
}

export default Navbar;
