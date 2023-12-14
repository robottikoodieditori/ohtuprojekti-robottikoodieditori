import '../css/button.css'
import '../css/input.css'
import '../css/popup.css'
import '../css/form.css'
import'../css/table.css'
import Popup from "reactjs-popup";
import { LanguageContext } from "../contexts/languagecontext";
import { useContext } from "react";

/**
 * `FileSelectionScreen` component renders a popup screen for file selection and hiding (deletion).
 * It displays a list of files, allowing users to select a file to open or request to hide (delete) it.
 * The component is interactive, with each file being selectable, and integrates with the `LanguageContext` 
 * for internationalization, supporting the display of text in various languages.
 *
 * @component
 * @example
 * return (
 *   <FileSelectionScreen
 *      isFileSelectOpen={isFileSelectOpen}
 *      setisFileSelectOpen={setisFileSelectOpen}
 *      handleFileSelection={handleFileSelection}
 *      handleFileHiding={handleFileHiding}
 *      fileList={fileList}
 *   />
 * )
 *
 * @param {Object} props - Props for FileSelectionScreen
 * @param {boolean} props.isFileSelectOpen - State to determine if the popup is open
 * @param {Function} props.setisFileSelectOpen - Function to toggle the popup open/close
 * @param {Function} props.handleFileSelection - Function called when a file is selected
 * @param {Function} props.handleFileHiding - Function called to request file hiding (deletion)
 * @param {Array} props.fileList - Array of file objects for display
 */

const FileSelectionScreen = ({ isFileSelectOpen, setisFileSelectOpen, handleFileSelection, handleFileHiding, fileList }) => {
    const { translations } = useContext(LanguageContext);

    return (
        <Popup
            open={isFileSelectOpen}
            closeOnDocumentClick={false}
            overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        >
            <div className='editornavbar-popup' id="content-file-select" role="dialog" aria-label="choose file window">
                <button className='close-button' onClick={() => setisFileSelectOpen(false)}>X</button>
                <div className="popup-container">
                    <h2 tabIndex="0" >{translations?.editorNavbar.chooseFile}</h2>
                    <div className='editornavbar-fileSelection'>
                        { fileList.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th className='border-th'> </th>
                                        <th className="center-th" tabIndex="0">{translations?.editorNavbar.fileName}</th>
                                        <th className="center-th" tabIndex="0">{translations?.editorNavbar.createdAt}</th>
                                        <th className="center-th" tabIndex="0">{translations?.editorNavbar.lastEdited}</th>
                                        <th className='border-th'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileList.map((file, index) => (
                                        <tr key={file.filename} className={`file-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <td role="button" tabIndex="0" className="file-open-td" onClick={() => handleFileSelection(file)} onKeyDown={(e) => e.key === 'Enter' && handleFileSelection(file)}>
                                                {translations?.editorNavbar.open}
                                            </td>
                                            <td tabIndex="0" className="left-td">{file.filename}</td>
                                            <td tabIndex="0" className="center-td">{file.created}</td>
                                            <td tabIndex="0" className="right-td">{file.last_updated}</td>
                                            <td role="button" tabIndex="0" className="file-hide-td" onClick={() => handleFileHiding(file)} onKeyDown={(e) => e.key === 'Enter' && handleFileHiding(file)}>
                                                {translations?.editorNavbar.delete}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default FileSelectionScreen;
