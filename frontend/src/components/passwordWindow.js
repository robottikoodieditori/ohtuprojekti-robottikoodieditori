import Popup from "reactjs-popup"
import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import '../css/popup.css'
import '../css/input.css'
import '../css/button.css'

/**
 * PasswordWindow component handles the display of a password change dialog.
 * @component
 * @param {Object} props - The component's props.
 * @param {boolean} props.isPasswordWindowOpen - Indicates whether the password change window is open.
 * @param {function} props.setIsPasswordWindowOpen - Function to set the state of the password change window.
 * @param {function} props.handlePasswordChange - Function to handle password change.
 * @param {Object} props.selectedUser - The selected user object.
 */

const PasswordWindow = ({ isPasswordWindowOpen, setIsPasswordWindowOpen, handlePasswordChange, selectedUser }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <Popup
            open={isPasswordWindowOpen}
            closeOnDocumentClick={false}
            overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        >
            <div className='popup'>
                <button className="close-button" onClick={() => setIsPasswordWindowOpen(false)}>X</button>

                <div className="popup-container">
                    <h2 tabIndex="0">{translations?.adminView.changePassword}</h2>
                    <form className="popup-form" onSubmit={handlePasswordChange}>
                        <input
                            type='text'
                            id='passwordInput'
                            name='password'
                            placeholder={selectedUser.password}
                            className="popup-input"
                        />
                        <button className='popup-button' type="submit" value="Change">{translations.adminView.change}</button>
                    </form>
                </div>
            </div>
        </Popup>
    )
}

export default PasswordWindow