import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

/**
 * `AdminViewUserListEntry` component represents an individual user entry in the user list of the admin panel.
 * It displays the user's name and provides action buttons to view the user's files or user information.
 * This component integrates with the `LanguageContext` for localization and handles user interaction through provided callback functions.
 *
 * @component
 * @example
 * return (
 *   <AdminViewUserListEntry
 *      user={user}
 *      handleUserClick={handleUserClick}
 *      setSelectedUser={setSelectedUser}
 *      setViewMode={setViewMode}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewUserListEntry
 * @param {Object} props.user - Object representing the user
 * @param {Function} props.handleUserClick - Function to handle click events on the 'Show Files' button
 * @param {Function} props.setSelectedUser - Function to set the currently selected user
 * @param {Function} props.setViewMode - Function to set the view mode of the admin panel (e.g., 'info')
 */

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