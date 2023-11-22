import { useState, useContext, useEffect } from 'react'; 
import { users as mockUsers, logofiles as mockLogofiles } from './mockData'; // Import mock data
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import '../css/adminView.css'; 
import { useDispatch } from "react-redux";
import { handleFile, uploadFile } from '../reducers/commsReducer';
import Popup from 'reactjs-popup';


const AdminView = () => {
    const { translations } = useContext(LanguageContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allFiles, setAllFiles] = useState([]); // State to hold all files
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState('files'); // 'files' or 'info' on middle container
    const dispatch = useDispatch()
    const [openedFile, setOpenedFile] = useState({
        'filename' : '', 
        'file_id': '', 
        'file_content':'', 
        'user': '', 
        'user_id': '', 
    })




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
        const username = users.find(user => user.id === file.user_id).name
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  file.filename,
            file_content: file.content,
            file_id: file.id,
            user_id: file.user_id,
            user: username
        }));
    };

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
        setViewMode('info'); // Change view mode to show user info
    };

    // Dummy functions for button actions

    const [isUploadOpen, setisUploadOpen] = useState(false)

    const UploadScreen = () => {
        return (
            <div className='overlay'>
                <Popup
                    open={isUploadOpen}
                    closeOnDocumentClick={false}
                    overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
                >
                    <div className='content-upload'>
                        <div className="content-upload-header ">
                            <h2 tabIndex="0">Tuo tiedosto</h2>
                            <div className='upload-header'>
                                <button className="close-button-upload" onClick={() => setisUploadOpen(false)}>X</button>
                            </div>
                        </div>
                        <form id="uploadForm" encType='multipart/form-data'>
                            <label htmlFor="usernames">Valitse omistaja</label>
                            <select
                                id="uploadUsername"
                                name="usernames"
                            >
                                <option value="">Valitse käyttäjä</option>
                                {filteredUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="usernames">Valitse tiedosto</label>
                            <input
                                type="file"
                                accept=".logo"
                                name='file'
                                required
                                id='uploadFile'
                            />
                            <button type="submit" value="Upload" onClick={handleUpload}>Upload</button>
                        </form>
                    </div>
                </Popup>
            </div>
        );
    };
    
    const handleUpload = (event) => {
        event.preventDefault();
        const user_id = document.getElementById('uploadUsername').value;
        const file = document.getElementById('uploadFile').files[0];
        const formData = new FormData()
        formData.append('file', file)
        formData.append('json_data', JSON.stringify({'token': window.localStorage.getItem('token'), 'user_id':user_id}))
        dispatch(uploadFile(formData))
        setisUploadOpen(false)
    }
    
    const handleDownloadClick = () => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(openedFile['file_content']));
        element.setAttribute('download', openedFile['filename']);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const handleModifyClick = () => {
        dispatch(handleFile(openedFile['file_content'], openedFile['filename'], openedFile['file_id'], openedFile['user_id'], 'admin-save'))
    }
    const handleDeleteClick = () => {
        dispatch(handleFile(openedFile['file_content'], openedFile['filename'], openedFile['file_id'], openedFile['user_id'], 'admin-delete'))
    }
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
                    <button onClick={() => setisUploadOpen(true)}>Upload</button>
                    { isUploadOpen && 
                        <UploadScreen/>
                    }
                    <button onClick={handleDownloadClick}>Download</button>
                    <button onClick={handleModifyClick}>Save</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                    <p>Tiedosto: {openedFile['filename']}</p>
                    <p>Tiedoston tekijä: {openedFile['user']}</p>

                </div>
                <Editor textContent={openedFile['file_content']} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
