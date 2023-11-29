// Navbar.js
// Provides the navigation bar for the application, including language toggle, login, and logout functionality.

import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/index.css';
import '../css/navbar.css';
import '../css/button.css';
import LoginPopUp from "./loginPopUp";
import { useDispatch } from 'react-redux';
import { logout } from "../reducers/commsReducer";

// Navbar functional component definition
const Navbar = ({handleAdminViewClick}) => {
    // Access language settings and translations from LanguageContext
    const { toggleLanguage, translations } = useContext(LanguageContext);

    // Redux state selector for username, userrole and dispatcher
    const username = useSelector((state) => state.comms.userObject.username);
    const userRole = useSelector((state) => state.comms.userObject.userRole)
    const dispatch = useDispatch();

    // Local component state for managing popup visibility
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Function to open the login popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Function to close the login popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Function to handle user logout
    const logOutFromServer = () => {
        dispatch(logout()); // Dispatch logout action
        setIsPopupOpen(false); // Close the popup
    };

    // Component rendering
    return (
        <div className="navbar" id="navbar">
            {/* Application title */}
            <h1 tabIndex="0">{translations.navbar.title}</h1>
            {/* If role is admin display change view button */}
            <div className='lang-button-container'>
                { userRole === '1' && (
                    <button onClick={() => handleAdminViewClick()} className='button' id='admin-view-button'>
                        {translations?.navbar.changeView}
                    </button>
                )}
            </div>
            {/* Login and logout buttons */}
            <div>
                {username === "" ? (
                    // Display login button if no user is logged in
                    <div className='lang-button-container'>
                        <button onClick={openPopup} className="button"> {translations?.navbar.login}</button>
                        {isPopupOpen && (<LoginPopUp status={true} onClose={closePopup}/>)}
                    </div>
                ) : (
                    // Display user info and logout button if a user is logged in
                    <>
                        <div className='logout'>
                            <div className='username'> <p tabIndex="0">{translations?.navbar.loggedInAs}{username}</p> </div>
                            <div className="logout-button-container">
                                <button onClick={logOutFromServer} className="button">
                                    {translations?.navbar.logOut}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Language toggle button */}
            <div className="lang-button-container">
                <button onClick={toggleLanguage} className="button" data-testid="toggleLanguageButton">
                    {translations?.toggleLanguage}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
