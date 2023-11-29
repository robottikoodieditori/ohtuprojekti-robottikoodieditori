import { useEffect, useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import LoginPopUp from "./components/loginPopUp";
import AdminView from "./components/adminView"; 
import './css/footer.css'
import { useDispatch } from 'react-redux';
import { getPassRequired } from './reducers/commsReducer';

function App() {
    const dispatch = useDispatch()
    const [isAdminView, setIsAdminView] = useState(false); // State to toggle admin view
    document.title = 'Logomotion editor'; // Set the document title as received from origin/dev
    useEffect(() => {
        dispatch(getPassRequired())
    }, [])

    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    {!window.localStorage.getItem('username') && <LoginPopUp status={true} onClose={""}/> }
                </div>
                <div className="navbar">
                    <Navbar/>
                </div>
                {isAdminView ? (
                    <div className="admin-view" id="admin-view">
                        <AdminView />
                    </div>  
                ) : (
                    <div className="main-content">
                        <EditorView />
                        <Sidebar/>
                    </div>
                )}
                {/* Footer */}
                <footer className="app-footer" id="app-footer">
                    <button onClick={() => setIsAdminView(!isAdminView)}>
                        {isAdminView ? "Close Admin" : "Open Admin"}
                    </button>
                </footer>
            </div>
        </LanguageProvider>
    );
}

export default App;
