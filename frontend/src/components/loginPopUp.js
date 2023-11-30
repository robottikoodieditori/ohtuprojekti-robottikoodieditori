// LoginPopUp.js
// This component renders a modal popup for user login. It includes functionalities for 
// inputting the username, toggling language, and handling the login process.

import { useState, useContext } from 'react';
import Popup from 'reactjs-popup'; // Popup component for modal dialog
import { login } from "../reducers/commsReducer"; // Redux action for login
import { useDispatch, useSelector } from 'react-redux'; // Redux hook for dispatching actions
import { LanguageContext } from '../contexts/languagecontext'; // Context for language settings
import '../css/popup.css'; // Styling for the popup

const LoginPopUp = ({status, onClose}) => {
    // Local state for controlling the popup's visibility and user input
    const [open, setOpen] = useState(status);
    const { toggleLanguage, translations } = useContext(LanguageContext); // Language context
    const [username, setUsername] = useState(''); // State for storing the username input
    const [notificationText, setNotificationText] = useState(''); // State for notification messages
    const [password, setPassword] = useState("")
    const dispatch = useDispatch(); // Redux dispatch function
    const passwordIsRequired = useSelector(state => state.comms.passReq)

    // Function to update notification messages
    const updateNotificationText = (text) => setNotificationText(text);

    // Handler for username input changes
    const handleInputChange = (e) => setUsername(e.target.value);

    // Function to toggle the application language and clear notifications
    const handleLanguageChange = () => {
        toggleLanguage();
        updateNotificationText('');
    };

    // Handler for submitting the login form
    const handleSubmit = () => {
        if (!username) {
            updateNotificationText(translations?.login.notificationNameMissing); // Show error if username is empty
            return;
        }

        if (passwordIsRequired || username === 'admin') {        
            dispatch(login(username, password)); // Dispatch login action with the username
        } else {
            dispatch(login(username, false)); // Dispatch login action with the username
        }
        setOpen(false); // Close the popup after submission
        if (onClose) onClose(); // Call the onClose callback if provided
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
        <div>
            {/* React Popup component used to create the modal effect */}
            <Popup
                open={open} // Controls the visibility of the popup based on the 'open' state
                closeOnDocumentClick={false} // Prevents the popup from closing when clicking outside
                overlayStyle={{ background: 'rgba(0,0,0,0.8)' }} // Styles for the overlay background
            >
                {/* Container for the popup content */}
                <div className='popup' id="popup" role="dialog" aria-modal="True" aria-label="login window" style={{ height: '300px' }}>
                    {/* Header section of the popup */}
                    <div className="popup-header">
                        {/* Close button for the popup */}
                        <button className="close-button" onClick={handleClose}>X</button>
                    </div>
    
                    {/* Main content area of the popup */}
                    <div className='content-popup'>
                        <h2>{translations?.login.title}</h2> {/* Title of the popup */}
                        
                        {/* Input field for username */}
                        <input
                            id='registration-name-input'
                            type="text"
                            placeholder={translations?.login.nameInputPlaceholder} // Placeholder text fetched from translations
                            value={username} // Controlled input value for username
                            onChange={handleInputChange} // Function to handle changes in input
                        />
                        {/* Input field for password if it is required or username is admin */}
                        {passwordIsRequired || username === 'admin' ? (
                            <input
                                id="registration-password-input"
                                type="password"
                                placeholder={translations?.login.passwordInputPlaceholder}
                                value={password} // Controlled input value for password
                                onChange={handlePassChange} // Function to handle changes in input
                            />
                        ) : null}
                        {/* Button to submit the login form */}
                        <button onClick={handleSubmit}>{translations?.login.loginButton}</button>
    
                        {/* Button to toggle the application's language */}
                        <button
                            onClick={handleLanguageChange}
                            id='registration-language-toggle-button'
                        >
                            {translations?.toggleLanguage}
                        </button>
    
                        {/* Display of notification messages */}
                        <p style={{color:'white'}}>{notificationText}</p>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default LoginPopUp;
