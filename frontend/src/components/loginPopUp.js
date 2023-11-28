import { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import { login } from "../reducers/commsReducer";
import { useDispatch } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/popup.css'

const LoginPopUp = ({status, onClose}) => {
    const [open, setOpen] = useState(status);
    const { toggleLanguage, translations } = useContext(LanguageContext)
    const [username, setUsername] = useState('');
    const [notificationText, setNotificationText] = useState('')
    const dispatch = useDispatch();

    const updateNotificationText = (text) => setNotificationText(text)

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLanguageChange = () => {
        toggleLanguage()
        updateNotificationText('')
    }

    const handleSubmit = () => {
        if (!username) {
            updateNotificationText(translations?.login.notificationNameMissing)
            return
        }
        dispatch(login(username));
        console.log(`Sending username to backend: ${username}`);
        setOpen(false);
        if (onClose === "") {
            return
        }
        onClose()
    };

    const handleClose = () => {
        setOpen(false);
        if (onClose === "") {
            return
        }
        onClose()
    }

    return (
        <div>
            <Popup
                open={open}
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
            >
                <div className='popup' id="popup" role = "dialog" aria-modal = "True" aria-label="login window" style={{ height: '300px' }}>
                    <div className="popup-header">
                        <button className="close-button" onClick={handleClose}>X</button>
                    </div>
                    <div className='content-popup'>
                        <h2>{translations?.login.title}</h2>
                        <input
                            id='registration-name-input'
                            type="text"
                            placeholder={translations?.login.nameInputPlaceholder}
                            value={username}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit}>{translations?.login.loginButton}</button>
                        <button
                            onClick={handleLanguageChange}
                            id='registration-language-toggle-button'
                        >
                            {translations?.toggleLanguage}
                        </button>
                        <p style={{color:'white'}}>{notificationText}</p>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default LoginPopUp;
