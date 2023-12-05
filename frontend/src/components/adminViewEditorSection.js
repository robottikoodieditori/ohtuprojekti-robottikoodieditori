import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import UploadScreen from './uploadScreen';

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