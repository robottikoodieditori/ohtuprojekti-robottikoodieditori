import { useState, useContext, useEffect } from 'react'; 
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import '../css/adminView.css'; 
import Popup from 'reactjs-popup';
import commService from '../services/comms'


const AdminView = () => {
    const { translations } = useContext(LanguageContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allFiles, setAllFiles] = useState([]); 
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState('files'); // 'files' or 'info' on middle container
    const [openedFile, setOpenedFile] = useState({
        'filename' : '', 
        'id': '', 
        'textContent':'', 
        'user_id': '', 
        'user': ''
    })
    const [isUploadOpen, setisUploadOpen] = useState(false)
    const [isPasswordWindowOpen, setIsPasswordWindowOpen] = useState(false)




    useEffect( () => {
        getData()
    }, []);

    const getData = async () => {
        const files = await commService.getFiles()
        const users = await commService.getUsers()
        setAllFiles(files);
        setUsers(users);
    }


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
        setViewMode('files');
        const filesForUser = allFiles.filter(file => file.user_id === user.id)
        setUserFiles(filesForUser);
    };

    const handleFileClick = (file) => {
        console.log(users)
        console.log(file)
        const username = users.find(user => user.id === file.user_id).name
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  file.filename,
            textContent: file.textContent,
            id: file.id,
            user_id: file.user_id,
            user: username
        }));
    };

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
        setViewMode('info');
    };

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
                            <h2 tabIndex="0">{translations?.adminView.upload}</h2>
                            <div className='upload-header'>
                                <button className="close-button-upload" onClick={() => setisUploadOpen(false)}>X</button>
                            </div>
                        </div>
                        <form id="uploadForm" encType='multipart/form-data'>
                            <label htmlFor="usernames">{translations?.adminView.chooseOwner}</label>
                            <select
                                id="uploadUsername"
                                name="usernames"
                            >
                                <option value="">{translations?.adminView.chooseUser}</option>
                                {filteredUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="usernames">{translations?.editorNavbar.chooseFile}</label>
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
            textContent: res.content,
            id: res.file_id,
            user_id: user_id,
            user: username
        }));
        setisUploadOpen(false)
    }
    
    const handleDownloadClick = (file) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file.textContent));
        element.setAttribute('download', file.filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const handleModifyClick = (file) => {
        console.log(file.textContent)
        commService.handleFile(file.textContent, file.filename, file.id, file.user_id, 'admin-save')
        getData()
    }
    const handleDeleteClick = async (file) => {
        await commService.handleFile(file.textContent, file.filename, file.id, file.user_id, 'admin-delete')
        getData()
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
                            <h2 tabIndex="0">{translations?.adminView.changePassword}</h2>
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
        getData()


    }

    const handleVisibleClick = async (file) => {
        await commService.handleFile(file.textContent, file.filename, file.id, file.user_id, "hide")
        getData()
    }

    const handleNewFileClick = () => {
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  "",
            textContent: "",
            id: "",
            user_id: "",
            user: ""
        }));
    }

    return (
        <div className="admin-container">
      
            <h2 tabIndex="0">{translations?.adminView.adminDashboard}</h2>
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
                                <ul id='user-files-section'>
                                    {userFiles.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>{translations?.editorNavbar.fileName}</th>
                                                    <th>{translations?.adminView.creator}</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userFiles.map(file => (
                                                    <tr key={file.filename} className={file.visible ? 'visible-file' : 'hidden-file'}>
                                                        <td>{file.filename}</td>
                                                        <td>{users.find(user => user.id === file.user_id).name}</td>
                                                        <td onClick={() => handleFileClick(file)}>{translations?.editorNavbar.open}</td>
                                                        <td onClick={() => handleVisibleClick(file)}>{file.visible ? translations?.adminView.hide : translations?.adminView.restore}</td>
                                                        <td onClick={() => handleDeleteClick(file)}>{translations?.editorNavbar.delete}</td>
                                                        <td onClick={() => handleDownloadClick(file)}>{translations?.adminView.download}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                    <h3 tabIndex="0">{translations?.adminView.allFiles}</h3>

                    <div className='all-files'>
                        <table>
                            <thead>
                                <tr>
                                    <th tabIndex="0">{translations?.editorNavbar.file}</th>
                                    <th tabIndex="0">{translations?.adminView.creator}</th>
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
                                        <td onClick={() => handleFileClick(file)}>{translations?.editorNavbar.open}</td>
                                        <td onClick={() => handleVisibleClick(file)}>{file.visible ? 'Piilota' : 'Palauta'}</td>
                                        <td onClick={() => handleDeleteClick(file)}>{translations?.editorNavbar.delete}</td>
                                        <td onClick={() => handleDownloadClick(file)}>{translations?.adminView.download}</td>
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
                    <button onClick={handleNewFileClick}>{translations?.editorNavbar.newFile}</button>
                    <button onClick={() => setisUploadOpen(true)}>{translations?.adminView.upload}</button>
                    { isUploadOpen && 
                        <UploadScreen/>
                    }
                    <button onClick={() => handleDownloadClick(openedFile)}>{translations?.adminView.download} </button>
                    <button onClick={() =>handleModifyClick(openedFile)}>{translations?.editorNavbar.open} </button>
                    <button onClick={() => handleDeleteClick(openedFile)}>{translations?.editorNavbar.delete}</button>
                    <p tabIndex="0">{translations?.editorNavbar.file} {openedFile['filename']}</p>
                    <p tabIndex="0">{translations?.adminView.creator} {openedFile['user']}</p>

                </div>
                <Editor textContent={openedFile['textContent']} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
