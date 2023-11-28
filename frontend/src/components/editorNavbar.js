import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import { handleFile } from '../reducers/commsReducer';
import { setFileName, setContent, setFileId, resetFile } from "../reducers/editorReducer";
import commService from "../services/comms";
import '../css/editornavbar.css';
import Popup from 'reactjs-popup';


const EditorNavbar = () => {
    const dispatch = useDispatch()
    const { translations } = useContext(LanguageContext)
    const [fileList, setFileList] = useState([])
    const fileObject = useSelector(state => state.editor.fileObject)
    const userObject = useSelector(state => state.comms.userObject)
    const [isFileSelectOpen, setisFileSelectOpen] = useState(false);
    const [isNewFileOpen, setisNewFileOpen] = useState(false);


    useEffect(() => {
        getData()
    }, [userObject.username])

    async function getData() {
        if (userObject.username !== '') {
            const data = await commService.getUserFiles()
            setFileList(data)
        } else {
            setFileList([])
        }
    }

    const handleNewFile = async () => {
        // clear all fields in editor reducer concerning file data
        if (fileObject.filename === '') dispatch(setFileName(null))
        // if filename is not defined, pressing new file won't clear editor, filename needs to be set to null first
        // since filename would be updated from '' to '', it wouldn't cause an update
        setTimeout(() => {
            dispatch(resetFile())
            getData()
        }, 1)
    }

    const handleSaveNew = async (event) => {
        event.preventDefault()
        if (userObject.username) {
            dispatch(setFileName(event.target.elements.newFileNameInput.value))
            await dispatch(handleFile(fileObject.textContent, event.target.elements.newFileNameInput.value, 'new', 'userId','save'))
            setisNewFileOpen(false)            
            getData()            
        }
    }

    const handleSaveExisting = () => {
        if (!fileObject.filename) {
            setisNewFileOpen(true)            
            return
        }
        if (userObject.username) {
            dispatch(handleFile(fileObject.textContent, fileObject.filename,  fileObject.fileId, 'userId',  'save'))
            getData()
        }
    }

    const handleFileSelection = (file) => {
        dispatch(setContent(file.textContent))
        dispatch(setFileName(file.filename))
        dispatch(setFileId(file.file_id))
        setisFileSelectOpen(false)
    }

    const handleFileHiding = async (file) => {
        const confirmMessage = translations?.editorNavbar.confirmDeleteMessage;

        const formattedMessage = confirmMessage
            ? confirmMessage.replace('{filename}', file.filename)
            : ""

        const confirmDelete = window.confirm(formattedMessage)
    
        if (confirmDelete) {
            if (fileObject.filename === file.filename) {
                await dispatch(handleFile(fileObject.textContent, file.filename, file.file_id, 'user_id', 'hide'))
                handleNewFile()
            } else {
                await dispatch(handleFile(fileObject.textContent, file.filename, file.file_id, 'user_id', 'hide'))
                getData()
            }
            setisFileSelectOpen(false)
        }
    }

    const NewFileScreen = () => {
        return (
            <div className="overlay" id="overlay" >
                <Popup
                    open= {isNewFileOpen}
                    closeOnDocumentClick={false}
                    overlayStyle={{ background: 'rgba(0,0,0,0.8'}}
                >
                    <div className='content-saveNew' id="content-saveNew" role = "dialog" aria-label="new file window">
                        <div className="content-saveNew-header ">
                            <h2 tabIndex="0">{translations?.editorNavbar.filenamePlaceholder}</h2>
                            <div className='saveNew-header'>
                                <button className="close-button-saveNew" onClick={() => setisNewFileOpen(false)}>X</button>
                            </div>
                        </div>
                        <form onSubmit={handleSaveNew}>
                            <label>                    
                                <input
                                    type="text"
                                    placeholder={
                                        translations?.editorNavbar.filenamePlaceholder
                                    }
                                    id='newFileNameInput'
                                />
                            </label>
                            <div className="content-saveNew-submit-button">
                                <button type='submit'>
                                    {translations?.editorNavbar.saveWithName}
                                </button>
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>
        )
    }

    const FileSelectionScreen = () => {
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
                            <button className='close-button-file-select' onClick={() => setisFileSelectOpen(false)}>X</button>
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

    return (
        <div className='editornavbar' id='editornavbar'>
            <button className='editornavbar-button' onClick={handleNewFile}>{translations?.editorNavbar.newFile}</button>
            <button className="editornavbar-button" onClick={handleSaveExisting}>{translations?.editorNavbar.saveFile}</button>
            { isNewFileOpen && 
                <NewFileScreen/>
            }

            <button className="editornavbar-button" onClick={() => setisFileSelectOpen(true)}>{translations?.editorNavbar.openFile}</button>
            { isFileSelectOpen &&
                <FileSelectionScreen/>
            }
            <p tabIndex="0">{translations?.editorNavbar.file}{fileObject.filename}</p>
        </div>
    )
}

export default EditorNavbar