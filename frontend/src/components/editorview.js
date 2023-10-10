import { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { useSelector } from "react-redux";
import { LanguageContext } from '../contexts/languagecontext'; 

const EditorView = () => {
    const serverResponse = useSelector(state => state.editor.responseFromServer)
    const { translations } = useContext(LanguageContext); 
    console.log(translations);
    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
                <br></br>
            </header>
            <Editor doc=""/>
            <div className="button-container">
                <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} /> 
                <div style={{ margin: '10px' }} />
                <Button function={'SEND'} text={translations.editorView.sendToRobotBtn} /> 
            </div>
            {serverResponse !== ''
                ? <div id='sResponse'>Server responded: {serverResponse}</div>
                : ''
            }
        </div>
    )
}

export default EditorView;
