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

    const username = useSelector(state => state.comms.nameFromServer)
    const files = useSelector((state) => state.comms.userFilesFromServer)
    const content = useSelector((state) => state.editor.textContent)
    const fileName = useSelector((state) => state.editor.fileName)

    const [showFileSelectInput, setFileSelectInput] = useState(false)
    const [showNewFileInput, setShowNewFileInput] = useState(false);



    const saveFileContent = () => {
        if (fileName === '') {
            setShowNewFileInput(true);
        } else {
            dispatch(saveFile(content, fileName))
        }
    }

    useEffect(() => {
        if (username) {
            dispatch(getUserFiles())
        }
    }, [username])

    const FileSelectionScreen = ({ onClose, files, onFileClick }) => {
        return (
            <div className="file-select-overlay">
                <div className="file-select-content">
                    <div className='file-select-header'>
                        <button className="close-button" onClick={onClose}>X</button>
                    </div>
                    <div className='content-file-select'>
                        { files && (
                            <div>
                                <h2>{language === 'fi' ? 'Valitse tiedosto' : 'Choose file'}</h2>
                                {files.map(file => (
                                    <div key={file.filename} onClick={() => onFileClick(file.filename)}>                           
                                        <span>{file.filename}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }


    const NewFileScreen = ({ onClose }) => {
        return (
            <div className="file-select-overlay">
                <div className="file-select-content">
                    <div className='file-select-header'>
                        <button className="close-button" onClick={onClose}>X</button>
                    </div>
                    <div className='content-file-select'>
                        <h2>{language === 'fi' ? 'Anna uusi tiedoston nimi' : 'Enter a new file name'}</h2>
                        <form onSubmit={handleSaveAsClick}>
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
        dispatch(saveFile(content, event.target.elements.newFileNameInput.value))
        setShowNewFileInput(false);
    };

    const fileOpen = (fileName) => {
        dispatch(getFileContent(fileName))
        dispatch(setFileName(fileName))    
    }

    return (
        <div className="editornavbar" id="editornavbar">
            <button onClick={newFile}>{language === 'fi' ? "Uusi Tiedosto" : "New File"} </button>
            <button onClick={saveFileContent}>{language === 'fi' ? "Tallenna" : "Save"}</button>
            {showNewFileInput && (
                <div>
                    <div className='modal-overlay'>
                        <NewFileScreen
                            onClose={() => setShowNewFileInput(false)}
                        />
                    </div>
                </div>
            )}

            <button onClick={() => setFileSelectInput(true)}>{language === 'fi' ? "Avaa tiedosto" : "Open a file"}</button>

            { showFileSelectInput && (
                <div className='modal-overlay'>
                    <FileSelectionScreen
                        onClose={() => setFileSelectInput(false)}
                        files={files}
                        onFileClick={filename => {
                            setFileSelectInput(false)
                            fileOpen(filename);
                        }}
                    />
                </div>
            )}
        </div>
    );
    
}

export default EditorNavbar;
