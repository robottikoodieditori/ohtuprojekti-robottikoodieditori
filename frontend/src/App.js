import React, { useState, useEffect } from "react";
import comms from "./services/comms"
import EditorView from "./components/editorview";
import CodeMirror from "@uiw/react-codemirror";

 
function App() {
    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

    const [editorValue, changeEditorValue] = useState("")
 
    useEffect(() => {
        comms.data().then((res) => res.data).then(data =>
        {
            setdata({
                name: data.Name,
                age: data.Age,
                date: data.Date,
                programming: data.programming,
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
                <h1>React and flask</h1>
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
            </header>
            <CodeMirror
            onChange={onChange}
            />
        </div>
    );
}
 
export default App;