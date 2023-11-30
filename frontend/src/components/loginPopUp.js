// LoginPopUp.js
// This component renders a modal popup for user login. It includes functionalities for 
// inputting the username, toggling language, and handling the login process.

import { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup'; // Popup component for modal dialog
import { login, setResponseFromServer } from "../reducers/commsReducer"; // Redux action for login
import { useDispatch, useSelector } from 'react-redux'; // Redux hook for dispatching actions
import { LanguageContext } from '../contexts/languagecontext'; // Context for language settings
import '../css/popup.css'; // Styling for the popup
import '../css/button.css'
import '../css/input.css'

const LoginPopUp = ({status, onClose}) => {
    // Local state for controlling the popup's visibility and user input
    const [open, setOpen] = useState(status);
    const { toggleLanguage, translations } = useContext(LanguageContext); // Language context
    const [username, setUsername] = useState(''); // State for storing the username input
    const [notificationText, setNotificationText] = useState(''); // State for notification messages
    const [password, setPassword] = useState("")
    const dispatch = useDispatch(); // Redux dispatch function
    const passwordIsRequired = useSelector(state => state.comms.passReq)
    const responseFromServer = useSelector(state => state.comms.responseFromServer)

    // Function to update notification messages
    const updateNotificationText = (text) => setNotificationText(text);

    // Handler for username input changes
    const handleInputChange = (e) => setUsername(e.target.value);

    // Function to toggle the application language and clear notifications
    const handleLanguageChange = () => {
        toggleLanguage();
        updateNotificationText('');
    };

    useEffect(() => {
        if (responseFromServer.login && responseFromServer.login === 'FAIL') {
            setNotificationText(translations?.login.notificationWrongCredentials)
        }

        if (responseFromServer.login && responseFromServer.login === 'OK') {
            setNotificationText('')
            dispatch(setResponseFromServer({}))
            setOpen(false)
            if (onClose) onClose()
        }
    }, [responseFromServer])

    // Handler for submitting the login form
    const handleSubmit = () => {
        if (!username) {
            updateNotificationText(translations?.login.notificationNameMissing); // Show error if username is empty
            return;
        }

        if (passwordIsRequired && !password) {
            updateNotificationText(translations?.login.notificationPasswordMissing)
            return;
        }

        if (passwordIsRequired || username === 'admin') {        
            dispatch(login(username, password)); // Dispatch login action with the username
        } else {
            dispatch(login(username, false)); // Dispatch login action with the username
        }
    };

    // Function to close the popup and call onClose callback if provided
    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose();
    };

    // Function to handle password change
    const handlePassChange = (e) => setPassword(e.target.value)

    // Component rendering
    return (
        <Popup
            open={open}
            closeOnDocumentClick={false}
            overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        >
            <div className='popup' id="popup" role="dialog" aria-modal="True" aria-label="login window">
                <button className="close-button" onClick={handleClose} id='close-button'>X</button>
                <div className="popup-container">
                    <h2>{translations?.login.title}</h2>
                    <input
                        id='registration-name-input'
                        type="text"
                        placeholder={translations?.login.nameInputPlaceholder}
                        value={username}
                        onChange={handleInputChange}
                        className='popup-input'
                    />
                    {passwordIsRequired || username === 'admin' ? (
                        <input
                            id="registration-password-input"
                            type="password"
                            placeholder={translations?.login.passwordInputPlaceholder}
                            value={password}
                            onChange={handlePassChange}
                            className='popup-input'
                        />
                    ) : null}
                    <button onClick={handleSubmit} className='popup-button' id='registration-login-button'>
                        {translations?.login.loginButton}
                    </button>

                    <button onClick={handleLanguageChange} id='registration-language-toggle-button' className='popup-button'>
                        {translations?.toggleLanguage}
                    </button>

                    { notificationText ? (
                        <p> {notificationText} </p>
                    ) : null}
                </div>
            </div>
        </Popup>
    );
}

export default LoginPopUp;
