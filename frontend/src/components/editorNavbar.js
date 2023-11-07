import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../contexts/languagecontext';
import '../css/index.css';
import '../css/editornavbar.css'
import { useDispatch } from 'react-redux';
import { saveFile, getUserFiles, getFileContent, setFileContentFromServer } from "../reducers/commsReducer";
import { setFileName } from '../reducers/editorReducer';




const EditorNavbar = () => {
    const { language } = useContext(LanguageContext);
    const username = useSelector(state => state.comms.userName)
    getUserFiles(username)
    //const files = useSelector((state) => state.comms.userFiles)
    const mockFile = ["File1", "File2", "File3"]
    const content = useSelector((state) => state.editor.textContent)
    const dispatch = useDispatch();
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

    const saveToFile = (fileName) => {
        dispatch(saveFile(content, fileName, username))
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
        dispatch(saveToFile(event.target.elements.newFileNameInput.value))
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
            <p>{language === 'fi' ? "Avaa tiedosto" : "Open file"}</p>
            <select name="files" id="fileSelect" value={selectedFile} onChange={handleFileSelect}>
                <option value="">{""}</option>
                {mockFile.map((file, index) => (
                    <option key={index} value={file}>
                        {file}
                    </option>
                ))}
            </select>
            <button onClick={() => openFile(selectedFile)}>{language === 'fi' ? "Avaa" : "Open"}</button>
        </div>
    );
    
}

export default EditorNavbar;
