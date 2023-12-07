/**
 * EditorNavbar.js
 * This component provides a navigation bar for the code editor. It handles creating new files,
 * saving existing files, selecting files to open, and hiding (deleting) files.
 * It uses states to manage the visibility of the file selection and new file screens.
 * 
 * Uses:
 * - LanguageContext for internationalization.
 * - Redux for state management related to file and user information.
 * - commService for fetching user files from the backend.
 */

import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import { handleFile, setUserFiles } from '../reducers/commsReducer';
import { setFileName, setContent, setFileId, resetFile } from "../reducers/editorReducer";
import commService from "../services/comms";
import '../css/editornavbar.css';
import '../css/button.css'
import FileSelectionScreen from "./editorNavbarFileSelectionScreen";
import NewFileScreen from "./editorNavbarNewFileScreen";


const EditorNavbar = () => {
    const dispatch = useDispatch()
    const { translations } = useContext(LanguageContext)
    const fileObject = useSelector(state => state.editor.fileObject)
    const userObject = useSelector(state => state.comms.userObject)
    const [isFileSelectOpen, setisFileSelectOpen] = useState(false);
    const [isNewFileOpen, setisNewFileOpen] = useState(false);


    // useEffect to fetch user files when the username changes.
    useEffect(() => {
        getData()
    }, [userObject.username])

    // Function to fetch user files and update the fileList state.
    async function getData() {
        if (userObject.username !== '') {
            const data = await commService.getUserFiles(userObject.token)
            if (data) {
                dispatch(setUserFiles(data))
            }
        } else {
            dispatch(setUserFiles({}))
        }
    }

    // Function to create a new file.
    // Clears all editor data related to the current file and fetches updated file list.      
    const handleNewFile = async () => {
        if (fileObject.filename === '') dispatch(setFileName(null))
        // Ensure editor content is reset and file data is updated asynchronously.
        setTimeout(() => {
            dispatch(resetFile())
            getData()
        }, 1)
    }

    // Function to handle saving a new file.
    // Dispatches action to save the new file with the provided filename.  
    const handleSaveNew = async (event) => {
        console.log(event)
        if (userObject.username) {
            dispatch(setFileName(event.target.elements.newFileNameInput.value))
            await dispatch(handleFile(fileObject.textContent, event.target.elements.newFileNameInput.value, 'new', 'userId','save'))
            setisNewFileOpen(false) // Close the New File Screen after saving.            
            getData() // Fetch updated file list.        
        }
    }

    // Function to handle saving an existing file.
    // If no filename is set, opens the New File Screen; otherwise, saves the current file.    
    const handleSaveExisting = () => {

        const saveConfirmedMessage = translations?.adminView.saveConfirmedMessage

        const formattedMessage = saveConfirmedMessage
            ? saveConfirmedMessage.replace('{filename}', fileObject.filename)
            : ""

        if (!fileObject.filename) {
            setisNewFileOpen(true); // Open New File Screen for unnamed files.
            return
        }
        
        if (userObject.username) {
            dispatch(handleFile(fileObject.textContent, fileObject.filename,  fileObject.fileId, 'userId',  'save'))
            alert(formattedMessage) // Display a success alert
            getData() // Fetch updated file list after saving.
        }
    }

    // Function to handle file selection from the file list.
    // Sets the editor content, filename, and file ID based on the selected file.
    const handleFileSelection = (file) => {
        dispatch(setContent(file.textContent))
        dispatch(setFileName(file.filename))
        dispatch(setFileId(file.file_id))
        setisFileSelectOpen(false) // Close the File Selection Screen after selection.
    }

    // Function to handle hiding (deleting) a file.
    // Asks for confirmation before hiding the file and updates the file list accordingly.    
    const handleFileHiding = async (file) => {
        const confirmMessage = translations?.editorNavbar.confirmDeleteMessage;

        const formattedMessage = confirmMessage
            ? confirmMessage.replace('{filename}', file.filename)
            : ""

        const confirmDelete = window.confirm(formattedMessage)
    
        if (confirmDelete) {
            if (fileObject.filename === file.filename) {
                console.log(file)
                await dispatch(handleFile(fileObject.textContent, file.filename, file.file_id, 'user_id', 'hide'))
                handleNewFile()
            } else {
                console.log(file)
                await dispatch(handleFile(fileObject.textContent, file.filename, file.file_id, 'user_id', 'hide'))
                getData()
            }
            setisFileSelectOpen(false) // Close the File Selection Screen after hiding a file.
        }
    }

    // Component rendering with buttons for file operations and conditional rendering
    // of the File Selection Screen and New File Screen based on state.
    return (
        <div className='editornavbar' id='editornavbar'>
            <button className='button' onClick={handleNewFile}>{translations?.editorNavbar.newFile}</button>
            <button className="button" onClick={handleSaveExisting}>{translations?.editorNavbar.saveFile}</button>
            { isNewFileOpen && 
                <NewFileScreen
                    isNewFileOpen={isNewFileOpen}
                    setisNewFileOpen={setisNewFileOpen}
                    handleSaveNew={handleSaveNew}
                />
            }

            <button className="button" onClick={() => setisFileSelectOpen(true)}>{translations?.editorNavbar.openFile}</button>
            { isFileSelectOpen &&
                <FileSelectionScreen
                    isFileSelectOpen={isFileSelectOpen}
                    setisFileSelectOpen={setisFileSelectOpen}
                    handleFileSelection={handleFileSelection}
                    handleFileHiding={handleFileHiding}
                    fileList={userObject.userFiles}
                />
            }
            <p tabIndex="0">{translations?.editorNavbar.file}{fileObject.filename}</p>
        </div>
    )
}

export default EditorNavbar