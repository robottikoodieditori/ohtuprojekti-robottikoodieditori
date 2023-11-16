import { useState, useEffect } from 'react'; 
import { users as mockUsers, logofiles as mockLogofiles } from './mockData'; // Import mock data
import Editor from './editor'; // Import the Editor component
import '../css/adminView.css'; 

const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allFiles, setAllFiles] = useState([]); // State to hold all files
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fileContent, setFileContent] = useState(''); // State for the content of the selected file

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
        // Fetching files for the selected user from mock data
        const filesForUser = mockLogofiles.filter(file => file.user_id === user.id);
        setUserFiles(filesForUser);
    };

    const handleFileClick = (file) => {
        // Set the content of the selected file
        setFileContent(file.content);
    };

    // Dummy functions for button actions
    const handleUploadClick = () => alert('Upload functionality coming soon!');
    const handleDownloadClick = () => alert('Download functionality coming soon!');
    const handleModifyClick = () => alert('Modify functionality coming soon!');
    const handleDeleteClick = () => alert('Delete functionality coming soon!');


    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <div className="sections-container"> {/* Flex container */}

                {/* User list section */}
                <section className="admin-section user-list-section">
                    <h3>User Management</h3>
                    <input
                        type="text"
                        placeholder="Search User..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <ul>
                        {filteredUsers.map(user => (
                            <li key={user.id} onClick={() => handleUserClick(user)}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Selected user's files section */}
                {selectedUser && (
                    <section className="admin-section user-files-section">
                        <h3>{selectedUser.name}&apos;s Files</h3>
                        <ul>
                            {userFiles.length > 0 ? (
                                userFiles.map(file => (
                                    <li key={file.id} onClick={() => handleFileClick(file)}>
                                        {file.filename}
                                        {/* Render the filename or other attributes as needed */}
                                    </li>
                                ))
                            ) : (
                                <p>No files found for this user.</p>
                            )}
                        </ul>
                    </section>
                )}

                {/* All files section */}
                <section className="admin-section all-files-section">
                    <h3>All Files</h3>
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
                </section>


            </div>
            {/* Editor section to display the selected file */}
            
            <div className="editor-section">
                <div className="editor-toolbar">
                    <button onClick={handleUploadClick}>Upload</button>
                    <button onClick={handleDownloadClick}>Download</button>
                    <button onClick={handleModifyClick}>Modify</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
                <Editor textContent={fileContent} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
