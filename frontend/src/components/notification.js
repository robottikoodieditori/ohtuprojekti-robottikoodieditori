import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotificationMessage } from '../reducers/commsReducer';
import '../css/index.css'

/**
 * `Notification` component displays a notification message to the user.
 * It retrieves the notification message from Redux state and manages its display.
 *
 * @component
 * @example
 * return <Notification />
 */

const Notification = () => {
    const [showNotification, setShowNotification] = useState(false)
    const notificationMessage = useSelector((state) => state.comms.notificationMessage)
    const dispatch = useDispatch()
    const message = notificationMessage

    if (notificationMessage !== '') {
        setShowNotification(true)
        
        // Automatically reset the notification message and hide the notification after 3 seconds
        setTimeout(() => {
            dispatch(resetNotificationMessage())
            setShowNotification(false)
        }, 3000)
        
        return (
            <div className={`notification ${showNotification ? 'fade-in' : 'fade-out'}`}>
                {message}
            </div> 
        );
    }

    return <div></div>
};

export default Notification;
