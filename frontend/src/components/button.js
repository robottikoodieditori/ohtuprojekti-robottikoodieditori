import { useDispatch, useSelector } from 'react-redux';
import { sendToRobot, sendToServer } from "../reducers/commsReducer";

const Button = (props) => {
    const editorContent = useSelector(state => state.editor.textContent)
    const dispatch = useDispatch();
    const handleClick = () => {
        if (props.function === 'SEND') {
            dispatch(sendToRobot(editorContent));
        } 
        if (props.function === 'COMPILE') {
            dispatch(sendToServer(editorContent));
        }
    }

    const buttonClass = props.function === 'SEND' ? 'button send-button' : 'button compile-button';


    return (
        <button onClick={handleClick} className={buttonClass} id={`${props.function}BUTTON`} >
            {props.text}
        </button>
    )
}


export default Button;
