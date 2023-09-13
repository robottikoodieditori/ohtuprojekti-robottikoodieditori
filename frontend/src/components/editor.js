import CodeMirror from '@uiw/react-codemirror'; 
import React from 'react';
import { useDispatch } from 'react-redux'
import { editCode } from '../reducers/editorReducer';
import { extensions } from '../utils/cmConfig';
import { extensions as highlight } from '../services/highlight';
const Editor = (props) => {
    const dispatch = useDispatch()

    const onChange = React.useCallback((value) => {
        dispatch(editCode(value))
    }, []);

    return (
        <div>
            <CodeMirror
            onChange={onChange}
            extensions={extensions}
            theme={highlight}
            />
        </div>
    )
}

export default Editor;