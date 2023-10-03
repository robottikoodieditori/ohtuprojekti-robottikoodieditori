import React, { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { useSelector } from "react-redux";
import { LanguageContext } from '../contexts/languagecontext'; 

const EditorView = ({ date }) => {
    const serverResponse = useSelector(state => state.editor.responseFromServer)
    const { translations } = useContext(LanguageContext); 
    console.log(translations);
    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
                <h1>{translations.editorView.title}</h1> 
                <p>{date.Date}</p>
                <p>{translations.editorView.writeCode}</p> 
            </header>
            <Editor doc=""/>
            <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} /> 
            <Button function={'SEND'} text={translations.editorView.sendToRobotBtn} /> 
            {serverResponse !== ''
                ? <div id='sResponse'>Server responded: {serverResponse}</div>
                : ''
            }
        </div>
    )
}

export default EditorView;
