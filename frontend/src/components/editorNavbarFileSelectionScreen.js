/**
 * FileSelectionScreen.js
 * This component renders a popup screen for file selection and deletion. It allows users to select
 * a file to open or delete from the provided file list.
 * 
 * Props:
 * - isFileSelectOpen: Boolean indicating if the popup is open.
 * - setisFileSelectOpen: Function to set the state for opening/closing the popup.
 * - handleFileSelection: Function to handle the event when a file is selected.
 * - handleFileHiding: Function to handle the event when a file is requested to be deleted.
 * - fileList: Array of file objects to be displayed.
 * 
 * Uses LanguageContext for internationalization, enabling the display of text in different languages.
 */

import '../css/button.css'
import Popup from "reactjs-popup";
import { LanguageContext } from "../contexts/languagecontext";
import { useContext } from "react";

const FileSelectionScreen = ({ isFileSelectOpen, setisFileSelectOpen, handleFileSelection, handleFileHiding, fileList }) => {
    const { translations } = useContext(LanguageContext);

    return (
        <div className="overlay" id="overlay">
            <Popup
                open={isFileSelectOpen}
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
            >
                <div className='content-file-select' id="content-file-select" role="dialog" aria-label="choose file window">
                    <div className="content-file-select-header">
                        <h2 tabIndex="0">{translations?.editorNavbar.chooseFile}</h2>
                        <button className='file-close-button' onClick={() => setisFileSelectOpen(false)}>X</button>
                    </div>
                    {fileList && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="center-th">{translations?.editorNavbar.fileName}</th>
                                        <th className="center-th">{translations?.editorNavbar.createdAt}</th>
                                        <th className="center-th">{translations?.editorNavbar.lastEdited}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileList.map(file => (
                                        <tr key={file.filename} className='file-row'>
                                            <td className="file-open-td" onClick={() => handleFileSelection(file)}>{translations?.editorNavbar.open}</td>{/* Open file button */}
                                            <td className="left-td">{file.filename}</td>
                                            <td className="center-td">{file.created}</td>
                                            <td className="right-td">{file.last_updated}</td>
                                            <td className="file-hide-td" onClick={() => handleFileHiding(file)}>{translations?.editorNavbar.delete}</td> {/* Delete file button */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Popup>
        </div>
    );
};

export default FileSelectionScreen;
