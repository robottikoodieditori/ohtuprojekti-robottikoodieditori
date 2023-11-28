import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import { setContent } from "../reducers/editorReducer";
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import commService from '../services/comms'


const UploadScreen = ({ isUploadOpen, setisUploadOpen, filteredUsers, users, setOpenedFile }) => {
    const { translations } = useContext(LanguageContext)
    const dispatch = useDispatch()

    const handleUpload = async (event) => {
        event.preventDefault();
        const user_id = document.getElementById('uploadUsername').value;
        const file = document.getElementById('uploadFile').files[0];
        const formData = new FormData()
        formData.append('file', file)
        formData.append('json_data', JSON.stringify({'token': window.localStorage.getItem('token'), 'user_id':user_id}))
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
        <div className='overlay'>
            <Popup
                open={isUploadOpen}
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
            >
                <div className='content-upload'>
                    <div className="content-upload-header ">
                        <h2 tabIndex="0">{translations?.adminView.upload}</h2>
                        <div className='upload-header'>
                            <button className="close-button-upload" onClick={() => setisUploadOpen(false)}>X</button>
                        </div>
                    </div>
                    <form id="uploadForm" encType='multipart/form-data'>
                        <label htmlFor="usernames">{translations?.adminView.chooseOwner}</label>
                        <select
                            id="uploadUsername"
                            name="usernames"
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
                        />
                        <button type="submit" value="Upload" onClick={handleUpload}>Upload</button>
                    </form>
                </div>
            </Popup>
        </div>
    );
};

export default UploadScreen