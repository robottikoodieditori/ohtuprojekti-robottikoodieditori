import React from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from "react";
import { setContent } from '../reducers/editorReducer';
import { extensions as syntax_style} from '../services/highlight';
import { extensions } from '../utils/cmConfig';
import CodeMirror, { placeholder } from '@uiw/react-codemirror'
import { wordHover } from './hoverTooltip';
import { setHighlightedWord } from '../reducers/editorReducer';



const Editor = ({ doc }) => {
    const dispatch = useDispatch()
    const curWord = useRef('')
    const ref = useRef(null)


    const onChange = React.useCallback((value) => {
        dispatch(setContent(value))
    }, []);

    const updateLocal = (word) => {
        curWord.current = word
        //dispatch(setWord(word))
        //resetLocal()
    }

    const resetLocal = () => {
        curWord.current = ''
    }

    const hover = wordHover(updateLocal, resetLocal)

    const handleClick = () => {
        if (curWord.current !== '') {
            dispatch(setHighlightedWord(curWord.current))
            resetLocal()
        }
    }



    return (
        <div ref={ref}>
            <CodeMirror
                id='editor'
                value={doc}
                extensions={[extensions, hover, placeholder('Kirjoita koodia tähän')]}
                theme={syntax_style}
                onChange={onChange}
                onClick={handleClick}
            />
        </div>
    )
}

export default Editor;