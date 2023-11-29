// Button.js
// Provides a generic button component for different actions like sending to server or deploying to robot.

import { useDispatch, useSelector } from 'react-redux';
import { deployToRobot, sendToServer } from "../reducers/commsReducer";

// Button functional component definition
const Button = (props) => {
    // Redux state selector for the file object and dispatcher
    const fileObject = useSelector(state => state.editor.fileObject);
    const dispatch = useDispatch();

    // Function to handle button click events
    const handleClick = () => {
        // Dispatch appropriate action based on the function prop
        if (props.function === 'SEND') {
            // Deploy the current text content to the robot
            dispatch(deployToRobot(fileObject.textContent));
        } 
        if (props.function === 'COMPILE') {
            // Send the current text content to the server for compilation
            dispatch(sendToServer(fileObject.textContent));
        }
    }

    // Determine the CSS class for the button based on the function prop
    const buttonClass = props.function === 'SEND' ? 'button send-button' : 'button compile-button';

    // Component rendering
    return (
        <button 
            onClick={handleClick} 
            className={buttonClass} 
            id={`${props.function}BUTTON`}
        >
            {/* Display the text passed as a prop */}
            {props.text} 
        </button>
    )
}

export default Button;
