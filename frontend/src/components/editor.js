import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRef } from "react";
import { editCode } from '../reducers/editorReducer';
import { extensions as syntax_style} from '../services/highlight';
import { extensions } from '../utils/cmConfig';
import CodeMirror from '@uiw/react-codemirror'
import { wordHover } from './hoverTooltip';
import { setWord } from '../reducers/highlightReducer';



const Editor = ({ doc }) => {
    const dispatch = useDispatch()
    const [curWord, setCurWord] = useState('')
    const ref = useRef(null)

    const onChange = React.useCallback((value) => {
        dispatch(editCode(value))
    }, []);

    const updateLocal = (word) => {
        setCurWord(word)
    }

    const resetLocal = () => {
        setCurWord('')
    }

    const hover = wordHover(updateLocal, resetLocal)

    const handleClick = () => {
        if (curWord !== '') {
            dispatch(setWord(curWord))
        }
    }



    return (
        <div ref={ref}>
            <CodeMirror
                id='editor'
                value={doc}
                extensions={[extensions, hover]}
                theme={syntax_style}
                onChange={onChange}
                onClick={handleClick}
            />
        </div>
    )
}

export default Editor;