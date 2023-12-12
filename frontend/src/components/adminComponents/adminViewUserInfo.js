import { useContext } from 'react';
import { LanguageContext } from "../../contexts/languagecontext";
import PasswordWindow from './passwordWindow';

/**
 * `AdminViewUserInfo` component displays detailed information about a selected user in the admin panel.
 * It shows the user's name and password, and provides an option to open a password change window.
 * The component utilizes the `PasswordWindow` for handling password changes and integrates with the `LanguageContext`
 * for localization of text elements.
 *
 * @component
 * @example
 * return (
 *   <AdminViewUserInfo
 *      selectedUser={selectedUser}
 *      isPasswordWindowOpen={isPasswordWindowOpen}
 *      setIsPasswordWindowOpen={setIsPasswordWindowOpen}
 *      handlePasswordChange={handlePasswordChange}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewUserInfo
 * @param {Object} props.selectedUser - Object representing the selected user
 * @param {boolean} props.isPasswordWindowOpen - State of the password window (open/close)
 * @param {Function} props.setIsPasswordWindowOpen - Function to open/close the password window
 * @param {Function} props.handlePasswordChange - Function to handle password change for the user
 */

const AdminViewUserInfo = ({ selectedUser, isPasswordWindowOpen, setIsPasswordWindowOpen, handlePasswordChange }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <section className="user-info" aria-label="user info section">
            <p>{translations?.adminView.username} {selectedUser.name}</p>
            <p>{translations?.adminView.password} {selectedUser.password}</p>

            <button className="button" id='change-password-button' onClick={() => {setIsPasswordWindowOpen(true)}}> {translations.adminView.changePassword} </button>
            { isPasswordWindowOpen &&
                <PasswordWindow isPasswordWindowOpen={isPasswordWindowOpen} setIsPasswordWindowOpen={setIsPasswordWindowOpen} handlePasswordChange={handlePasswordChange} selectedUser={selectedUser} />
            }
        </section>
    )
}

export default AdminViewUserInfo