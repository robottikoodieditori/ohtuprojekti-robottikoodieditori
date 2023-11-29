// Navbar.js
// The Navbar component serves as the primary navigation bar for the application.
// It provides functionalities for user login/logout, language switching, and displays the login modal.

import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/index.css';
import '../css/navbar.css';
import LoginPopUp from "./loginPopUp"; // Component for the login modal
import { useDispatch } from 'react-redux';
import { logout } from "../reducers/commsReducer";

const Navbar = () => {
    // Access the LanguageContext to handle language switching and translations
    const { toggleLanguage, translations } = useContext(LanguageContext);

    // Retrieve the current username from the Redux state
    const username = useSelector((state) => state.comms.username);

    // State to control the visibility of the login modal
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const dispatch = useDispatch();

    // Function to open the login modal
    const openPopup = () => setIsPopupOpen(true);

    // Function to close the login modal
    const closePopup = () => setIsPopupOpen(false);

    // Function to handle user logout. Dispatches the logout action and closes any open modal
    const logOutFromServer = () => {
        dispatch(logout());
        setIsPopupOpen(false);
    };

    return (
        <div className="navbar" id="navbar">
            {/* Display the application title, fetched from translations based on current language */}
            <h1 tabIndex="0">{translations.navbar.title}</h1>
            <div>
                {username === "" ? (
                    // Display login button and modal when no user is logged in
                    <div className='lang-toggle-button-container'>
                        <button onClick={openPopup} className="lang-toggle-button">
                            {translations?.navbar.login}
                        </button>
                        {isPopupOpen && (<LoginPopUp status={true} onClose={closePopup}/>)}
                    </div>
                ) : (
                    // Display logout button and user information when a user is logged in*/
                    <div className='logout'>
                        <div className='username'>
                            <p tabIndex="0">{translations?.navbar.loggedInAs}{username}</p>
                        </div>
                        <div className="logout-button-container">
                            <button onClick={logOutFromServer} className="logout-button">
                                {translations?.navbar.logOut}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Language switching button */}
            <div className="language-button-container">
                <button onClick={toggleLanguage} className="lang-toggle-button" data-testid="toggleLanguageButton">
                    {translations?.toggleLanguage}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
