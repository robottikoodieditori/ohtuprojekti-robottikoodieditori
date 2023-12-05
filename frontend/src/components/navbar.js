/**
 * `Navbar` component provides the navigation bar for the application. It includes features like language toggle,
 * login, logout functionality, and admin view access for authorized users.
 * It interacts with Redux for state management and context for language settings.
 *
 * @component
 * @example
 * return <Navbar handleAdminViewClick={handleClick} />
 *
 * @param {Object} props - Props for Navbar component
 * @param {Function} props.handleAdminViewClick - Function to handle the click event for admin view access
 */

import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/navbar.css';
import '../css/button.css';
import LoginPopUp from "./loginPopUp";
import { useDispatch } from 'react-redux';
import { logout } from "../reducers/commsReducer";

const Navbar = ({handleAdminViewClick}) => {

    const { toggleLanguage, translations } = useContext(LanguageContext);
    const username = useSelector((state) => state.comms.userObject.username);
    const userRole = useSelector((state) => state.comms.userObject.userRole);
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
        dispatch(logout());
        setIsPopupOpen(false); 
    };

    return (
        <div className="navbar" id="navbar">
            <h1 tabIndex="0">{translations.navbar.title}</h1>
            { userRole === '1' && (
                <button onClick={() => handleAdminViewClick()} className='button' id='admin-view-button'>
                    {translations?.navbar.changeView}
                </button>
            )}
            {username === "" ? (
                <>
                    <button onClick={openPopup} className="button"> {translations?.navbar.login}</button>
                    {isPopupOpen && (<LoginPopUp status={true} onClose={closePopup}/>)}
                </>
            ) : (
                <>
                    <p tabIndex="0">{translations?.navbar.loggedInAs}{username}</p>
                    <button onClick={logOutFromServer} className="button">
                        {translations?.navbar.logOut}
                    </button>
                </>
            )}
            <button onClick={toggleLanguage} className="button" data-testid="toggleLanguageButton">
                {translations?.toggleLanguage}
            </button>
        </div>
    );
}

export default Navbar;
