import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import AdminViewFileList from './adminViewFileList';
import AdminViewUserInfo from './adminViewUserInfo';

const AdminViewUserFilesSection = ({ viewMode, selectedUser, setSelectedUser, setIsPasswordWindowOpen, isPasswordWindowOpen, userFiles, users, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick, handlePasswordChange/*, PasswordWindow*/ }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <section className="admin-section user-files-section">
            <h3>
                {
                    viewMode === 'info' ?
                        (translations?.adminView.info?.replace('{username}', selectedUser.name)) :
                        (translations?.adminView.files?.replace('{username}', selectedUser.name))
                }
            </h3>

            <button className="back-button" onClick={() => setSelectedUser(null)}>
                {translations?.adminView.back}
            </button>

            <div>
                {viewMode === 'info' ? (
                    // Render user info
                    <AdminViewUserInfo
                        selectedUser={selectedUser}
                        isPasswordWindowOpen={isPasswordWindowOpen}
                        setIsPasswordWindowOpen={setIsPasswordWindowOpen}
                        handlePasswordChange={handlePasswordChange}
                        // PasswordWindow={PasswordWindow}
                    />
                )
                    : (
                // Render files list
                        <ul id='user-files-section'>
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
                                <p>{translations?.adminView.noUserFilesFound}</p>
                            )}
                        </ul>
                    )}
            </div>
        </section>
    )
}

export default AdminViewUserFilesSection