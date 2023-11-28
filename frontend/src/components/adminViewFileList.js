
import AdminViewFileListHeader from './adminViewFileListHeader';
import AdminViewFileListEntry from './adminViewFileListEntry';

const AdminViewFileList = ({ files, users, handleFileClick, handleVisibleClick, handleDeleteClick, handleDownloadClick }) => {

    return (
        <table>
            <AdminViewFileListHeader />
            <tbody>
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