import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import PasswordWindow from './passwordWindow';

const AdminViewUserInfo = ({ selectedUser, isPasswordWindowOpen, setIsPasswordWindowOpen, handlePasswordChange }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <div className="user-info">
            <p>{translations?.adminView.username} {selectedUser.name}</p>
            <p>{translations?.adminView.password} {selectedUser.password}</p>

            <button className="change-password-button" onClick={() => {setIsPasswordWindowOpen(true)}}> Vaihda salasana </button>
            { isPasswordWindowOpen &&
                <PasswordWindow isPasswordWindowOpen={isPasswordWindowOpen} setIsPasswordWindowOpen={setIsPasswordWindowOpen} handlePasswordChange={handlePasswordChange} selectedUser={selectedUser} />
            }
        </div>
    )
}

export default AdminViewUserInfo