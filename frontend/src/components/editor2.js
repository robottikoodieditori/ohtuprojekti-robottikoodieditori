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
//import { setCustomKeywords } from '../reducers/editorReducer';

const Editor = ({ textContent = '' }) => {
    const dispatch = useDispatch()
    const curWord = useRef('')
    const editor = useRef(null)
    const { language, translations } = useContext(LanguageContext)

    const autoCompletionCompartment = new Compartment
    
    
    const onUpdate = EditorView.updateListener.of((v) => {
        if (v.docChanged) {
            dispatch(setContent(v.state.doc.toString()))
            const curCustomKeywords = getCustomKeywords(v.state.doc.toString())
            //let transaction = v.state.update({changes: {autocompletion: autocompletion({override: [autoCompleteModule(curCustomKeywords)]})}})
            if (curCustomKeywords.length > 0) {
                if (curCustomKeywords.)
                updateExtension(curCustomKeywords, v)
            }
            console.log(editor.current)


        }

    })

    const updateExtension = (newList, view) => {
        //const curCompartment = autoCompletionCompartment.of()
        //console.log(newList)
        //const uusi = autoCompletionCompartment.reconfigure(autocompletion(({override: [autoCompleteModule(newList)]})))

        //console.log(uusi)//reconfigure(autocompletion({override: [autoCompleteModule(newList)]}))
        //console.log(autoCompletionCompartment)
        //view.state.update({effects: autoCompletionCompartment.reconfigure(autocompletion({override: [autoCompleteModule(newList)]}))})
        //console.log(curCompartment)
        console.log(view)

        const updatedConfig = { override: [autoCompleteModule(newList)]}

        let __ = EditorState.create({
            doc: view.state.doc.toString(),
            extensions: [
                extensions,
                syntaxStyle,
                placeholder('Kirjoita koodia tähän'),
                onUpdate,
                hover,
                autoCompletionCompartment.of(
                    autocompletion({override: [autoCompleteModule([newList])]}
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


        editor.current.setState(__)
    }


    const updateLocal = (word) => {
        curWord.current = word;
    }

    const resetLocal = () => {
        curWord.current = '';
    }

    const hover = wordHover(updateLocal, resetLocal)
    const autoCompleteModule = language === 'en' ? autoComplete_en : autoComplete_fi;
    
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
                placeholder('Kirjoita koodia tähän'),
                onUpdate,
                hover,
                autoCompletionCompartment.of(
                    autocompletion({override: [autoCompleteModule([])]}
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


    return (
        <div ref={editor} id='editor' onClick={handleClick}>

        </div>
    )
}

export default Editor