import React, { useState, useEffect } from "react";
import comms from "./services/comms"
import EditorView from "./components/editorview";
import Button from "./components/button";
import CodeMirror from "@uiw/react-codemirror";
import CompileButton from "./components/compilebutton";
import RobotButton from "./components/robotbutton";


function App() {
    const [data, setdata] = useState({
        date: "",
    });

    const [editorValue, changeEditorValue] = useState("")

    useEffect(() => {
        comms.data().then((res) => res.data).then(data =>
        {
            setdata({
                date: data.Date,
            });
        });
    }, []);

    const onChange = React.useCallback((value, viewUpdate) => {
        changeEditorValue(value)
      }, []);

    return (
        <div className="App">
            <EditorView/>
            {console.log(editorValue)}
            <header className="App-header">
                <h1>Koodieditori</h1>
                <p>{data.date}</p>
                <p>Kirjoita koodia:</p>
            </header>
            <CodeMirror
            onChange={onChange}
            />
            <CompileButton />
            <RobotButton />
        </div>
    );
}

export default App;