import Editor from "./editor";
import Button from "./button";
import { useSelector } from "react-redux";

const EditorView = ({ date }) => {
    const serverResponse = useSelector(state => state.editor.responseFromServer)
    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
                <h1>Koodieditori</h1>
                <p>{date.Date}</p>
                <p>Kirjoita koodia:</p>
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
