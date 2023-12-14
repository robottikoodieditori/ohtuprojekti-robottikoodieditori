import { useEffect, useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { LanguageProvider } from './contexts/languagecontext';
import LoginPopUp from "./components/loginPopUp";
import AdminView from "./components/adminComponents/adminView";
import { useDispatch, useSelector } from 'react-redux';
import { getPassRequired, verifyLogin } from './reducers/commsReducer';
import { setFileName, resetFile } from "./reducers/editorReducer";

/**
 * App.js
 * ---------------------------------------------------
 * 
 * Overview:
 * App.js is the root component of the application. It orchestrates various components such as the EditorView,
 * Sidebar, Navbar, LoginPopUp, and AdminView. The application's state management is handled by Redux, and
 * internationalization is managed through LanguageContext.
 *
 * Key Functionalities:
 * - Toggles between the main editor view and the admin view based on the application state.
 * - Manages user authentication and displays the login popup if the user is not authenticated.
 * - Integrates the LanguageProvider for internationalization support across the application.
 *
 * Structure:
 * - LanguageProvider wraps the entire application to provide access to language settings and translations.
 * - Navbar is displayed at the top of the application and includes controls for user and view management.
 * - AdminView and EditorView are conditionally rendered based on the application's state.
 *
 * Usage:
 * - The App component is the entry point of the application and should be rendered inside the root element.
 */

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
