import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import AdminViewFileList from './adminViewFileList';
import AdminViewUserInfo from './adminViewUserInfo';

/**
 * `AdminViewUserFilesSection` component is responsible for displaying either user information or user files
 * in the admin panel, based on the selected view mode. It toggles between showing user details and a list of files
 * associated with a selected user. This component also handles user interactions like file selection and user info updates.
 *
 * @component
 * @example
 * return (
 *   <AdminViewUserFilesSection
 *      viewMode="info"
 *      selectedUser={user}
 *      setSelectedUser={setSelectedUser}
 *      setIsPasswordWindowOpen={setIsPasswordWindowOpen}
 *      isPasswordWindowOpen={isPasswordWindowOpen}
 *      userFiles={userFiles}
 *      users={users}
 *      handleFileClick={handleFileClick}
 *      handleVisibleClick={handleVisibleClick}
 *      handleDeleteClick={handleDeleteClick}
 *      handleDownloadClick={handleDownloadClick}
 *      handlePasswordChange={handlePasswordChange}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewUserFilesSection
 * @param {'files'|'info'} props.viewMode - Current view mode ('files' or 'info')
 * @param {Object} props.selectedUser - Currently selected user object
 * @param {Function} props.setSelectedUser - Function to set the selected user
 * @param {Function} props.setIsPasswordWindowOpen - Function to open/close the password window
 * @param {boolean} props.isPasswordWindowOpen - State of the password window (open/close)
 * @param {Array} props.userFiles - Array of files associated with the selected user
 * @param {Array} props.users - Array of all user objects
 * @param {Function} props.handleFileClick - Function to handle file click event
 * @param {Function} props.handleVisibleClick - Function to handle file visibility toggle
 * @param {Function} props.handleDeleteClick - Function to handle file deletion
 * @param {Function} props.handleDownloadClick - Function to handle file download
 * @param {Function} props.handlePasswordChange - Function to handle password change for a user
 */

const AdminViewUserFilesSection = ({ viewMode, selectedUser, setSelectedUser,
    setIsPasswordWindowOpen, isPasswordWindowOpen, userFiles, users,
    handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick,
    handlePasswordChange }) => {

    const { translations } = useContext(LanguageContext)

    return (
        <section className="admin-section"  aria-label="user section">
            <div className='user-info-header'>
                <h3 tabIndex="0">
                    {
                        viewMode === 'info' ?
                            (translations?.adminView.info?.replace('{username}', selectedUser.name)) :
                            (translations?.adminView.files?.replace('{username}', selectedUser.name))
                    }
                </h3>

                <button className='button' onClick={() => setSelectedUser(null)}>
                    {translations?.adminView.back}
                </button>
            </div>

            <div>
                {viewMode === 'info' ? (
                    <AdminViewUserInfo
                        selectedUser={selectedUser}
                        isPasswordWindowOpen={isPasswordWindowOpen}
                        setIsPasswordWindowOpen={setIsPasswordWindowOpen}
                        handlePasswordChange={handlePasswordChange}
                    />
                )
                    : (
                        <div className='user-files' id='user-files-section'>
                            {userFiles.length > 0 ? (
                                <AdminViewFileList
                                    files={userFiles}
                                    users={users}
                                    handleFileClick={handleFileClick}
                                    handleVisibleClick={handleVisibleClick}
                                    handleDeleteClick={handleDeleteClick}
                                    handleDownloadClick={handleDownloadClick}
                                />
                            ) : (
                                <p tabIndex="0">{translations?.adminView.noUserFilesFound}</p>
                            )}
                        </div>
                    )}
            </div>
        </section>
    )
}

export default AdminViewUserFilesSection