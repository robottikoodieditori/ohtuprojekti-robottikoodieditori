import { useState, useEffect } from 'react';
import comms from '../services/comms';

const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await comms.getUsers();
                console.log("Moi",data)
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Use optional chaining for safety
    const filteredUsers = users?.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            
            <section>
                <h3>User Management</h3>
                <input
                    type="text"
                    placeholder="Search User..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <ul>
                    {filteredUsers?.map(user => (
                        <li key={user.id}>
                            {user.name}
                            {/* Additional user actions can be added here */}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminView;
