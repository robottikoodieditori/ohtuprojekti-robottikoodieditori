import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { sendName } from "../reducers/commsReducer";
import { useDispatch } from 'react-redux';
import '../css/popup.css'

const Tokenpopup = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(sendName(username));
        console.log(`Sending username to backend: ${username}`);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div>
            <Popup 
                open={open} 
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
            >            
                <div className='popup' id="popup">
                    <div className="popup-header">
                        <button className="close-button" onClick={handleClose}>X</button>
                    </div>
                    <div className='content-popup'>
                        <h2>Anna nimesi</h2>
                        <input
                            type="text"
                            placeholder="Nimi"
                            value={username}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit}>Kirjaudu</button>           
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default Tokenpopup;
