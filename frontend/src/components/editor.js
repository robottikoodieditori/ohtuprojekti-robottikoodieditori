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
import getErrorPositions from '../utils/getErrorPositions';
import { LanguageContext } from '../contexts/languagecontext';


const Editor = ({ textContent = '' }) => {
    const dispatch = useDispatch()
    const serverResponse = useSelector((state) => state.comms.responseFromServer)
    const curWord = useRef('')
    const editor = useRef(null)
    const { language } = useContext(LanguageContext)
    const currentAutoCompleteModule = useRef(language === 'en' ? autoComplete_en : autoComplete_fi)
    const autoCompletionCompartment = new Compartment
    const languageCompartment = new Compartment
    
    const onUpdate = EditorView.updateListener.of((v) => {
        if (v.docChanged) {
            dispatch(setContent(v.state.doc.toString()))
            const curCustomKeywords = getCustomKeywords(v.state.doc.toString())
            updateAutocompletes(curCustomKeywords, v.view)
        }
    })

    const updateAutocompletes = (newList, view) => {
        const updatedConfig = { override: [currentAutoCompleteModule.current(newList)]}
        view.dispatch({effects: autoCompletionCompartment.reconfigure(autocompletion(updatedConfig))})
    }

    const updateLocal = (word) => curWord.current = word;
    const resetLocal = () => curWord.current = '';
    const hover = wordHover(updateLocal, resetLocal)
    
    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current));
            resetLocal();
        }
    }
    useEffect(() => {
        if (serverResponse.raw_errors && editor.current && serverResponse) {
            console.log('juuh')
            const errorList = getErrorPositions(serverResponse.raw_errors)
            underlineSelection(editor.current, errorList)
        }
    }, [serverResponse])
    
    useEffect(() => {

        let state = EditorState.create({
            doc: textContent,
            extensions: [
                extensions,
                languageCompartment.of(placeholder('Code...')),
                onUpdate,
                hover,
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
        currentAutoCompleteModule.current = language === 'en' ? autoComplete_en : autoComplete_fi
    }, [language])

    return (
        <div ref={editor} id='editor' onClick={handleClick}></div>
    )
}

export default Editor