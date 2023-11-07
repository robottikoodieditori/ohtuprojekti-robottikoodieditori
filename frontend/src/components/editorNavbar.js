import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/index.css';
import '../css/editornavbar.css'
import { useDispatch } from 'react-redux';
import { saveFile, getUserFiles, getFileContent, setFileContentFromServer } from "../reducers/commsReducer";
import { setFileName } from '../reducers/editorReducer';




const EditorNavbar = () => {
    const dispatch = useDispatch();
    const { language } = useContext(LanguageContext);
    const username = useSelector(state => state.comms.userName)
    const files = useSelector((state) => state.comms.userFilesFromServer)
    const content = useSelector((state) => state.editor.textContent)
    const [selectedFile, setSelectedFile] = useState("");
    const [showNewFileInput, setShowNewFileInput] = useState(false);
    const fileName = useSelector((state) => state.editor.fileName)
    
    const setNewFileName = () => {
        if (fileName === '') {
            setShowNewFileInput(true);
        } else {
            saveToFile(fileName)
        }
    }
    useEffect(() => {
        dispatch(getUserFiles(window.localStorage.getItem('username')))
    }, [])

    const saveToFile = (fileName) => {
        dispatch(saveFile(content, fileName))
    };

    const openFile = (filename) => {
        setShowNewFileInput(false);
        dispatch(getFileContent(username, filename))
        dispatch(setFileName(filename))
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.value);
    };

    const newFile = () => {
        dispatch(setFileName('temp'))
        setTimeout(() => {
            dispatch(setFileName(''))
        }, 1)
        setShowNewFileInput(false);
        dispatch(setFileContentFromServer(''))
    }

    const handleSaveAsClick = (event) => {
        event.preventDefault();
        dispatch(setFileName(event.target.elements.newFileNameInput.value))
        console.log(event.target.elements.newFileNameInput.value+ ' pissa')
        dispatch(saveToFile(content, event.target.elements.newFileNameInput.value))
        setShowNewFileInput(false);
    };

    return (
        <div className="editornavbar" id="editornavbar">
            <button onClick={newFile}>{language === 'fi' ? "Uusi Tiedosto" : "New File"} </button>
            <button onClick={setNewFileName}>{language === 'fi' ? "Tallenna" : "Save"}</button>
            {showNewFileInput && (
                <div>
                    <form onSubmit={handleSaveAsClick}>
                        <label>                    
                            <input
                                type="text"
                                placeholder={
                                    language === "fi" ? "Anna uusi tiedostonimi" : "Enter new file name"
                                }
                                id='newFileNameInput'
                            />
                        </label>
                        <button type='submit'>
                            {language === "fi" ? "Tallenna nimellä" : "Save as"}
                        </button>
                    </form>
                </div>
            )}
            { files && username && (
                <div className='paska'>
                    <p>{language === 'fi' ? "Avaa tiedosto" : "Open file"}</p>
                    <select name="files" id="fileSelect" value={selectedFile} onChange={handleFileSelect}>
                        <option value="">{""}</option>
                        {files.map((file) => (
                            <option key={file.filename} value={file.filename}>
                                {file.filename}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => openFile(selectedFile)}>{language === 'fi' ? "Avaa" : "Open"}</button>
                </div>
            )}
        </div>
    );
    
}

export default EditorNavbar;
