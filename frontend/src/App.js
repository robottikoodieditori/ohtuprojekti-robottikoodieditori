import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import Tokenpopup from "./components/popup"

function App() {
    document.title = 'Logomotion editor'
    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    {!window.localStorage.getItem('username') && <Tokenpopup status={true} onClose={""}/> }
                </div>
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="main-content">
                    <div>
                        <EditorView />
                    </div>  
                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </LanguageProvider>
    );
}

export default App;
