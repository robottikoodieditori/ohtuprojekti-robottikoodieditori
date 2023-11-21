import { useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import LoginPopUp from "./components/loginPopUp";
import AdminView from "./components/adminView"; 
import './css/footer.css'

function App() {
    const [isAdminView, setIsAdminView] = useState(false); // State to toggle admin view
    document.title = 'Logomotion editor'; // Set the document title as received from origin/dev

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
                    <div className="admin-view">
                        <AdminView />
                    </div>  
                ) : (
                    <div className="main-content">
                        <div>
                            <EditorView />
                        </div>  
                        <div className="sidebar">
                            <Sidebar/>
                        </div>
                    </div>
                )}
                {/* Footer */}
                <footer className="app-footer">
                    <button onClick={() => setIsAdminView(!isAdminView)}>
                        {isAdminView ? "Close Admin" : "Open Admin"}
                    </button>
                </footer>
            </div>
        </LanguageProvider>
    );
}

export default App;
