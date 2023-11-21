import { useState, useEffect } from 'react'; 
import { users as mockUsers, logofiles as mockLogofiles } from './mockData'; // Import mock data
import Editor from './editor';
import '../css/adminView.css'; 

const AdminView = () => {
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
            <h2>Admin Dashboard</h2>
            <div className="sections-container">

                {/* User list section */}
                <section className="admin-section user-list-section">
                    <h3>User Management</h3>
                    <input
                        type="text"
                        placeholder="Search User..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="user-list">
                        {filteredUsers.map(user => (
                            <div key={user.id} className="user-item">
                                <span className="user-name">{user.name}</span>
                                <div className="user-action-buttons">
                                    <button className="user-action-button" onClick={() => handleUserClick(user)}>Show Files</button>
                                    <button className="user-action-button" onClick={() => handleShowUserInfo(user)}>Show User Info</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Selected user's files section */}
                {selectedUser && (
                    <section className="admin-section user-files-section">
                        <h3>{selectedUser.name}&apos;s {viewMode === 'info' ? 'Info' : 'Files'}</h3>
                        <button className="back-button" onClick={() => setSelectedUser(null)}>
                            Back
                        </button>
                        <div>
                            {viewMode === 'info' ? (
                                // Render user info
                                <div className="user-info">
                                    <p>Username: {selectedUser.name}</p>
                                    <p>Password: {selectedUser.password}</p>
                                    <button className="delete-user-button" onClick={() => handleDeleteUser(selectedUser.id)}>
                                        Delete User
                                    </button>
                                </div>
                            ) : (
                                // Render files list
                                <ul>
                                    {userFiles.length > 0 ? (
                                        userFiles.map(file => (
                                            <li key={file.id} onClick={() => handleFileClick(file)}>
                                                {file.filename}
                                            </li>
                                        ))
                                    ) : (
                                        <p>No files found for this user.</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    </section>
                )}

                {/* All files section */}
                <section className="admin-section all-files-section">
                    <h3>All Files</h3>
                    <div>
                        <ul>
                            {allFiles.length > 0 ? (
                                allFiles.map(file => (
                                    <li key={file.id} onClick={() => handleFileClick(file)}>
                                        {file.filename}                                   
                                        {/* Render the filename or other attributes as needed */}
                                    </li>
                                ))
                            ) : (
                                <p>No files found.</p>
                            )}
                        </ul>
                    </div>
                </section>


            </div>
            {/* Editor section to display the selected file */}
            
            <div className="editor-section">
                <div className="editor-toolbar">
                    <button onClick={handleUploadClick}>Upload</button>
                    <button onClick={handleDownloadClick}>Download</button>
                    <button onClick={handleModifyClick}>Save</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
                <Editor textContent={fileContent} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
