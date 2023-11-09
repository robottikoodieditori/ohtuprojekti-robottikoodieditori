import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/index.css';
import '../css/navbar.css'
import Tokenpopup from "./popup"
import { useDispatch } from 'react-redux';
import { logout } from "../reducers/commsReducer";



const Navbar = () => {
    const { toggleLanguage, translations } = useContext(LanguageContext);
    const username = useSelector((state) => state.comms.username)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const dispatch = useDispatch();

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const logOutFromServer = () => {
        dispatch(logout());
        setIsPopupOpen(false)
    };

    return (
        <div className="navbar" id="navbar">
            <h1>{translations.navbar.title}</h1>
            <div>
                { username === "" ? (
                    <div className='lang-toggle-button-container'>
                        <button onClick={openPopup} className="lang-toggle-button"> {translations?.navbar.login}</button>
                        {isPopupOpen && (<Tokenpopup status={true} onClose={closePopup}/>)}
                    </div>
                ) : (
                    <>
                        <div className='logout'>
                            <div className='username'> <p>{translations?.navbar.loggedInAs}{username}</p> </div>
                            <div className="logout-button-container">
                                <button onClick={logOutFromServer} className="logout-button">
                                    {translations?.navbar.logOut}
                                </button>
                            </div>
                        
                        </div>
                    </>
                )
                }
            </div>
            <div className="language-button-container">
                <button onClick={toggleLanguage} className="lang-toggle-button" data-testid="toggleLanguageButton">
                    {translations?.toggleLanguage}
                </button>
            </div>
        </div>
    );
    
}

export default Navbar;
