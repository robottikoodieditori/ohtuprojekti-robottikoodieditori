import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../reducers/editorReducer";
import { LanguageContext } from "../contexts/languagecontext";
import '../css/adminView.css';
import commService from '../services/comms'
import AdminViewUserListSection from './adminViewUserListSection';
import AdminViewUserFilesSection from './adminViewUserFilesSection';
import AdminViewAllFilesSection from './adminViewAllFilesSection';
import AdminViewEditorSection from './adminViewEditorSection';

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

    const handlePasswordChange = (event) => {
        event.preventDefault()
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