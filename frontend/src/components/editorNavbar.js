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
    const { language } = useContext(LanguageContext)
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
        window.localStorage.setItem('textContent', textContent)
        dispatch(saveFile(textContent, fileName))
        getData()
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
            <div className="file-select-overlay">
                <div className="file-select-content">
                    <div className='file-select-header'>
                        <button className="close-button" onClick={() => setCurrentView('main')}>X</button>
                    </div>
                    <div className='content-file-select'>
                        <h2>{language === 'fi' ? 'Anna uusi tiedoston nimi' : 'Enter a new file name'}</h2>
                        <form onSubmit={handleSaveNew}>
                            <label>                    
                                <input
                                    type="text"
                                    placeholder={
                                        language === "fi" ? "Anna uusi tiedostonimi" : "Enter a new file name"
                                    }
                                    id='newFileNameInput'
                                />
                            </label>
                            <button type='submit'>
                                {language === "fi" ? "Tallenna nimellä" : "Save as"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const FileSelectionScreen = () => {
        return (
            <div className='file-select-overlay'>
                <div className='file-select-content'>
                    <div className='file-select-header'>
                        <button className='close-button' onClick={() => setCurrentView('main')}>X</button>
                    </div>
                    <div className='content-file-select'>
                        { fileList && (
                            <div>
                                <h2>{language === 'fi' ? 'Valitse Tiedosto' : 'Choose File'}</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>{language === 'fi' ? 'Tiedostonimi' : 'Filename'}</td>
                                            <td>{language === 'fi' ? 'Luotu' : 'Created at'}</td>
                                            <td>{language === 'fi' ? 'Viimeksi muokattu' : 'Last edited'}</td>
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
            <button onClick={handleNewFile}>{language === 'fi' ? 'Uusi Tiedosto' : 'New File'}</button>
            <button onClick={handleSaveExisting}>{language === 'fi' ? 'Tallenna' : 'Save'}</button>
            {currentView === 'newFile' && 
                <div className='modal-overlay'>
                    <NewFileScreen/>
                </div>
            }

            <button onClick={() => setCurrentView('selectScreen')}>{language === 'fi' ? 'Avaa Tiedosto' : 'Open File'}</button>
            { currentView === 'selectScreen' &&
                    <div className='modal-overlay'>
                        <FileSelectionScreen/>
                    </div>
            }
            <p>{language === 'fi' ? 'Tiedosto: ' : 'File: '}{fileName}</p>
        </div>
    )
}

export default EditorNavbar