import { useState, useEffect } from "react";
import commService from "./services/comms"
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';
import Tokenpopup from "./components/popup"
import AdminView from "./components/adminView";

function App() {
    const [data, setdata] = useState({
        Date: 'Loading...'
    })

    const [showAdminView, setShowAdminView] = useState(false);

    useEffect(() => {
        commService
            .getData()
            .then(res => {
                setdata(res)
            })
    }, [])

    return (
        <LanguageProvider>
            <div className="app">
                <div>
                    <Tokenpopup/>
                </div>
                <div className="navbar">
                    <Navbar/>
                </div>
                {showAdminView ? (
                    <AdminView />
                ) : (
                    <div className="main-content">
                        <div className="editor">
                            <EditorView date={data}/>
                        </div>  
                        <div className="sidebar">
                            <Sidebar/>
                        </div>
                    </div>
                )}
                <button onClick={() => setShowAdminView(!showAdminView)}>
                    Toggle Admin View
                </button>
            </div>
        </LanguageProvider>
    );
}

export default App;
