import { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { LanguageContext } from '../contexts/languagecontext';
import Response from './response';
import '../css/button.css'
import '../css/editor.css'
import EditorNavbar from './editorNavbar';

const EditorView = () => {
    const { translations } = useContext(LanguageContext);
    const textContent = ''

    return (
        <div className='editorview' id='editorview'>
            <header className="App-header">
            </header>
            <EditorNavbar/>
            <Editor textContent={textContent} />

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