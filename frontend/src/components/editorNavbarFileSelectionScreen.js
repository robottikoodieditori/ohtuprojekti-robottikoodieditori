import Popup from "reactjs-popup"
import { LanguageContext } from "../contexts/languagecontext"
import { useContext } from "react"
import '../css/button.css'

const FileSelectionScreen = ({ isFileSelectOpen, setisFileSelectOpen, handleFileSelection, handleFileHiding, fileList, }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <div className="overlay" id="overlay">
            <Popup
                open= {isFileSelectOpen}
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8'}}
            >
                <div className='content-file-select' id="content-file-select" role = "dialog" aria-label="choose file window">
                    <div className="content-file-select-header">
                        <h2 tabIndex="0">{translations?.editorNavbar.chooseFile}</h2>
                        <button className='file-close-button' onClick={() => setisFileSelectOpen(false)}>X</button>
                    </div>
                    { fileList && (
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
                                            <td className="file-open-td" onClick={() => handleFileSelection(file)}>{translations?.editorNavbar.open}</td>
                                            <td className="left-td">{file.filename}</td>
                                            <td className="center-td">{file.created}</td>
                                            <td className="right-td">{file.last_updated}</td>
                                            <td className="file-hide-td" onClick={() => handleFileHiding(file)}>{translations?.editorNavbar.delete}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Popup>
        </div>
    )
}

export default FileSelectionScreen