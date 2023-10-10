import { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { useSelector } from "react-redux";
import { LanguageContext } from '../contexts/languagecontext'; 

const EditorView = () => {
    const serverResponse = useSelector(state => state.editor.responseFromServer)
    const { translations } = useContext(LanguageContext);

    const Response = () => {
        return (
            <div>
                {serverResponse.map(res => <p key={res.start}>line:{res.line} {res.start}, {res.end}, {res.message}</p> )}
            </div>
        )
    }
    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
                <br></br>
            </header>
            <Editor doc=""/>
            <br/>
            <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} /> 
            <Button function={'SEND'} text={translations.editorView.sendToRobotBtn} /> 
            {serverResponse !== ''
                ? <div id='sResponse'>Server responded:<Response/> </div>
                : ''
            }
        </div>
    )
}

export default EditorView;
