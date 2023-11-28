import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LanguageContext } from "../contexts/languagecontext";
import { handleFile } from '../reducers/commsReducer';
import { setFileName, setContent, setFileId, resetFile } from "../reducers/editorReducer";
import commService from "../services/comms";
import '../css/editornavbar.css';
import FileSelectionScreen from "./editorNavbarFileSelectionScreen";
import NewFileScreen from "./editorNavbarNewFileScreen";


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
        console.log(event)
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


    return (
        <div className='editornavbar' id='editornavbar'>
            <button className='editornavbar-button' onClick={handleNewFile}>{translations?.editorNavbar.newFile}</button>
            <button className="editornavbar-button" onClick={handleSaveExisting}>{translations?.editorNavbar.saveFile}</button>
            { isNewFileOpen && 
                <
                    NewFileScreen
                    isNewFileOpen={isNewFileOpen}
                    setisNewFileOpen={setisNewFileOpen}
                    handleSaveNew={handleSaveNew}
                />
            }

            <button className="editornavbar-button" onClick={() => setisFileSelectOpen(true)}>{translations?.editorNavbar.openFile}</button>
            { isFileSelectOpen &&
                <
                    FileSelectionScreen
                    isFileSelectOpen={isFileSelectOpen}
                    setisFileSelectOpen={setisFileSelectOpen}
                    handleFileSelection={handleFileSelection}
                    handleFileHiding={handleFileHiding}
                    fileList={fileList}
                />
            }
            <p tabIndex="0">{translations?.editorNavbar.file}{fileObject.filename}</p>
        </div>
    )
}

export default EditorNavbar