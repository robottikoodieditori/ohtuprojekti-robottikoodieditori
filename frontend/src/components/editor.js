import { useContext, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setContent, setHighlightedWord } from '../reducers/editorReducer';
import { extensions as syntax_style } from '../services/highlight';
import { extensions } from '../utils/cmConfig';
import CodeMirror, { placeholder } from '@uiw/react-codemirror';
import { wordHover } from './hoverTooltip';
import { LanguageContext } from '../contexts/languagecontext';  // <-- Import the LanguageContext
import { autoComplete } from './autocomplete';
import { autocompletion } from '@codemirror/autocomplete';

const Editor = ({ doc }) => {
    const dispatch = useDispatch();
    const curWord = useRef('');
    const ref = useRef(null);
    const { translations } = useContext(LanguageContext); // <-- Use the LanguageContext

    const onChange = useCallback((value) => {
        dispatch(setContent(value));
    }, [dispatch]);

    const updateLocal = (word) => {
        curWord.current = word;
    }

    const resetLocal = () => {
        curWord.current = '';
    }

    const hover = wordHover(updateLocal, resetLocal);

    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current));
            resetLocal();
        }
    }

    return (
        <div ref={ref}>
            <CodeMirror
                id='editor'
                value={doc}
                extensions={[
                    extensions, 
                    hover, 
                    placeholder(translations?.editorPlaceholder || 'Kirjoita koodia tähän'),  // <-- Use the translation
                    autocompletion({override: [autoComplete]})
                ]}
                theme={syntax_style}
                onChange={onChange}
                onClick={handleClick}
                height='20vw'
                width='78vw'
            />
        </div>
    );
}

export default Editor;
