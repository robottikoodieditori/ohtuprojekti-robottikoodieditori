import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/index.css';
import '../css/navbar.css'
import Tokenpopup from "./popup"
import { useDispatch } from 'react-redux';
import { sendName } from "../reducers/commsReducer";



const Navbar = () => {
    const { language, toggleLanguage, translations } = useContext(LanguageContext);
    const username = useSelector((state) => state.comms.nameFromServer)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const dispatch = useDispatch();


    //console.log("Navbar is rendering with language:", language);
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const logOut = () => {
        dispatch(sendName(""));
        setIsPopupOpen(false)
    };

    return (
        <div className="navbar" id="navbar">
            <h1>{translations.navbar}</h1>
            <div>
                { username === "" ? (
                    <div>
                        <button onClick={openPopup} className="lang-toggle-button"> {language == 'fi' ? "Kirjaudu" : "Login"}</button>
                        {isPopupOpen && (<Tokenpopup status={true} onClose={closePopup}/>)}
                    </div>
                ) : (
                    <div>
                        <p>{language == 'fi' ? "Olet kirjautunut nimellä: " : "Logged in as: "}{username}</p>
                        <button onClick={logOut} className="lang-toggle-button"> {language == 'fi' ? "Kirjaudu ulos" : "Log out"}</button>
                    </div>
                )
                }
            </div>
            <div className="navbar-button-container">
                <button onClick={toggleLanguage} className="lang-toggle-button" data-testid="toggleLanguageButton">
                    {language === 'fi' ? 'Switch to English' : 'Vaihda suomeksi'}
                </button>
            </div>
        </div>
    );
    
}

export default Navbar;
