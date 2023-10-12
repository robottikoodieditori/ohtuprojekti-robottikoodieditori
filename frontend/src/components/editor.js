import { useContext, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setContent, setHighlightedWord } from '../reducers/editorReducer';
import { extensions as syntaxStyle } from '../services/highlight';
import { extensions, options } from '../utils/cmConfig';
import CodeMirror, { placeholder } from '@uiw/react-codemirror';
import { wordHover } from './hoverTooltip';
import { LanguageContext } from '../contexts/languagecontext';  // <-- Import the LanguageContext
import { autoComplete_en } from '../utils/autocomplete_english';
import { autoComplete_fi } from '../utils/autocomplete_finnish';
import { autocompletion } from '@codemirror/autocomplete';
import { useState } from 'react';
import getCustomKeywords from '../utils/getCustomKeywords';

const Editor = ({ doc }) => {
    const dispatch = useDispatch();
    const curWord = useRef('');
    const ref = useRef(null);
    const { language, translations } = useContext(LanguageContext); // Include translations here
    const [customKeywords, setCustomKeywords] = useState([]);

    const onChange = useCallback((value) => {
        dispatch(setContent(value));
        setCustomKeywords(getCustomKeywords(value))
        
    }, [dispatch]);

    const updateLocal = (word) => {
        curWord.current = word;
    }

    const resetLocal = () => {
        curWord.current = '';
    }

    const hover = wordHover(updateLocal, resetLocal);

    const autoCompleteModule = language === 'en' ? autoComplete_en : autoComplete_fi;

    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current));
            resetLocal();
        }
    }

    console.log(ref.current.editor)

    return (
        <div>
            <CodeMirror
                ref={ref}
                id='editor'
                value={doc}
                extensions={[
                    extensions, 
                    hover, 
                    placeholder(translations?.editorPlaceholder || 'Kirjoita koodia tähän'),  // <-- Use the translation
                    autocompletion({override: [autoCompleteModule(customKeywords)]}), // autocomplete
                ]}
                theme={syntaxStyle}
                onChange={onChange}
                onClick={handleClick}
                height='20vw'
                width='70vw'
            />
        </div>
    );
}

export default Editor;
