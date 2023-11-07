import { useState, useEffect } from 'react';

const AdminView = () => {
    const [pin, setPin] = useState("");
    const [users, setUsers] = useState([]); // List of users
    const [searchQuery, setSearchQuery] = useState(""); // For the search input
    const [selectedUser, setSelectedUser] = useState(null); // For the currently selected user
    
    useEffect(() => {
        // Fetch users and files data here
        // This is where you'd typically make an API call to get the users and their files
    }, []);

    // Function to generate a random PIN
    const generatePin = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtered list based on search query
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle user click to display their files
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <section>
                <h3>PIN Code Management</h3>
                <div>
                    <label>Set Class PIN:</label>
                    <input 
                        type="text" 
                        placeholder="Enter New PIN" 
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                    <button onClick={() => setPin(generatePin())}>Generate Random PIN</button>
                    <button onClick={() => {/* function to update PIN */}}>Update PIN</button>
                </div>
            </section>
            
            <section>
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
                            <button onClick={() => {/* function to reset password */}}>Reset Password</button>
                        </li>
                    ))}
                </ul>
            </section>

            {selectedUser && (
                <section>
                    <h3>File Management for {selectedUser.name}</h3>
                    <ul>
                        {selectedUser.files.map(file => (
                            <li key={file.id}>
                                {file.name}
                                <button onClick={() => {/* function to view file */}}>View</button>
                                <button onClick={() => {/* function to comment on file */}}>Comment</button>
                                <button onClick={() => {/* function to delete file */}}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default AdminView;
