import { useEffect, useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import LoginPopUp from "./components/loginPopUp";
import AdminView from "./components/adminView"; 
import { useDispatch, useSelector } from 'react-redux';
import { getPassRequired, verifyLogin } from './reducers/commsReducer';
import { setFileName, resetFile } from "./reducers/editorReducer";


function App() {
    const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
    const dispatch = useDispatch()
    const token = useSelector(state => state.comms.userObject.token)
    const fileObject = useSelector(state => state.editor.fileObject)
    document.title = 'Logomotion editor';
    
    useEffect(() => {
        dispatch(getPassRequired())
        if (token !== '') {
            dispatch(verifyLogin(token))
        }
    }, [])

    const handleAdminViewClick = () => {
        if (fileObject.filename === '') dispatch(setFileName(null))
        // Ensure editor content is reset and file data is updated asynchronously.
        setTimeout(() => {
            dispatch(resetFile())
        }, 1)
        setIsAdminViewOpen(!isAdminViewOpen)
    }

    return (
        <LanguageProvider>
            <div className="app">
                {!window.localStorage.getItem('username') && <LoginPopUp status={true} onClose={""}/> }
                <Navbar handleAdminViewClick={handleAdminViewClick}/>
                {isAdminViewOpen ? (
                    <div className="admin-view" id="admin-view">
                        <AdminView />
                    </div>  
                ) : (
                    <div className="main-content">
                        <EditorView />
                        <Sidebar/>
                    </div>
                )}
            </div>
        </LanguageProvider>
    );
}

export default App;
