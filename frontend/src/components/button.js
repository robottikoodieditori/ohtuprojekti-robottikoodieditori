import { useDispatch, useSelector } from 'react-redux';
import { deployToRobot, sendToServer } from "../reducers/commsReducer";

/**
 * `Button` is a generic button component used for various actions like sending data to the server or deploying to a robot.
 * It utilizes Redux for state management and dispatching actions.
 *
 * @component
 * @example
 * return <Button function="SEND" text="Deploy to Robot" />
 *
 * @param {Object} props - Props for Button component
 * @param {string} props.function - Specifies the function of the button ('SEND' or 'COMPILE')
 * @param {string} props.text - The display text of the button
 */

const Button = (props) => {
    // Redux state selector for the file object and dispatcher
    const fileObject = useSelector(state => state.editor.fileObject);
    const dispatch = useDispatch();

    // Function to handle button click events
    const handleClick = () => {
        // Dispatch appropriate action based on the function prop
        if (props.function === 'SEND') {
            dispatch(deployToRobot(fileObject.textContent));
        } 
        if (props.function === 'COMPILE') {
            dispatch(sendToServer(fileObject.textContent));
        }
    }

    // Determine the CSS class for the button based on the function prop
    const buttonClass = props.function === 'SEND' ? 'button send-button' : 'button compile-button';

    return (
        <button 
            onClick={handleClick} 
            className={buttonClass} 
            id={`${props.function}BUTTON`}
        >
            {props.text}
        </button>
    )
}

export default Button;
