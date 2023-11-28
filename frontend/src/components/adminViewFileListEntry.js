import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const AdminViewFileListEntry = ({ users, file, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <tr key={file.filename} className={file.visible ? 'visible-file' : 'hidden-file'}>
            <td>{file.filename}</td>
            <td>{users.find(user => user.id === file.user_id).name}</td>
            <td className="clickable" onClick={() => handleFileClick(file)}>{translations?.editorNavbar.open}</td>
            <td className="clickable" onClick={() => handleVisibleClick(file)}>{file.visible ? translations?.adminView.hide : translations?.adminView.restore}</td>
            <td className="clickable" onClick={() => handleDeleteClick(file)}>{translations?.editorNavbar.delete}</td>
            <td className="clickable" onClick={() => handleDownloadClick(file)}>{translations?.adminView.download}</td>
        </tr>
    )
}

export default AdminViewFileListEntry