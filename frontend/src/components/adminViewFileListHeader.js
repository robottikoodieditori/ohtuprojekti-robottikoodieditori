import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const AdminViewFileListHeader = () => {
    const { translations } = useContext(LanguageContext)

    return (
        <thead>
            <tr>
                <th tabIndex="0">{translations?.editorNavbar.file}</th>
                <th tabIndex="0">{translations?.adminView.creator}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    )
}

export default AdminViewFileListHeader