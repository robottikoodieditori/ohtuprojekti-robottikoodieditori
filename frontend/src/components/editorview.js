import { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { useSelector } from "react-redux";
import { LanguageContext } from '../contexts/languagecontext'; 

const EditorView = () => {
    const serverResponse = useSelector(state => state.comms.responseFromServer)
    const { translations } = useContext(LanguageContext);
    console.log(translations);

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
                <br/>
            </header>
            <Editor doc=""/>
            <div className="button-container">
                <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} /> 
                <div style={{ margin: '10px' }} />
                <Button function={'SEND'} text={translations.editorView.sendToRobotBtn} /> 
            </div>
            {serverResponse !== ''
                ? <div id='sResponse'>Server responded:<Response/> </div>
                : ''
            }
        </div>
    )
}

export default EditorView;
