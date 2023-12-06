import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import UploadScreen from './uploadScreen';

/**
 * `AdminViewEditorSection` component is part of the admin panel interface, providing a comprehensive
 * editor section. It includes an editor toolbar with various functionalities such as creating new files,
 * uploading files, downloading, saving, deleting, and sending files to a robot. The section also integrates
 * the `Editor` and `UploadScreen` components for editing and uploading files, respectively. Localization is
 * supported through `LanguageContext`.
 *
 * @component
 * @example
 * return (
 *   <AdminViewEditorSection
 *      handleNewFileClick={handleNewFileClick}
 *      isUploadOpen={isUploadOpen}
 *      setisUploadOpen={setisUploadOpen}
 *      filteredUsers={filteredUsers}
 *      users={users}
 *      openedFile={openedFile}
 *      setOpenedFile={setOpenedFile}
 *      handleDownloadClick={handleDownloadClick}
 *      handleModifyClick={handleModifyClick}
 *      handleDeleteClick={handleDeleteClick}
 *      handleSendToRobotClick={handleSendToRobotClick}
 *      textContent={textContent}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewEditorSection
 * @param {Function} props.handleNewFileClick - Function to handle the creation of a new file
 * @param {boolean} props.isUploadOpen - State of the upload screen (open/close)
 * @param {Function} props.setisUploadOpen - Function to open/close the upload screen
 * @param {Array} props.filteredUsers - Array of filtered user objects
 * @param {Array} props.users - Array of user objects
 * @param {Object} props.openedFile - Object representing the currently opened file
 * @param {Function} props.setOpenedFile - Function to set the currently opened file
 * @param {Function} props.handleDownloadClick - Function to handle file download
 * @param {Function} props.handleModifyClick - Function to handle file modification
 * @param {Function} props.handleDeleteClick - Function to handle file deletion
 * @param {Function} props.handleSendToRobotClick - Function to handle sending the file to a robot
 * @param {string} props.textContent - Text content of the editor
 */

const AdminViewEditorSection = ({ handleNewFileClick, isUploadOpen, setisUploadOpen, filteredUsers, users, openedFile, setOpenedFile, handleDownloadClick, handleModifyClick, handleDeleteClick, handleSendToRobotClick, textContent }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <div className="editor-section" id="editor-section">
            <div className="editor-toolbar" id="editor-toolbar">
                <button id="new-file-button" onClick={handleNewFileClick}>{translations?.editorNavbar.newFile}</button>
                <button id="upload-button" onClick={() => setisUploadOpen(true)}>{translations?.adminView.upload}</button>
                { isUploadOpen &&
                    <UploadScreen
                        isUploadOpen={isUploadOpen}
                        setisUploadOpen={setisUploadOpen}
                        filteredUsers={filteredUsers}
                        users={users}
                        setOpenedFile={setOpenedFile}
                    />
                }
                <button id="download-button" onClick={() => handleDownloadClick(openedFile)}>{translations?.adminView.download} </button>
                <button id="save-button" onClick={() => handleModifyClick(openedFile)}>{translations?.adminView.save} </button>
                <button id="delete-button" onClick={() => handleDeleteClick(openedFile)}>{translations?.editorNavbar.delete}</button>
                <button id="send-to-robot-button" onClick={() => handleSendToRobotClick()}>{translations?.adminView.sendRobot}</button>
                <p tabIndex="0">{translations?.editorNavbar.file} {openedFile['filename']}</p>
                <p tabIndex="0">{translations?.adminView.creator} {openedFile['user']}</p>
            </div>
            <Editor textContent={textContent} />
        </div>
    )
}

export default AdminViewEditorSection