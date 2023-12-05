import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import AdminViewFileList from './adminViewFileList';

const AdminViewAllFilesSection = ({ allFiles, users, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick, setOpenedFile }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <section className="admin-section all-files-section" id="all-files-section">
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
                />
            </div>
        </section>
    )
}

export default AdminViewAllFilesSection