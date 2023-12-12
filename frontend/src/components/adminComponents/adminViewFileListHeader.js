import { useContext } from 'react';
import { LanguageContext } from "../../contexts/languagecontext";

/**
 * `AdminViewFileListHeader` component renders the header for the file list table in the admin panel.
 * It displays column titles for file information, such as the file name and creator, utilizing translations
 * from the `LanguageContext` for localization support. This header is part of the `AdminViewFileList` component,
 * providing a structured layout for file information display.
 *
 * @component
 * @example
 * return <AdminViewFileListHeader />
 *
 */

const AdminViewFileListHeader = ( {files, handleSortClick, sortedOrder}) => {
    const { translations } = useContext(LanguageContext)
    return (
        <thead>
            <tr className='admin-border-th'>
                <th role='button' onClick={() => handleSortClick(files, 'filename')} tabIndex="0">{translations?.editorNavbar.file} {sortedOrder.key === 'filename' ? (sortedOrder.order ? '▲' : '▼') : ''}</th>
                <th role='button' onClick={() => handleSortClick(files, 'username')} tabIndex="0">{translations?.adminView.creator} {sortedOrder.key === 'username' ? (sortedOrder.order ? '▲' : '▼') : ''}</th>
                <th role='button' onClick={() => handleSortClick(files, 'last_updated')} tabIndex="0">{translations?.adminView.modified} {sortedOrder.key === 'last_updated' ? (sortedOrder.order ? '▲' : '▼') : ''}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    )
}

export default AdminViewFileListHeader