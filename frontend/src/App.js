import { useState, useEffect } from "react";
import comms from "./services/comms";
import EditorView from "./components/editorview";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";  
import { LanguageProvider } from './contexts/languagecontext';

function App() {
    const [data, setdata] = useState({
        date: "",
    });

    useEffect(() => {
        comms.getData().then((res) => res.data).then(data =>
        {
            setdata({
                date: data.Date,
            });
        });
    }, []);

    return (
        <LanguageProvider>
            <div className="app">
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="main-content">
                    <div className="editor">
                        <EditorView data={data}/>
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
