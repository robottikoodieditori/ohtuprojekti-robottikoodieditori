import { useDispatch, useSelector } from 'react-redux';
import { sendToCompiler, sendToServer } from "../reducers/commsReducer";

const Button = (props) => {
    const editorContent = useSelector(state => state.editor.textContent)
    const dispatch = useDispatch();
    const handleClick = () => {
        if (props.function === 'SEND') {
            dispatch(sendToServer(editorContent));
        } 
        if (props.function === 'COMPILE') {
            dispatch(sendToCompiler());
        }
    }
    return (
        <button onClick={handleClick} id={`${props.function}BUTTON`} >
            {props.text}
        </button>
    )
}


export default Button;
