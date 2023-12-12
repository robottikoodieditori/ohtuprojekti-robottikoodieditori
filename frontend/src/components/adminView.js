import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../reducers/editorReducer";
import { LanguageContext } from "../contexts/languagecontext";
import commService from '../services/comms'
import AdminViewUserListSection from './adminViewUserListSection';
import AdminViewUserFilesSection from './adminViewUserFilesSection';
import AdminViewAllFilesSection from './adminViewAllFilesSection';
import AdminViewEditorSection from './adminViewEditorSection';
import '../css/adminView.css';
import { togglePassRequired } from "../reducers/commsReducer";

/**
 * `AdminView` component serves as the main interface for the administration dashboard.
 * It includes functionalities such as user and file management, file editing, and system settings.
 * The component integrates with Redux for state management and communicates with backend services for data handling.
 *
 * @component
 * @example
 * return <AdminView />
 */

const AdminView = () => {
    const dispatch = useDispatch()
    const { translations } = useContext(LanguageContext)
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allFiles, setAllFiles] = useState([]);
    const [userFiles, setUserFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState('files');
    const [openedFile, setOpenedFile] = useState({
        'filename' : '',
        'id': '',
        'user_id': '',
        'user': ''
    })
    const textContent = useSelector(state => state.editor.fileObject.textContent)
    const passwordIsRequired = useSelector(state => state.comms.passReq);
    const token = useSelector(state => state.comms.userObject.token)
    const [isUploadOpen, setisUploadOpen] = useState(false)
    const [isPasswordWindowOpen, setIsPasswordWindowOpen] = useState(false)

    useEffect( () => {
        getData()
    }, []);

    // Fetches and sets user and file data from the server
    const getData = async () => {
        const files = await commService.getAllFiles(token)
        const users = await commService.getAllUsers(token)
        setAllFiles(files);
        setUsers(users);
        if (selectedUser) {
            const filesForUser = files.filter(file => file.user_id === selectedUser.id)
            setUserFiles(filesForUser);
        }
    }

    // Updates search query based on user input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filters users based on the search query
    const filteredUsers = searchQuery.length === 0
        ? users
        : users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Handles user selection and updates UI to show selected user's files
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setViewMode('files');
        const filesForUser = allFiles.filter(file => file.user_id === user.id)
        setUserFiles(filesForUser);
    };

    // Handles file selection and updates the editor with the file's content
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

    // Triggers a download of the selected file
    const handleDownloadClick = (file) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
        element.setAttribute('download', file.filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // Handles file modifications and saves changes to the server
    const handleModifyClick = async (file) => {
        const res = await commService.adminSaveFile(file.filename, textContent, file.user_id, token)
        const formattedMessage = res !== 'FAIL'
            ? translations?.adminView.saveConfirmedMessage.replace('{filename}', file.filename)
            : translations?.adminView.saveFailureMessage.replace('{filename}', file.filename)

        alert(formattedMessage)
        getData()
    }

    // Confirms and handles file deletion
    const handleDeleteClick = async (file) => {
        const formattedMessage = translations?.editorNavbar.confirmDeleteMessage.replace(
            '{filename}', file.filename);

        const isConfirmed = window.confirm(formattedMessage)

        if (isConfirmed) {
            const res = await commService.deleteFile(file.id, token)
            const resultMessage = res !== 'FAIL'
                ? translations?.adminView.deleteSuccesful.replace('{filename}', file.filename)
                : translations?.adminView.deleteFailed.replace('{filename}', file.filename)
            getData()
            alert(resultMessage)
        }
    }

    // Handles password change for a selected user
    const handlePasswordChange = async (event) => {
        event.preventDefault()
        const password = document.getElementById('passwordInput').value;
        const res = await commService.changePassword(selectedUser.id, password, token)
        if (res === 'FAIL') {
            alert(translations?.adminView.passwordChangeFailed)
        }
        setIsPasswordWindowOpen(false)
        getData()
    }

    // Toggles file visibility on the server
    const handleVisibleClick = async (file) => {
        await commService.hideFile(file.id, token)
        getData()
    }

    // Prepares for creating a new file
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

    // Handles the action to send content to a robot
    const handleSendToRobotClick = async ()  => {
        const res = await commService.deployToRobot(textContent, token)
        const alertMessage = res !== 'FAIL'
            ? translations?.adminView.deployToRobotSuccesful
            : translations?.adminView.deployToRobotFailed
        alert(alertMessage)
    }

    return (
        <div className="admin-container">

            <div className='toggle-password-section'>
                <h1 tabIndex="0">{translations?.adminView.adminDashboard}</h1>
                <p tabIndex="0">{passwordIsRequired ? translations.navbar.passwordLoginOn : translations.navbar.passwordLoginOff }</p>
                <button onClick={() => dispatch(togglePassRequired(token))} className='button' id='password-requirement-button'>
                    {passwordIsRequired ? translations.navbar.on : translations.navbar.off}
                </button>
            </div>

            <div className="sections-container">
                {/* User list section */}
                <AdminViewUserListSection
                    searchQuery={searchQuery} handleSearchChange={handleSearchChange} filteredUsers={filteredUsers}
                    handleUserClick={handleUserClick} setSelectedUser={setSelectedUser} setViewMode={setViewMode}
                />

                {/* Selected user's files section */}
                {selectedUser && (
                    <AdminViewUserFilesSection
                        viewMode={viewMode} selectedUser={selectedUser} setSelectedUser={setSelectedUser}
                        isPasswordWindowOpen={isPasswordWindowOpen} setIsPasswordWindowOpen={setIsPasswordWindowOpen}
                        userFiles={userFiles} allFiles={allFiles} users={users} handlePasswordChange={handlePasswordChange}
                        handleFileClick={handleFileClick} handleVisibleClick={handleVisibleClick} handleDeleteClick={handleDeleteClick} handleDownloadClick={handleDownloadClick}
                    />
                )}

                {/* All files section */}
                <AdminViewAllFilesSection
                    allFiles={allFiles} users={users} setOpenedFile={setOpenedFile}
                    handleFileClick={handleFileClick} handleVisibleClick={handleVisibleClick}
                    handleDeleteClick={handleDeleteClick} handleDownloadClick={handleDownloadClick}
                />
            </div>

            {/* Editor section to display the selected file */}
            <AdminViewEditorSection
                handleNewFileClick={handleNewFileClick} isUploadOpen={isUploadOpen} setisUploadOpen={setisUploadOpen}
                filteredUsers={filteredUsers} users={users} openedFile={openedFile} setOpenedFile={setOpenedFile}
                handleDownloadClick={handleDownloadClick} handleModifyClick={handleModifyClick} handleDeleteClick={handleDeleteClick}
                handleSendToRobotClick={handleSendToRobotClick} textContent={textContent} />
        </div>
    );
};

export default AdminView;