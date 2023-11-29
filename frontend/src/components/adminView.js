import { useState, useContext, useEffect } from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../reducers/editorReducer";
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import '../css/adminView.css';
import '../css/adminUserinfo.css';
import '../css/adminFiles.css';
import '../css/adminButtons.css'
import Popup from 'reactjs-popup';
import commService from '../services/comms'


const AdminView = () => {
    const dispatch = useDispatch()
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
        'user_id': '', 
        'user': ''
    })
    const textContent = useSelector(state => state.editor.textContent)
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
        if (selectedUser) {
            const filesForUser = files.filter(file => file.user_id === selectedUser.id)
            setUserFiles(filesForUser);
        }
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
        const username = users.find(user => user.id === file.user_id).name
        dispatch(setContent(file.textContent))
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  file.filename,
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
                                <button className="file-close-button" onClick={() => setisUploadOpen(false)}>X</button>
                            </div>
                        </div>
                        <form id="uploadForm" encType='multipart/form-data'>
                            <label htmlFor="usernames" tabIndex ="0">{translations?.adminView.chooseOwner}</label>
                            <select
                                id="uploadUsername"
                                name="usernames"
                            >
                                <option value="" >{translations?.adminView.chooseUser}</option>
                                {filteredUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="usernames" tabIndex ="0" >{translations?.editorNavbar.chooseFile}</label>
                            <input
                                type="file"
                                accept=".logo"
                                name='file'
                                required
                                id='uploadFile'
                            />
                            <button type="submit" value="Upload" onClick={handleUpload}>{translations?.adminView.upload}</button>
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
        dispatch(setContent(res.content))
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  res.filename,
            id: res.file_id,
            user_id: user_id,
            user: username
        }));
        setisUploadOpen(false)
    }
    
    const handleDownloadClick = (file) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
        element.setAttribute('download', file.filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const handleModifyClick = (file) => {

        const saveConfirmedMessage = translations?.adminView.saveConfirmedMessage

        const formattedMessage = saveConfirmedMessage
            ? saveConfirmedMessage.replace('{filename}', file.filename)
            : ""

        commService.handleFile(textContent, file.filename, file.id, file.user_id, 'admin-save')
            .then(() => {
                alert(formattedMessage)
                getData()
            })
            .catch((error) => {
                console.error('Error saving file:', error)
            })
    }
    const handleDeleteClick = async (file) => {

        const confirmMessage = translations?.editorNavbar.confirmDeleteMessage

        const formattedMessage = confirmMessage
            ? confirmMessage.replace('{filename}', file.filename)
            : ""

        const isConfirmed = window.confirm(formattedMessage)

        if (isConfirmed) {
            await commService.handleFile(textContent, file.filename, file.id, file.user_id, 'admin-delete')
            getData()
        } else {
            // do nothing
        }
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
                                <button className="close-button" onClick={() => setIsPasswordWindowOpen(false)}>X</button>
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
        commService.changePassword(selectedUser.id, password)
        setIsPasswordWindowOpen(false)
        getData()


    }

    const handleVisibleClick = async (file) => {
        await commService.handleFile(textContent, file.filename, file.id, file.user_id, "hide")
        getData()
    }

    const handleNewFileClick = () => {
        dispatch(setContent(""))
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  "",
            id: "",
            user_id: "",
            user: ""
        }));
    }

    const handleSendToRobotClick = () => {
        commService.deployToRobot(textContent)
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
                        <h3>
                            {
                                viewMode === 'info' ?
                                    (translations?.adminView.info?.replace('{username}', selectedUser.name)) :
                                    (translations?.adminView.files?.replace('{username}', selectedUser.name))
                            }
                        </h3>
                        <button className="back-button" onClick={() => setSelectedUser(null)}>
                            {translations?.adminView.back}
                        </button>
                        <div>
                            {viewMode === 'info' ? (
                                // Render user info
                                <div className="user-info">

                                    <p>{translations?.adminView.username} {selectedUser.name}</p>
                                    <p>{translations?.adminView.password} {selectedUser.password}</p>

                                    <button className="change-password-button" onClick={() => {setIsPasswordWindowOpen(true)}}> Vaihda salasana </button>
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

                <section className="admin-section all-files-section" id="all-files-section">
                    <h3 tabIndex="0">{translations?.adminView.allFiles}</h3>

                    <div className='all-files' id="all-files">
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
                                    <tr id="file-row" key={file.filename} className={file.visible ? 'visible-file' : 'hidden-file'}>
                                        <td tabIndex="0" id="filename">{file.filename}</td>
                                        <td tabIndex="0"  id="username">{users.find(user => user.id === file.user_id).name}</td>
                                        <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="open-button" onClick={() => handleFileClick(file)}>{translations?.editorNavbar.open}</td>
                                        <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="hide-button" onClick={() => handleVisibleClick(file)}>{file.visible ? translations?.adminView.hide : translations?.adminView.restore}</td>
                                        <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="delete-button" onClick={() => handleDeleteClick(file)}>{translations?.editorNavbar.delete}</td>
                                        <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="download-button" onClick={() => handleDownloadClick(file)}>{translations?.adminView.download}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>


            </div>
            {/* Editor section to display the selected file */}
            
            <div className="editor-section" id="editor-section">
                <div className="editor-toolbar" id="editor-toolbar">
                    <button id="new-file-button" onClick={handleNewFileClick}>{translations?.editorNavbar.newFile}</button>
                    <button id="upload-button" onClick={() => setisUploadOpen(true)}>{translations?.adminView.upload}</button>
                    { isUploadOpen && 
                        <UploadScreen/>
                    }
                    <button id="download-button" onClick={() => handleDownloadClick(openedFile)}>{translations?.adminView.download} </button>
                    <button id="save-button" onClick={() =>handleModifyClick(openedFile)}>{translations?.adminView.save} </button>
                    <button id="delete-button" onClick={() => handleDeleteClick(openedFile)}>{translations?.editorNavbar.delete}</button>
                    <button id="send-to-robot-button" onClick={() => handleSendToRobotClick()}>{translations?.adminView.sendRobot}</button>
                    <p tabIndex="0">{translations?.editorNavbar.file} {openedFile['filename']}</p>
                    <p tabIndex="0">{translations?.adminView.creator} {openedFile['user']}</p>

                </div>
                <Editor textContent={textContent} />
            </div>
            

            
        </div>
    );
};

export default AdminView;
