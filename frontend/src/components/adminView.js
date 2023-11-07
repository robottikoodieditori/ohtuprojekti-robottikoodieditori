import { useState, useEffect } from 'react';

const AdminView = () => {
    const [pin, setPin] = useState(""); // To handle PIN input
    const [users, setUsers] = useState([]); // List of users
    const [files, setFiles] = useState([]); // List of files
    
    useEffect(() => {
        // Fetch users and files data here
    }, []);

    const generatePin = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };
    
    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>

            {/* PIN Code Management */}
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

            {/* User Management */}
            <section>
                <h3>User Management</h3>
                <input type="text" placeholder="Search User..." />
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} 
                            <button onClick={() => {/* function to reset password */}}>Reset Password</button>

                        </li>
                    ))}
                </ul>
            </section>
            
            {/* File Management */}
            <section>
                <h3>File Management</h3>
                <ul>
                    {files.map(file => (
                        <li key={file.id}>
                            {file.name}
                            <button onClick={() => {/* function to view file */}}>View</button>
                            <button onClick={() => {/* function to comment on file */}}>Comment</button>
                            <button onClick={() => {/* function to delete file */}}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>  
        </div>
    );
}

export default AdminView;
