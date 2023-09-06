import React, { useState, useEffect } from "react";
import comms from "./services/comms"
import EditorView from "./components/editorview";

 
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
        console.log(value)
      }, []);
 
    return (
        <div>
            <EditorView eventHandler={onChange} data={data}/>
        </div>
    );
}
 
export default App;