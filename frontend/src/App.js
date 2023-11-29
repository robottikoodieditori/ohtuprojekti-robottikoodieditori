import { useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import LoginPopUp from "./components/loginPopUp";
import AdminView from "./components/adminView"; 
import './css/footer.css'

function App() {
    const [isAdminViewOpen, setIsAdminViewOpen] = useState(false); // State to toggle admin view
    document.title = 'Logomotion editor'; // Set the document title as received from origin/dev

    const handleAdminViewClick = () => {
        setIsAdminViewOpen(!isAdminViewOpen)
    }

    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    {!window.localStorage.getItem('username') && <LoginPopUp status={true} onClose={""}/> }
                </div>
                <div className="navbar">
                    <Navbar handleAdminViewClick={handleAdminViewClick}/>
                </div>
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
