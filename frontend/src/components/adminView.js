import { useState, useContext, useEffect } from 'react'; 
import { users as mockUsers, logofiles as mockLogofiles } from './mockData'; // Import mock data
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import '../css/adminView.css'; 
import Popup from 'reactjs-popup';
import commService from '../services/comms'


const AdminView = () => {
    const { translations } = useContext(LanguageContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allFiles, setAllFiles] = useState([]); // State to hold all files
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState('files'); // 'files' or 'info' on middle container
    const [openedFile, setOpenedFile] = useState({
        'filename' : '', 
        'id': '', 
        'content':'', 
        'user_id': '', 
        'user': ''
    })
    const [isUploadOpen, setisUploadOpen] = useState(false)
    const [isPasswordWindowOpen, setIsPasswordWindowOpen] = useState(false)




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
        console.log(file.user_id)
        const username = users.find(user => user.id === file.user_id).name
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  file.filename,
            content: file.content,
            id: file.id,
            user_id: file.user_id,
            user: username
        }));
    };

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
        setViewMode('info'); // Change view mode to show user info
    };

    // Dummy functions for button actions


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
    
    const handleUpload = async (event) => {
        event.preventDefault();
        const user_id = document.getElementById('uploadUsername').value;
        const file = document.getElementById('uploadFile').files[0];
        const formData = new FormData()
        formData.append('file', file)
        formData.append('json_data', JSON.stringify({'token': window.localStorage.getItem('token'), 'user_id':user_id}))
        const res = await commService.uploadFile(formData)
        const username = users.find(user => user.id === parseInt(user_id)).name
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  res.filename,
            content: res.content,
            id: res.file_id,
            user_id: user_id,
            user: username
        }));
        setisUploadOpen(false)
    }
    
    const handleDownloadClick = (file) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file.content));
        element.setAttribute('download', file.filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const handleModifyClick = (file) => {
        commService.handleFile(file.content, file.filename, file.id, file.user_id, 'admin-save')
    }
    const handleDeleteClick = (file) => {
        commService.handleFile(file.content, file.filename, file.id, file.user_id, 'admin-delete')
    }
    const PasswordWindow = () => {
        return (
            <div className='overlay'>
                <Popup
                    open={isPasswordWindowOpen}
                    closeOnDocumentClick={false}
                    overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
                >
                    <div className='content-upload'>
                        <div className="content-upload-header ">
                            <h2 tabIndex="0">Vaihda Salasana</h2>
                            <div className='upload-header'>
                                <button className="close-button-upload" onClick={() => setIsPasswordWindowOpen(false)}>X</button>
                            </div>
                        </div>
                        <form>
                            <input 
                                type='text' 
                                id='passwordInput'
                                name='password'
                                placeholder={selectedUser.password}
                            />
                            <button type="submit" value="Change" onClick={handlePasswordChange}>Vaihda</button>
                        </form>
                    </div>
                </Popup>
            </div>
        )
    }

    const handlePasswordChange = () => {
        const password = document.getElementById('passwordInput').value;
        console.log(password)
        commService.changePassword(selectedUser.id, password)
        setIsPasswordWindowOpen(false)


    }

    const handleVisibleClick = (file) => {
        commService.handleFile(file.content, file.filename, file.id, file.user_id, "hide")
    }

    const handleNewFileClick = () => {
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  "",
            content: "",
            id: "",
            user_id: "",
            user: ""
        }));
    }

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

                                    <button className="delete-user-button" onClick={() => {setIsPasswordWindowOpen(true); console.log('jahuu')}}> Vaihda salasana </button>
                                    { isPasswordWindowOpen && 
                                        <PasswordWindow/>
                                    }
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

                    <div className='all-files'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tiedstonnimi</th>
                                    <th>Luoja</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFiles.map(file => (
                                    <tr key={file.filename} className={file.visible ? 'visible-file' : 'hidden-file'}>
                                        <td>{file.filename}</td>
                                        <td>{users.find(user => user.id === file.user_id).name}</td>
                                        <td onClick={() => handleFileClick(file)}>Avaa</td>
                                        <td onClick={() => handleVisibleClick(file)}>{file.visible ? 'Piilota' : 'Palauta'}</td>
                                        <td onClick={() => handleDeleteClick(file)}>Poista</td>
                                        <td onClick={() => handleDownloadClick(file)}>Lataa</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>


            </div>
            {/* Editor section to display the selected file */}
            
            <div className="editor-section">
                <div className="editor-toolbar">
                    <button onClick={handleNewFileClick}>Uusi</button>
                    <button onClick={() => setisUploadOpen(true)}>Upload</button>
                    { isUploadOpen && 
                        <UploadScreen/>
                    }
                    <button onClick={() => handleDownloadClick(openedFile)}>Download</button>
                    <button onClick={() =>handleModifyClick(openedFile)}>Save</button>
                    <button onClick={() => handleDeleteClick(openedFile)}>Delete</button>
                    <p>Tiedosto: {openedFile['filename']}</p>
                    <p>Tiedoston tekijä: {openedFile['user']}</p>

                </div>
                <Editor textContent={openedFile['content']} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
