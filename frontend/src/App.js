import { useState, useEffect } from "react";
import commService from "./services/comms"
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';

function App() {
    const [data, setdata] = useState({
        Date: 'Loading...'
    })

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
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="main-content">
                    <div className="editor">
                        <EditorView date={data}/>
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
