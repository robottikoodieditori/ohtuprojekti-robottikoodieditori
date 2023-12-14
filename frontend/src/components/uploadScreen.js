import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import { setContent } from "../reducers/editorReducer";
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import commService from '../services/comms'
import '../css/popup.css'; 
import '../css/button.css'
import '../css/input.css'
import '../css/select.css'

/**
 * UploadScreen component provides a screen for uploading files.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isUploadOpen - Whether the upload screen is open.
 * @param {function} props.setisUploadOpen - Function to set the upload screen's open state.
 * @param {Array} props.filteredUsers - List of filtered user objects.
 * @param {Array} props.users - List of user objects.
 * @param {function} props.setOpenedFile - Function to set the opened file's information.
 * @returns {JSX.Element} - Rendered component.
 */

const UploadScreen = ({ isUploadOpen, setisUploadOpen, filteredUsers, users, setOpenedFile }) => {
    const { translations } = useContext(LanguageContext)
    const dispatch = useDispatch()

    const handleUpload = async (event) => {
        event.preventDefault();

        // Get user_id and file from form input elements
        const user_id = document.getElementById('uploadUsername').value;
        const file = document.getElementById('uploadFile').files[0];

        // Create FormData object to send file and JSON data
        const formData = new FormData()
        formData.append('file', file)
        formData.append('json_data', JSON.stringify({'token': window.localStorage.getItem('token'), 'user_id':user_id}))

        // Send the file to the server and receive the response
        const res = await commService.uploadFile(formData)

        const username = users.find(user => user.id === parseInt(user_id)).name
        dispatch(setContent(res.content))
        setOpenedFile(openedFile => ({
            ...openedFile,
            filename:  res.filename,
            id: res.file_id,
            user_id: user_id,
            user: username
        }));
        setisUploadOpen(false)
    }

    return (
        <Popup
            open={isUploadOpen}
            closeOnDocumentClick={false}
            overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        >
            <div className='popup'>
                <button className="close-button" onClick={() => setisUploadOpen(false)}>X</button>

                <div className="popup-container">
                    <h2 tabIndex="0">{translations?.adminView.upload}</h2>
                    <form className="popup-form" id="uploadForm" encType='multipart/form-data'>
                        <label htmlFor="usernames">{translations?.adminView.chooseOwner}</label>
                        <select
                            id="uploadUsername"
                            name="usernames"
                            className='popup-select'
                        >
                            <option value="">{translations?.adminView.chooseUser}</option>
                            {filteredUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="usernames">{translations?.editorNavbar.chooseFile}</label>
                        <input
                            type="file"
                            accept=".logo"
                            name='file'
                            required
                            id='uploadFile'
                            className='popup-input'
                        />
                        <button className='popup-button' type="submit" value="Upload" onClick={handleUpload}>Upload</button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default UploadScreen