import Navbar from "./navbar";
import Editor from "./editor";


const EditorView = (props) => {
    return (
        <div>
            <Navbar/>
            <header className="App-header">
                <h1>Koodieditori</h1>
                <p>{props.data.date}</p>
                <p>Kirjoita koodia:</p>
            </header>
            <Editor eventHandler={props.eventHandler}/>
        </div>
    )
}

export default EditorView;