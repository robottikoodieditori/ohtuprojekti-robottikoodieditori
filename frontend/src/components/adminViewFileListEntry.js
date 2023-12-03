import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const AdminViewFileListEntry = ({ users, file, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <tr id="file-row" key={file.filename} className={file.visible ? 'visible-file' : 'hidden-file'}>
            <td tabIndex="0" id="filename">{file.filename}</td>
            <td tabIndex="0"  id="username">{users.find(user => user.id === file.user_id).name}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="open-button" onClick={() => handleFileClick(file)}>{translations?.editorNavbar.open}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="hide-button" onClick={() => handleVisibleClick(file)}>{file.visible ? translations?.adminView.hide : translations?.adminView.restore}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="delete-button" onClick={() => handleDeleteClick(file)}>{translations?.editorNavbar.delete}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="download-button" onClick={() => handleDownloadClick(file)}>{translations?.adminView.download}</td>
        </tr>
    )
}

export default AdminViewFileListEntry