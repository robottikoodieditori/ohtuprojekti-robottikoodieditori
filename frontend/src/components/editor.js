import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { defaultKeymap, insertTab } from '@codemirror/commands';
import { syntaxStyle } from '../services/highlight';
import { extensions } from '../utils/cmConfig'; 
import { useDispatch } from 'react-redux';
import { setContent, setHighlightedWord } from '../reducers/editorReducer';
import { wordHover } from './hoverTooltip';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/languagecontext';
import { autocompletion } from '@codemirror/autocomplete';
import { autoComplete_en } from '../utils/autocomplete_english';
import { autoComplete_fi } from '../utils/autocomplete_finnish';
import getCustomKeywords from '../utils/getCustomKeywords';
import { Compartment } from '@codemirror/state';

const Editor = ({ textContent = '' }) => {
    const dispatch = useDispatch()
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
            updateExtension(curCustomKeywords, v.view)
        }
    })

    const updateExtension = (newList, view) => {
        const updatedConfig = { override: [currentAutoCompleteModule.current(newList)]}
        view.dispatch({effects: autoCompletionCompartment.reconfigure(autocompletion(updatedConfig))})
    }

    const updateLocal = (word) => {
        curWord.current = word;
    }

    const resetLocal = () => {
        curWord.current = '';
    }

    const hover = wordHover(updateLocal, resetLocal)
    
    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current));
            resetLocal();
        }
    }
    
    useEffect(() => {

        let state = EditorState.create({
            doc: textContent,
            extensions: [
                extensions,
                syntaxStyle,
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
        editor.current.view = view
        editor.current.state = state
        
        return () => {
            view.destroy()
        }
    }, [])

    useEffect(() => {
        currentAutoCompleteModule.current = language === 'en' ? autoComplete_en : autoComplete_fi
    }, [language])

    return (
        <div ref={editor} id='editor' onClick={handleClick}>

        </div>
    )
}

export default Editor