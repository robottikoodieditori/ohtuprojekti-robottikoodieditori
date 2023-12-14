import AdminViewUserListEntry from "./adminViewUserListEntry"
import { useContext } from 'react';
import { LanguageContext } from "../../contexts/languagecontext";

/**
 * `AdminViewUserListSection` component is responsible for rendering the user management section in the admin panel.
 * It provides a search functionality to filter users and displays a list of users through the `AdminViewUserListEntry` component.
 * Each user entry allows for interaction, such as selecting a user or changing the view mode.
 * The component integrates with the `LanguageContext` for localization of display texts.
 *
 * @component
 * @example
 * return (
 *   <AdminViewUserListSection
 *      searchQuery={searchQuery}
 *      handleSearchChange={handleSearchChange}
 *      filteredUsers={filteredUsers}
 *      handleUserClick={handleUserClick}
 *      setSelectedUser={setSelectedUser}
 *      setViewMode={setViewMode}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewUserListSection
 * @param {string} props.searchQuery - Current search query for filtering users
 * @param {Function} props.handleSearchChange - Function to handle changes in the search input
 * @param {Array} props.filteredUsers - Array of user objects after applying the search filter
 * @param {Function} props.handleUserClick - Function to handle click events on a user
 * @param {Function} props.setSelectedUser - Function to set the currently selected user
 * @param {Function} props.setViewMode - Function to set the view mode of the admin panel
 */

const AdminViewUserListSection = ({
    searchQuery, handleSearchChange, filteredUsers,
    handleUserClick, setSelectedUser, setViewMode}) => {
    const { translations } = useContext(LanguageContext)

    return (
        <section className="admin-section user-list-section" aria-label="user management section">
            <h3>{translations?.adminView.userManagement}</h3>

            <input
                type="text"
                placeholder={translations?.adminView.searchUser}
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <div className="user-list" aria-label="list of users">
                {filteredUsers.map(user => (
                    <AdminViewUserListEntry
                        key={user.id}
                        user={user}
                        handleUserClick={handleUserClick}
                        setSelectedUser={setSelectedUser}
                        setViewMode={setViewMode} />
                ))}
            </div>
        </section>
    )
}

export default AdminViewUserListSection