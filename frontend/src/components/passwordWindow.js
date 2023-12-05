import Popup from "reactjs-popup"
import { useContext } from 'react';
import { LanguageContext } from "../contexts/languagecontext";

const PasswordWindow = ({ isPasswordWindowOpen, setIsPasswordWindowOpen, handlePasswordChange, selectedUser }) => {
    const { translations } = useContext(LanguageContext)

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

export default PasswordWindow