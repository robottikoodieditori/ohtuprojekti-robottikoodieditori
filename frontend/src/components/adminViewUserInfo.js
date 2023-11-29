import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";
import Popup from 'reactjs-popup';

const AdminViewUserInfo = ({ selectedUser, isPasswordWindowOpen, setIsPasswordWindowOpen, handlePasswordChange /*, PasswordWindow*/}) => {
    const { translations } = useContext(LanguageContext)

    const PasswordWindow = () => {
        return (
            <div className='overlay'>
                <Popup
                    open={isPasswordWindowOpen}
                    closeOnDocumentClick={false}
                    overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
                >
                    <div className='content-upload'>
                        <div className="content-upload-header ">
                            <h2 tabIndex="0">{translations?.adminView.changePassword}</h2>
                            <div className='upload-header'>
                                <button className="close-button-upload" onClick={() => setIsPasswordWindowOpen(false)}>X</button>
                            </div>
                        </div>
                        <form onSubmit={handlePasswordChange}>
                            <input
                                type='text'
                                id='passwordInput'
                                name='password'
                                placeholder={selectedUser.password}
                            />
                            <button type="submit" value="Change">Vaihda</button>
                        </form>
                    </div>
                </Popup>
            </div>
        )
    }


    return (
        <div className="user-info">
            <p>{translations?.adminView.username} {selectedUser.name}</p>
            <p>{translations?.adminView.password} {selectedUser.password}</p>

            <button className="change-password-button" onClick={() => {setIsPasswordWindowOpen(true)}}> Vaihda salasana </button>
            { isPasswordWindowOpen &&
                <PasswordWindow />
            }
        </div>
    )
}

export default AdminViewUserInfo