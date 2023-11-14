import { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, insertTab } from '@codemirror/commands';
import { autocompletion } from '@codemirror/autocomplete';
import { setContent, setHighlightedWord } from '../reducers/editorReducer';
import { extensions } from '../utils/cmConfig';
import { wordHover } from '../utils/hoverTooltip';
import { autoComplete_en } from '../utils/autocomplete_english';
import { autoComplete_fi } from '../utils/autocomplete_finnish';
import { underlineSelection } from '../utils/underlineExtension';
import getCustomKeywords from '../utils/getCustomKeywords';
import { clearUnderlines } from '../utils/underlineExtension';
import { LanguageContext } from '../contexts/languagecontext';


const Editor = ({ textContent }) => {
    const dispatch = useDispatch()
    const serverResponse = useSelector(state => state.comms.responseFromServer)
    const { language } = useContext(LanguageContext)
    const curWord = useRef('')
    const editor = useRef(null)
    const errorListRef = useRef([])
    const languageRef = useRef('')
    const currentAutoCompleteModule = useRef(language === 'en' ? autoComplete_en : autoComplete_fi)
    const autoCompletionCompartment = new Compartment
    const hoverCompartment = new Compartment
    const fileName = useSelector((state) => state.editor.fileName)
    const fileContent = useSelector((state) => state.editor.textContent)
    const exampleString = 'Logo...'


    const onUpdate = EditorView.updateListener.of((v) => {
        if (v.docChanged) {
            dispatch(setContent(v.state.doc.toString()))
            const curCustomKeywords = getCustomKeywords(v.state.doc.toString())
            if (curCustomKeywords) updateAutocompletes(curCustomKeywords, v.view)
        }
    })

    const updateAutocompletes = (newList, view) => {
        const updatedConfig = { override: [currentAutoCompleteModule.current(newList)]}
        view.dispatch({effects: autoCompletionCompartment.reconfigure(autocompletion(updatedConfig))})
    }

    const updateHovering = (errorList, view, language) => {
        errorListRef.current = errorList
        const updatedConfig = hoverCompartment.of(wordHover(updateLocal, errorListRef, language))
        view.dispatch({effects: hoverCompartment.reconfigure(updatedConfig)})
    }

    const updateLocal = (word) => curWord.current = word;
    const resetLocal = () => curWord.current = '';

    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current));
            resetLocal();
        }
    }
    useEffect(() => {
        if (serverResponse.raw_errors && editor.current && serverResponse) {
            clearUnderlines(editor.current)
            underlineSelection(editor.current, serverResponse.raw_errors)
            updateHovering(serverResponse.raw_errors, editor.current, languageRef)
        }
    }, [serverResponse])

    useEffect(() => {

        let state = EditorState.create({
            doc: textContent,
            extensions: [
                extensions,
                placeholder(exampleString),
                onUpdate,
                hoverCompartment.of(wordHover(updateLocal, errorListRef, languageRef)),
                autoCompletionCompartment.of(
                    autocompletion({override: [currentAutoCompleteModule.current([])]}
                    )),
                keymap.of([
                    defaultKeymap,
                    {
                        key: 'Tab',
                        run: insertTab
                    }
                ],
                ),
                EditorState.allowMultipleSelections.of(false),
                EditorState.tabSize.of(4),
            ]
        })
        let view = new EditorView({ state: state, parent: document.querySelector('#editor') })
        editor.current = view

        return () => {
            view.destroy()
        }
    }, [])

    useEffect(() => {
        if (fileName === '') {
            editor.current.dispatch({changes: {from: 0, to: editor.current.state.doc.length, insert: ''}})
            dispatch(setContent(''))
        } else {
            editor.current.dispatch({changes: {from: 0, to: editor.current.state.doc.length, insert: fileContent}})
            dispatch(setContent(fileContent))
        }

    }, [fileName])

    useEffect(() => {
        currentAutoCompleteModule.current = language === 'en' ? autoComplete_en : autoComplete_fi
        languageRef.current = language
    }, [language])

    //adminView.js editor useEffect
    useEffect(() => {
        if (editor.current && textContent !== undefined) {
            editor.current.dispatch({
                changes: {
                    from: 0,
                    to: editor.current.state.doc.length,
                    insert: textContent
                }
            });
        }
    }, [textContent]); // Dependency array includes textContent

    return (
        <div>
            <div ref={editor} className="editor" id='editor' onClick={handleClick} aria-label="Code Editor"></div>
        </div>
    )
}

export default Editor