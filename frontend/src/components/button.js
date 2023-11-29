import { useDispatch, useSelector } from 'react-redux';
import { deployToRobot, sendToServer } from "../reducers/commsReducer";

const Button = (props) => {
    const fileObject = useSelector(state => state.editor.fileObject)
    const dispatch = useDispatch();
    const handleClick = () => {
        if (props.function === 'SEND') {
            dispatch(deployToRobot(fileObject.textContent));
        } 
        if (props.function === 'COMPILE') {
            dispatch(sendToServer(fileObject.textContent));
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
