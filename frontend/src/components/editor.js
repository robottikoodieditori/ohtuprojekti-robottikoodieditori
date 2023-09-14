import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from "react";
import { editCode } from '../reducers/editorReducer';
import { createView } from '../utils/cmSetup';



const Editor = ({ doc }) => {
    const dispatch = useDispatch()
    const ref = useRef(null)

    const onChange = React.useCallback((value) => {
        dispatch(editCode(value))
    }, []);

    useEffect(() => {
        const view = createView({
            doc,
            parent: ref.current
        });


    return () => {
        view.destroy();
    };
    }, [doc]);


    return (
        <div ref={ref}>
        </div>
    )
}

export default Editor;