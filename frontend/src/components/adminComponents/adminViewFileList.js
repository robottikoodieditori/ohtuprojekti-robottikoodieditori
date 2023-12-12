import AdminViewFileListHeader from './adminViewFileListHeader';
import AdminViewFileListEntry from './adminViewFileListEntry';
import '../../css/table.css'

/**
 * `AdminViewFileList` component is responsible for rendering a list of files in a table format in the admin panel.
 * It uses `AdminViewFileListHeader` for the table header and `AdminViewFileListEntry` for each file entry.
 * This component handles file-related actions such as clicking on a file, toggling visibility, deleting, and downloading files.
 *
 * @component
 * @example
 * return (
 *   <AdminViewFileList
 *      files={files}
 *      users={users}
 *      handleFileClick={handleFileClick}
 *      handleVisibleClick={handleVisibleClick}
 *      handleDeleteClick={handleDeleteClick}
 *      handleDownloadClick={handleDownloadClick}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewFileList
 * @param {Array} props.files - Array of file objects to display
 * @param {Array} props.users - Array of user objects for file ownership information
 * @param {Function} props.handleFileClick - Function to handle the event when a file is clicked
 * @param {Function} props.handleVisibleClick - Function to handle visibility toggle of a file
 * @param {Function} props.handleDeleteClick - Function to handle the deletion of a file
 * @param {Function} props.handleDownloadClick - Function to handle downloading a file
 */

const AdminViewFileList = ({ files, users, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick }) => {

    return (
        <table>
            <AdminViewFileListHeader />
            <tbody id='files-body'>
                {files.map(file => (
                    <AdminViewFileListEntry
                        key={file.id}
                        file={file}
                        users={users}
                        handleFileClick={handleFileClick}
                        handleVisibleClick={handleVisibleClick}
                        handleDeleteClick={handleDeleteClick}
                        handleDownloadClick={handleDownloadClick}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default AdminViewFileList