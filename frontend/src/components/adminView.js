import { useState, useContext, useEffect } from 'react'; 
import { users as mockUsers, logofiles as mockLogofiles } from './mockData'; // Import mock data
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import '../css/adminView.css'; 

const AdminView = () => {
    const { translations } = useContext(LanguageContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allFiles, setAllFiles] = useState([]); // State to hold all files
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fileContent, setFileContent] = useState(''); // State for the content of the selected file
    const [viewMode, setViewMode] = useState('files'); // 'files' or 'info' on middle container

    useEffect(() => {
        // Initialize users with mock data
        setUsers(mockUsers);
        // Initialize allFiles with all mock logofiles
        setAllFiles(mockLogofiles);
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = searchQuery.length === 0
        ? users
        : users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setViewMode('files'); // Show files by default

        const filesForUser = mockLogofiles.filter(file => file.user_id === user.id);// Fetching files for the selected user from mock data
        setUserFiles(filesForUser);
    };

    const handleFileClick = (file) => {
        // Set the content of the selected file
        setFileContent(file.content);
    };

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
        setViewMode('info'); // Change view mode to show user info
    };

    // Dummy functions for button actions
    const handleUploadClick = () => alert('Upload functionality coming soon!');
    const handleDownloadClick = () => alert('Download functionality coming soon!');
    const handleModifyClick = () => alert('Modify functionality coming soon!');
    const handleDeleteClick = () => alert('Delete functionality coming soon!');
    const handleDeleteUser = () => alert('Delete user functionality coming soon!');

    return (
        <div className="admin-container">
      
            <h2>{translations?.adminView.adminDashboard}</h2>
            <div className="sections-container">

                {/* User list section */}
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
                            <div key={user.id} className="user-item">
                                <span className="user-name" tabIndex="0">{user.name}</span>
                                <div className="user-action-buttons">
                                    <button className="user-action-button" onClick={() => handleUserClick(user)}>{translations?.adminView.showFiles}</button>
                                    <button className="user-action-button" onClick={() => handleShowUserInfo(user)}>{translations?.adminView.showUserInfo}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Selected user's files section */}
                {selectedUser && (
                    <section className="admin-section user-files-section">

                        <h3>{selectedUser.name}&apos;s {viewMode === 'info' ? translations?.adminView.info : translations?.adminView.files}</h3>

                        <button className="back-button" onClick={() => setSelectedUser(null)}>
                            {translations?.adminView.back}
                        </button>
                        <div>
                            {viewMode === 'info' ? (
                                // Render user info
                                <div className="user-info">

                                    <p>{translations?.adminView.username} {selectedUser.name}</p>
                                    <p>{translations?.adminView.password} {selectedUser.password}</p>

                                    <button className="delete-user-button" onClick={() => handleDeleteUser(selectedUser.id)}>
                                        {translations?.adminView.deleteUser}
                                    </button>
                                </div>
                            ) : (
                                // Render files list
                                <ul>
                                    {userFiles.length > 0 ? (
                                        userFiles.map(file => (
                                            <li tabIndex="0" key={file.id} onClick={() => handleFileClick(file)}>
                                                {file.filename}
                                            </li>
                                        ))
                                    ) : (
                                        <p>{translations?.adminView.noUserFilesFound}</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    </section>
                )}

                {/* All files section */}

                <section className="admin-section all-files-section">
                    <h3>{translations?.adminView.allFiles}</h3>

                    <div>
                        <ul>
                            {allFiles.length > 0 ? (
                                allFiles.map(file => (
                                    <li tabIndex="0" key={file.id} onClick={() => handleFileClick(file)}>
                                        {file.filename}                                   
                                        {/* Render the filename or other attributes as needed */}
                                    </li>
                                ))
                            ) : (
                                <p>{translations?.adminView.noFilesFound}</p>
                            )}
                        </ul>
                    </div>
                </section>


            </div>
            {/* Editor section to display the selected file */}
            
            <div className="editor-section">
                <div className="editor-toolbar">
                    <button onClick={handleUploadClick}>{translations?.adminView.upload}</button>
                    <button onClick={handleDownloadClick}>{translations?.adminView.download}</button>
                    <button onClick={handleModifyClick}>{translations?.adminView.save}</button>
                    <button onClick={handleDeleteClick}>{translations?.adminView.delete}</button>
                </div>
                <Editor textContent={fileContent} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
