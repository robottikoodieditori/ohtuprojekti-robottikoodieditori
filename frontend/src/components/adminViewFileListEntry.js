import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

/**
 * `AdminViewFileListEntry` component represents an individual file entry within the file list in the admin panel.
 * It displays file details such as filename and creator, and provides interactive buttons for file operations
 * like opening, hiding/restoring visibility, deleting, and downloading the file. It integrates with the `LanguageContext`
 * for localization of the interface elements.
 *
 * @component
 * @example
 * return (
 *   <AdminViewFileListEntry
 *      users={users}
 *      file={file}
 *      handleFileClick={handleFileClick}
 *      handleVisibleClick={handleVisibleClick}
 *      handleDeleteClick={handleDeleteClick}
 *      handleDownloadClick={handleDownloadClick}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewFileListEntry
 * @param {Array} props.users - Array of user objects for file ownership information
 * @param {Object} props.file - File object representing the file entry
 * @param {Function} props.handleFileClick - Function to handle the event when a file is clicked
 * @param {Function} props.handleVisibleClick - Function to handle visibility toggle of a file
 * @param {Function} props.handleDeleteClick - Function to handle the deletion of a file
 * @param {Function} props.handleDownloadClick - Function to handle downloading a file
 */

const AdminViewFileListEntry = ({ users, file, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <tr id="file-row" key={file.filename} className={file.visible ? 'visible-file' : 'hidden-file'}>
            <td tabIndex="0" className='left-td' id="filename">{file.filename}</td>
            <td tabIndex="0" className='center-td' id="username">{users.find(user => user.id === file.user_id).name}</td>
            <td tabIndex="0" className='right-td' id="last-modified">{file.last_updated}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="open-button" onClick={() => handleFileClick(file)}>{translations?.editorNavbar.open}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="hide-button" onClick={() => handleVisibleClick(file)}>{file.visible ? translations?.adminView.hide : translations?.adminView.restore}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="delete-button" onClick={() => handleDeleteClick(file)}>{translations?.editorNavbar.delete}</td>
            <td tabIndex="0" className={file.visible ? 'file-button' : 'hidden-file-button'} id="download-button" onClick={() => handleDownloadClick(file)}>{translations?.adminView.download}</td>
        </tr>
    )
}

export default AdminViewFileListEntry