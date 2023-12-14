import { useContext } from 'react';
import { LanguageContext } from "../../contexts/languagecontext";
import AdminViewFileList from './adminViewFileList';

/**
 * `AdminViewAllFilesSection` component displays a list of all files in the admin interface.
 * It uses the `AdminViewFileList` component to render the file list, and provides
 * functionalities like file selection, visibility toggling, deletion, and downloading.
 * This component is essential for managing the overall file system from an administrative perspective.
 *
 * @component
 * @example
 * return (
 *   <AdminViewAllFilesSection
 *      allFiles={allFiles}
 *      users={users}
 *      handleFileClick={handleFileClick}
 *      handleVisibleClick={handleVisibleClick}
 *      handleDeleteClick={handleDeleteClick}
 *      handleDownloadClick={handleDownloadClick}
 *      setOpenedFile={setOpenedFile}
 *   />
 * )
 *
 * @param {Object} props - Props for AdminViewAllFilesSection
 * @param {Array} props.allFiles - Array of all files in the system
 * @param {Array} props.users - Array of all user objects
 * @param {Function} props.handleFileClick - Function to handle file click event
 * @param {Function} props.handleVisibleClick - Function to handle file visibility toggle
 * @param {Function} props.handleDeleteClick - Function to handle file deletion
 * @param {Function} props.handleDownloadClick - Function to handle file download
 * @param {Function} props.setOpenedFile - Function to set the currently opened file
 */

const AdminViewAllFilesSection = ({ allFiles, users, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick, setOpenedFile, handleSortClick, sortedOrder }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <section className="admin-section all-files-section" id="all-files-section" aria-label="all files section">
            <h3 tabIndex="0">{translations?.adminView.allFiles}</h3>

            <div className='all-files' id='all-files'>
                <AdminViewFileList
                    files={allFiles}
                    users={users}
                    handleFileClick={handleFileClick}
                    handleVisibleClick={handleVisibleClick}
                    handleDeleteClick={handleDeleteClick}
                    handleDownloadClick={handleDownloadClick}
                    setOpenedFile={setOpenedFile}
                    handleSortClick={handleSortClick}
                    sortedOrder={sortedOrder}
                    allFiles={allFiles}
                />
            </div>
        </section>
    )
}

export default AdminViewAllFilesSection