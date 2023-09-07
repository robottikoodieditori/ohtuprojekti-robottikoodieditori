import CodeMirror from '@uiw/react-codemirror'; 
import React from 'react';
import { useDispatch } from 'react-redux'
import { editCode } from '../reducers/editorReducer';

const Editor = (props) => {
    const dispatch = useDispatch()

    const onChange = React.useCallback((value, viewUpdate) => {
        dispatch(editCode(value))
      }, []);

    return (
        <div>
            <CodeMirror
            onChange={onChange}
            />
        </div>
    )
}

export default Editor;