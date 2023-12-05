import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const AdminViewUserListEntry = ({user, handleUserClick, setSelectedUser, setViewMode }) => {
    const { translations } = useContext(LanguageContext)

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
        setViewMode('info');
    };

    return (
        <div key={user.id} className="user-item">
            <span className="user-name" tabIndex="0">{user.name}</span>
            <div className="user-action-buttons">
                <button className="user-action-button" onClick={() => handleUserClick(user)}>{translations?.adminView.showFiles}</button>
                <button className="user-action-button" onClick={() => handleShowUserInfo(user)}>{translations?.adminView.showUserInfo}</button>
            </div>
        </div>
    )
}

export default AdminViewUserListEntry