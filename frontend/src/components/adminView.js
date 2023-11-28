import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../reducers/editorReducer";
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import '../css/adminView.css';
import Popup from 'reactjs-popup';
import commService from '../services/comms'
import AdminViewUserListSection from './adminViewUserListSection';
import AdminViewUserFilesSection from './adminViewUserFilesSection';
import UploadScreen from './uploadScreen';
import AdminViewAllFilesSection from './adminViewAllFilesSection';

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
            console.log(filesForUser)
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
        commService.handleFile(textContent, file.filename, file.id, file.user_id, 'admin-save')
        getData()
    }
    const handleDeleteClick = async (file) => {

        const confirmMessage = translations?.editorNavbar.confirmDeleteMessage;

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
                <AdminViewUserListSection
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    filteredUsers={filteredUsers}
                    handleUserClick={handleUserClick}
                    setSelectedUser={setSelectedUser}
                    setViewMode={setViewMode}
                />

                {/* Selected user's files section */}
                {selectedUser && (
                    <AdminViewUserFilesSection
                        viewMode={viewMode}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        setIsPasswordWindowOpen={setIsPasswordWindowOpen}
                        isPasswordWindowOpen={isPasswordWindowOpen}
                        PasswordWindow={PasswordWindow}
                        userFiles={userFiles}
                        allFiles={allFiles}
                        users={users}
                        handleFileClick={handleFileClick}
                        handleVisibleClick={handleVisibleClick}
                        handleDeleteClick={handleDeleteClick}
                        handleDownloadClick={handleDownloadClick}
                        handlePasswordChange={handlePasswordChange}
                    />
                )}

                {/* All files section */}
                <AdminViewAllFilesSection
                    allFiles={allFiles}
                    users={users}
                    handleFileClick={handleFileClick}
                    handleVisibleClick={handleVisibleClick}
                    handleDeleteClick={handleDeleteClick}
                    handleDownloadClick={handleDownloadClick}
                    setOpenedFile={setOpenedFile}
                />
            </div>

            {/* Editor section to display the selected file */}

            <div className="editor-section">
                <div className="editor-toolbar">
                    <button onClick={handleNewFileClick}>{translations?.editorNavbar.newFile}</button>
                    <button onClick={() => setisUploadOpen(true)}>{translations?.adminView.upload}</button>
                    { isUploadOpen &&
                        <UploadScreen
                            isUploadOpen={isUploadOpen}
                            setisUploadOpen={setisUploadOpen}
                            filteredUsers={filteredUsers}
                            users={users}
                            setOpenedFile={setOpenedFile}
                        />
                    }
                    <button onClick={() => handleDownloadClick(openedFile)}>{translations?.adminView.download} </button>
                    <button onClick={() => handleModifyClick(openedFile)}>{translations?.adminView.save} </button>
                    <button onClick={() => handleDeleteClick(openedFile)}>{translations?.editorNavbar.delete}</button>
                    <button onClick={() => handleSendToRobotClick()}>{translations?.adminView.sendRobot}</button>
                    <p tabIndex="0">{translations?.editorNavbar.file} {openedFile['filename']}</p>
                    <p tabIndex="0">{translations?.adminView.creator} {openedFile['user']}</p>

                </div>
                <Editor textContent={textContent} />
            </div>

        </div>
    );
};

export default AdminView;
