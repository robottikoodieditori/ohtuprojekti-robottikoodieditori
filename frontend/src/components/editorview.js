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
            <EditorNavbar/>
            <Editor textContent={textContent} />
            <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} />
            <Response/>
        </div>
    )
}

export default EditorView;