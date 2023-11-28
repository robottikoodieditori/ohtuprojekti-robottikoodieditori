import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const AdminViewUserInfo = ({ selectedUser, isPasswordWindowOpen, setIsPasswordWindowOpen, PasswordWindow}) => {
    const { translations } = useContext(LanguageContext)

    return (
        <div className="user-info">
            <p>{translations?.adminView.username} {selectedUser.name}</p>
            <p>{translations?.adminView.password} {selectedUser.password}</p>

            <button className="change-password-button" onClick={() => {setIsPasswordWindowOpen(true)}}> Vaihda salasana </button>
            { isPasswordWindowOpen &&
                <PasswordWindow />
            }
        </div>
    )
}

export default AdminViewUserInfo