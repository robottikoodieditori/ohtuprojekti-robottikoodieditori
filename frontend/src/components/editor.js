import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from "react";
import { editCode } from '../reducers/editorReducer';
import { extensions as syntax_style} from '../services/highlight';
import { extensions } from '../utils/cmConfig';
import CodeMirror from '@uiw/react-codemirror'
import { wordHover } from './hoverTooltip';



const Editor = ({ doc }) => {
    const dispatch = useDispatch()
    const ref = useRef(null)

    const onChange = React.useCallback((value) => {
        dispatch(editCode(value))
    }, []);


    return (
        <div ref={ref}>
            <CodeMirror
            value={doc}
            extensions={[extensions, wordHover]}
            theme={syntax_style}
            onChange={onChange}
            />
        </div>
    )
}

export default Editor;