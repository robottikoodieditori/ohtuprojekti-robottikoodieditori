import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import Editor from './editor';
import UploadScreen from './uploadScreen';

const AdminViewEditorSection = ({ handleNewFileClick, isUploadOpen, setisUploadOpen, filteredUsers, users, openedFile, setOpenedFile, handleDownloadClick, handleModifyClick, handleDeleteClick, handleSendToRobotClick, textContent }) => {
    const { translations } = useContext(LanguageContext)

    return (
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
    )
}

export default AdminViewEditorSection