import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

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

const AdminViewFileListHeader = () => {
    const { translations } = useContext(LanguageContext)

    return (
        <thead>
            <tr className='admin-border-th'>
                <th tabIndex="0">{translations?.editorNavbar.file}</th>
                <th tabIndex="0">{translations?.adminView.creator}</th>
                <th tabIndex="0">{translations?.adminView.modified}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    )
}

export default AdminViewFileListHeader