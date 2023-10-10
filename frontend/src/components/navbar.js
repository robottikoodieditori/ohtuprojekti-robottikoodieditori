import { useContext } from 'react';
import { LanguageContext } from '../contexts/languagecontext';
import '../index.css';

const Navbar = () => {
    const { language, toggleLanguage, translations } = useContext(LanguageContext);

    console.log("Navbar is rendering with language:", language);

    return (
        <div className="navbar" id="navbar">
            <h1>{translations.navbar}</h1>
            <div className="navbar-button-container">
                <button onClick={toggleLanguage}  data-testid="toggleLanguageButton">
                    {language === 'fi' ? 'Switch to English' : 'Vaihda suomeksi'}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
