import Editor from "./editor";
import Button from "./button";
import { useSelector } from "react-redux";

const EditorView = () => {
    const serverResponse = useSelector(state => state.editor.responseFromServer)
    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
                <br></br>
            </header>
            <Editor doc=""/>
            <Button function={'COMPILE'} text={'Lähetä koodi kääntäjälle'} />
            <Button function={'SEND'} text={'Lähetä koodi robotille'} />
            {serverResponse !== ''
                ? <div id='sResponse'>Server responded: {serverResponse}</div>
                : ''
            }
        </div>
    )
}



export default EditorView;
