import { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { LanguageContext } from '../contexts/languagecontext';
import Response from './response';
//import { useSelector } from 'react-redux';

const EditorView = () => {
    const { translations } = useContext(LanguageContext);
    console.log(translations);

    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
                <br/>
            </header>

            <Editor textContent={''} /*style={{height: '30vw'}}*//>

            <div className="button-container">
                <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} />
                <div style={{ margin: '10px' }} />
                <Button function={'SEND'} text={translations.editorView.sendToRobotBtn} />
            </div>

            <Response/>
        </div>
    )
}

export default EditorView;
