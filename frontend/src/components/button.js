import { useDispatch } from 'react-redux';
import { sendToCompiler, sendToRobot } from "../reducers/editorReducer";

const Button = (props) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        if (props.function === 'SEND') {
            dispatch(sendToRobot())
        } 
        if (props.function === 'COMPILE') {
            dispatch(sendToCompiler())
        }
    }
    return (
        <button onClick={handleClick}>
            {props.text}
        </button>
    )
}

export default Button;