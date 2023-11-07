import { useState } from 'react';
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import Tokenpopup from "./components/popup";
import AdminView from "./components/adminView"; // Import AdminView
import './css/footer.css'

function App() {
    const [isAdminView, setIsAdminView] = useState(false); // State to toggle admin view

    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    <Tokenpopup status={true} onClose={""}/>
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
