import AdminViewUserListEntry from "./adminViewUserListEntry"
import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const AdminViewUserListSection = ({
    searchQuery, handleSearchChange, filteredUsers,
    handleUserClick, setSelectedUser, setViewMode}) => {
    const { translations } = useContext(LanguageContext)

    return (
        <section className="admin-section user-list-section">
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