import { useContext } from 'react';
import Editor from "./editor";
import Button from "./button";
import { LanguageContext } from '../contexts/languagecontext';
import Response from './response';
import '../css/button.css'
import '../css/editor.css'
import EditorNavbar from './editorNavbar';

/**
 * `EditorView` component represents the main view for the editor.
 * It includes an editor, a compile button, and a response component.
 * This view is typically used for editing and compiling code.
 *
 * @component
 * @example
 * return (
 *   <EditorView />
 * )
 */

const EditorView = () => {
    /**
     * Accesses translations from the LanguageContext.
     * @type {object}
     */
    const { translations } = useContext(LanguageContext);


    const textContent = ''

    return (
        <div className='editorview' id='editorview'>
            <EditorNavbar/>

            {/* The CodeMirror-based code editor component */}
            <Editor textContent={textContent} />

            {/* A button for compiling code */}
            <Button function={'COMPILE'} text={translations.editorView.sendToCompilerBtn} />

            <Response/>
        </div>
    )
}

export default EditorView;