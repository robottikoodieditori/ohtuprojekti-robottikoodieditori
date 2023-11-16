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

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <div> {/* Flex container */}

                {/* User list section */}
                <section className="user-list-section">
                    <h3>User Management</h3>
                    <input
                        type="text"
                        placeholder="Search User..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <ul className="user-list">
                        {filteredUsers.map(user => (
                            <li key={user.id} onClick={() => handleUserClick(user)}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* All files section */}
                <section className="all-files-section">
                    <h3>All Files</h3>
                    <ul className="all-files-list">
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

                {/* Editor section to display the selected file */}
                <div className="file-editor-container">
                    <Editor textContent={fileContent} />
                </div>

                {/* Selected user's files section */}
                {selectedUser && (
                    <section className="user-files-section">
                        <h3>{selectedUser.name}&apos;s Files</h3>
                        <ul className="user-specific-files-list">
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

            </div>
        </div>
    );
};

export default AdminView;
