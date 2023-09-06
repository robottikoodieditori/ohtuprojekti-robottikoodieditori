import React, { useState, useEffect } from "react";
import comms from "./services/comms"
import EditorView from "./components/editorview";
import { useSelector, useDispatch } from 'react-redux'


function App() {
    const [data, setdata] = useState({
        date: "",
    });


    useEffect(() => {
        comms.data().then((res) => res.data).then(data =>
        {
            setdata({
                date: data.Date,
            });
        });
    }, []);

    return (
        <div>
            <EditorView data={data}/>
        </div>
    );
}

export default App;