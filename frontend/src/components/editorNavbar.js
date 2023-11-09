import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import { saveFile } from '../reducers/commsReducer';
import { setFileName, setContent } from "../reducers/editorReducer";
import commService from "../services/comms";
import '../css/index.css';
import '../css/editornavbar.css';

const EditorNavbar = () => {
    const dispatch = useDispatch()
    const { translations } = useContext(LanguageContext)
    const [currentView, setCurrentView] = useState('main')
    const [fileList, setFileList] = useState([])
    const fileName = useSelector(state => state.editor.fileName)
    const textContent = useSelector(state => state.editor.textContent)
    const username = useSelector(state => state.comms.username)

    useEffect(() => {
        getData()
    }, [username])

    async function getData() {
        if (window.localStorage.getItem('username')) {
            const data = await commService.getUserFiles()
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
        getData()
    }

    const handleSaveNew = (event) => {
        event.preventDefault()
        if (username) {
            dispatch(setFileName(event.target.elements.newFileNameInput.value))
            window.localStorage.setItem('textContent', textContent)
            window.localStorage.setItem('filename', event.target.elements.newFileNameInput.value)
            dispatch(saveFile(textContent, event.target.elements.newFileNameInput.value))
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
            dispatch(saveFile(textContent, fileName))
            getData()
        }
    }

    const handleFileSelection = (file) => {
        dispatch(setContent(file.textContent))
        window.localStorage.setItem('textContent', file.textContent)
        dispatch(setFileName(file.filename))
        window.localStorage.setItem('filename', file.filename)
        setCurrentView('main')
    }


    const NewFileScreen = () => {
        return (
            <div className="file-select-overlay" id="file-select-overlay">
                <div className="file-select-content">
                    <div className='file-select-header'>
                        <button className="close-button" onClick={() => setCurrentView('main')}>X</button>
                    </div>
                    <div className='content-file-select' id='content-file-select'>
                        <h2>{translations?.editorNavbar.filenamePlaceholder}</h2>
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
                            <button type='submit'>
                                {translations?.editorNavbar.saveWithName}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const FileSelectionScreen = () => {
        return (
            <div className='file-select-overlay' id="file-select-overlay">
                <div className='file-select-content'>
                    <div className='file-select-header'>
                        <button className='close-button' onClick={() => setCurrentView('main')}>X</button>
                    </div>
                    <div className='content-file-select'>
                        { fileList && (
                            <div>
                                <h2>{translations?.editorNavbar.chooseFile}</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>{translations?.editorNavbar.fileName}</td>
                                            <td>{translations?.editorNavbar.createdAt}</td>
                                            <td>{translations?.editorNavbar.lastEdited}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileList.map(file => (
                                            <tr key={file.filename} className='' onClick={() => handleFileSelection(file)}>
                                                <td>{file.filename}</td>
                                                <td>{file.created}</td>
                                                <td>{file.last_updated}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='editornavbar' id='editornavbar'>
            <button onClick={handleNewFile}>{translations?.editorNavbar.newFile}</button>
            <button onClick={handleSaveExisting}>{translations?.editorNavbar.saveFile}</button>
            {currentView === 'newFile' && 
                <div className='modal-overlay'>
                    <NewFileScreen/>
                </div>
            }

            <button onClick={() => setCurrentView('selectScreen')}>{translations?.editorNavbar.openFile}</button>
            { currentView === 'selectScreen' &&
                    <div className='modal-overlay'>
                        <FileSelectionScreen/>
                    </div>
            }
            <p>{translations?.editorNavbar.file}{fileName}</p>
        </div>
    )
}

export default EditorNavbar