import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import { saveFile } from '../reducers/commsReducer';
import { setFileName, setContent } from "../reducers/editorReducer";
import commService from "../services/comms";
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
                                        <th>{translations?.editorNavbar.fileName}</th>
                                        <th>{translations?.editorNavbar.createdAt}</th>
                                        <th>{translations?.editorNavbar.lastEdited}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileList.map(file => (
                                        <tr key={file.filename} className='file-row' onClick={() => handleFileSelection(file)}>
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