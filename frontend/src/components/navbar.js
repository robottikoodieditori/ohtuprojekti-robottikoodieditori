import { useContext } from 'react';
import { LanguageContext } from '../contexts/languagecontext';
import '../index.css';

const Navbar = () => {
    const { language, switchLanguage } = useContext(LanguageContext);

    const toggleLanguage = () => {
        switchLanguage(language === 'fi' ? 'en' : 'fi');
    }

    return (
        <div className={'navbar'} id='navbar'>
            <p>navbar</p>
            <button onClick={toggleLanguage}>
                {language === 'fi' ? 'Switch to English' : 'Vaihda suomeksi'}
            </button>
        </div>
    );
}

export default Navbar;
