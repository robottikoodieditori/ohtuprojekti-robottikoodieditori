import Popup from "reactjs-popup"
import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

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
        <div className='overlay'>
            <Popup
                open={isPasswordWindowOpen}
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
            >
                <div className='content-upload'>
                    <div className="content-upload-header ">
                        <h2 tabIndex="0">{translations?.adminView.changePassword}</h2>
                        <div className='upload-header'>
                            <button className="close-button-upload" onClick={() => setIsPasswordWindowOpen(false)}>X</button>
                        </div>
                    </div>
                    <form onSubmit={handlePasswordChange}>
                        <input
                            type='text'
                            id='passwordInput'
                            name='password'
                            placeholder={selectedUser.password}
                        />
                        <button type="submit" value="Change">Vaihda</button>
                    </form>
                </div>
            </Popup>
        </div>
    )
}

export default PasswordWindow