import { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, insertTab } from '@codemirror/commands';
import { autocompletion } from '@codemirror/autocomplete';
import { setContent, setHighlightedWord } from '../reducers/editorReducer';
import { extensions } from '../utils/cmConfig';
import { wordHover } from '../utils/hoverTooltip';
import { autoComplete_en } from '../static/autocomplete_english';
import { autoComplete_fi } from '../static/autocomplete_finnish';
import { underlineSelection } from '../utils/underlineExtension';
import getCustomKeywords from '../utils/getCustomKeywords';
import { clearUnderlines } from '../utils/underlineExtension';
import { LanguageContext } from '../contexts/languagecontext';

/**
 * `Editor` implements the main code editor interface using CodeMirror. 
 * It manages editing, display, and interactions within the code editor. 
 * This includes handling updates to the document, error underlining, autocompletion, 
 * hover tooltips, and language-specific features.
 *
 * @component
 * @example
 * return <Editor textContent="Sample code here..." />
 *
 * @param {Object} props - Props for Editor component
 * @param {string} props.textContent - Initial text content to be displayed in the editor
 */

const Editor = ({ textContent }) => {
    const dispatch = useDispatch()
    const serverResponse = useSelector(state => state.comms.responseFromServer)
    const { language } = useContext(LanguageContext)
    const curWord = useRef('') // Stores the currently highlighted word
    const editor = useRef(null) // Reference to the CodeMirror editor instance
    const errorListRef = useRef([])
    const languageRef = useRef('')
    const currentAutoCompleteModule = useRef(language === 'en' ? autoComplete_en : autoComplete_fi)
    const autoCompletionCompartment = new Compartment
    const hoverCompartment = new Compartment
    const fileObject = useSelector((state) => state.editor.fileObject)
    const exampleString = 'Logo...'
    console.log(fileObject)


    // Update listener for the editor to handle document changes.
    const onUpdate = EditorView.updateListener.of((v) => {
        if (v.docChanged) {
            dispatch(setContent(v.state.doc.toString()))
            const curCustomKeywords = getCustomKeywords(v.state.doc.toString())
            if (curCustomKeywords) updateAutocompletes(curCustomKeywords, v.view)
        }
    })

    // Function to dynamically update autocomplete suggestions based on the editor's content.
    const updateAutocompletes = (newList, view) => {
        const updatedConfig = { override: [currentAutoCompleteModule.current(newList)]}
        view.dispatch({effects: autoCompletionCompartment.reconfigure(autocompletion(updatedConfig))})
    }

    // Function to update hover tooltips in the editor based on the error list.
    const updateHovering = (errorList, view, language) => {
        errorListRef.current = errorList
        const updatedConfig = hoverCompartment.of(wordHover(updateLocal, errorListRef, language))
        view.dispatch({effects: hoverCompartment.reconfigure(updatedConfig)})
    }

    // Update the currently hovered word in the editor.
    const updateLocal = (word) => curWord.current = word;
    const resetLocal = () => curWord.current = '';

    // Handle editor click event to highlight a word and reset the local word tracker.
    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current));
            resetLocal();
        }
    }

    // useEffect hook to handle error underlining and hover tooltip updates.
    useEffect(() => {
        if (serverResponse.raw_errors && editor.current && serverResponse) {
            clearUnderlines(editor.current)
            underlineSelection(editor.current, serverResponse.raw_errors)
            updateHovering(serverResponse.raw_errors, editor.current, languageRef)
        }
    }, [serverResponse])

    // useEffect for initializing the CodeMirror editor.
    useEffect(() => {
        // Creates an instance of EditorState with initial document content and extensions.
        // - `extensions` include basic functionalities like syntax highlighting, linting, etc.
        // - `placeholder` shows a default text when the editor is empty.
        // - `onUpdate` handles updates to the document, such as changes in content.
        // - `hoverCompartment` manages tooltips for words and error messages.
        // - `autoCompletionCompartment` configures dynamic autocompletion.
        // - `keymap` sets up custom keybindings, including handling the Tab key.
        // - Additional configurations for multiple selections and tab size.        
        let state = EditorState.create({
            doc: textContent,
            extensions: [
                extensions, 
                placeholder(exampleString), 
                onUpdate, 
                hoverCompartment.of(wordHover(updateLocal, errorListRef, languageRef)), 
                autoCompletionCompartment.of(
                    autocompletion({override: [currentAutoCompleteModule.current([])]}), 
                ),
                keymap.of([defaultKeymap, { key: 'Tab', run: insertTab }]), 
                EditorState.allowMultipleSelections.of(false),
                EditorState.tabSize.of(4),
            ]
        });
        let view = new EditorView({ state: state, parent: document.querySelector('#editor') });
        editor.current = view;
        return () => { view.destroy(); };
    }, []);


    // Update editor content when the file object (filename or text content) changes.
    useEffect(() => {
        editor.current.dispatch({changes: {from: 0, to: editor.current.state.doc.length, insert: ''}})
        if (fileObject.filename !== '') {
            editor.current.dispatch({changes: {from: 0, to: editor.current.state.doc.length, insert: fileObject.textContent}})
        }
    }, [fileObject.filename])

    // Update the autocomplete module and language reference when the language changes.
    useEffect(() => {
        currentAutoCompleteModule.current = language === 'en' ? autoComplete_en : autoComplete_fi
        languageRef.current = language
    }, [language])

    // Update the editor content based on the `textContent` prop, allowing external content updates.
    useEffect(() => {
        if (editor.current && textContent !== undefined) {
            editor.current.dispatch({
                changes: {
                    from: 0,
                    to: editor.current.state.doc.length,
                    insert: fileObject.textContent
                }
            });
            //dispatch(setContent(textContent))
        }
    }, [fileObject.filename]);

    return (
        <div ref={editor} className="editor" id='editor' onClick={handleClick} aria-label="Code Editor"></div>
    )
}

export default Editor