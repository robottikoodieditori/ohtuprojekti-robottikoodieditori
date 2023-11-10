import React, { useState, useEffect } from 'react';
import comms from '../services/comms';
import '../css/adminView.css'; // Import the CSS file

const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        comms.getUsers()
            .then(fetchedUsers => {
                console.log('Users fetched', fetchedUsers); // Debug: log fetched users
                setUsers(fetchedUsers);
            })
            .catch(error => {
                console.error('Failed to fetch users:', error);
            });
    }, []);

    useEffect(() => {
        comms.getUserFiles()
            .then(files => setUserFiles(files))
            .catch(error => console.error('Failed to fetch files:', error));
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
            comms.getUserFiles(user.id) // Call the function with the selected user's ID
                .then(files => {
                    console.log('User files fetched', files); // Debug: log fetched files
                    setUserFiles(files); // Update the userFiles state with the fetched files
                })
                .catch(error => {
                    console.error('Failed to fetch files for user:', error);
                });
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
                        {userFiles.length > 0 ? (
                            userFiles.map(file => (
                                <li key={file.id}>
                                    {file.filename}
                                    {/* Render the filename or other attributes as needed */}
                                </li>
                            ))
                        ) : (
                            <p>No files found.</p>
                        )}
                    </ul>
                </section>

                {/* Selected user's files section */}
                {selectedUser && (
                    <section className="user-files-section">
                        <h3>{selectedUser.name}'s Files</h3>
                        <ul className="user-specific-files-list">
                            {userFiles.length > 0 ? (
                                userFiles.map(file => (
                                    <li key={file.id}>
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
