import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import { handleFile } from '../reducers/commsReducer';
import { setFileName, setContent, setFileId } from "../reducers/editorReducer";
import commService from "../services/comms";
import '../css/editornavbar.css';

const EditorNavbar = () => {
    const dispatch = useDispatch()
    const { translations } = useContext(LanguageContext)
    const [currentView, setCurrentView] = useState('main')
    const [fileList, setFileList] = useState([])
    const fileName = useSelector(state => state.editor.fileName)
    const fileId = useSelector(state => state.editor.fileId)
    const textContent = useSelector(state => state.editor.textContent)
    const username = useSelector(state => state.comms.username)

    useEffect(() => {
        getData()
    }, [username])

    async function getData() {
        if (window.localStorage.getItem('username')) {
            const data = await commService.getUserFiles()
            console.log(data)
            setFileList(data)
        } else {
            setFileList([])
        }
    }

    const handleNewFile = () => {
        setCurrentView('main')
        // clear current file's text contents
        dispatch(setContent(''))
        window.localStorage.removeItem('textContent')

        // clear current filename
        window.localStorage.removeItem('filename')
        dispatch(setFileName('temp'))
        setTimeout(() => (
            dispatch(setFileName(''))
        ), 1)
        
        // clear current fileId
        dispatch(setFileId(''))
        window.localStorage.removeItem('fileId')
        getData()
    }

    const handleSaveNew = (event) => {
        event.preventDefault()
        if (username) {
            dispatch(setFileName(event.target.elements.newFileNameInput.value))
            window.localStorage.setItem('textContent', textContent)
            window.localStorage.setItem('filename', event.target.elements.newFileNameInput.value)
            dispatch(handleFile(textContent, event.target.elements.newFileNameInput.value, 'new', 'save'))
            setCurrentView('main')
            getData()            
        }
    }

    const handleSaveExisting = () => {
        if (!fileName) {
            setCurrentView('newFile')
            return
        }
        if (username) {
            window.localStorage.setItem('textContent', textContent)
            dispatch(handleFile(textContent, fileName,  fileId, 'save'))
            getData()
        }
    }

    const handleFileSelection = (file) => {
        dispatch(setContent(file.textContent))
        window.localStorage.setItem('textContent', file.textContent)
        dispatch(setFileName(file.filename))
        window.localStorage.setItem('filename', file.filename)
        window.localStorage.setItem('fileId', file.file_id)
        dispatch(setFileId(file.file_id))
        setCurrentView('main')
    }

    const handleFileHiding = (file) => {
        if ( fileName == file.filename) {
            dispatch(handleFile(textContent, file.filename, file.file_id, 'hide'))
            handleNewFile()
        } else {
            dispatch(handleFile(textContent, file.filename, file.file_id, 'hide'))
            getData()
        }
        setCurrentView('main')        

    }

    const NewFileScreen = () => {
        return (
            <div className="overlay" id="overlay">
                <div className='content-saveNew' id="content-saveNew">
                    <div className="content-saveNew-header ">
                        <h2>{translations?.editorNavbar.filenamePlaceholder}</h2>
                        <div className='saveNew-header'>
                            <button className="close-button-saveNew" onClick={() => setCurrentView('main')}>X</button>
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
            </div>
        )
    }

    const FileSelectionScreen = () => {
        return (
            <div className='overlay' id="overlay">
                <div className='content-file-select'>
                    <div className="content-file-select-header">
                        <h2>{translations?.editorNavbar.chooseFile}</h2>
                        <button className='close-button-file-select' onClick={() => setCurrentView('main')}>X</button>
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
            </div>
        )
    }

    return (
        <div className='editornavbar' id='editornavbar'>
            <button className='editornavbar-button' onClick={handleNewFile}>{translations?.editorNavbar.newFile}</button>
            <button className="editornavbar-button" onClick={handleSaveExisting}>{translations?.editorNavbar.saveFile}</button>
            {currentView === 'newFile' && 
                <NewFileScreen/>
            }

            <button className="editornavbar-button" onClick={() => setCurrentView('selectScreen')}>{translations?.editorNavbar.openFile}</button>
            { currentView === 'selectScreen' &&
                <FileSelectionScreen/>
            }
            <p>{translations?.editorNavbar.file}{fileName}</p>
        </div>
    )
}

export default EditorNavbar