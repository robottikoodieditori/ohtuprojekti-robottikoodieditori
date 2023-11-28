import { useContext } from "react"
import Popup from "reactjs-popup"
import { LanguageContext } from "../contexts/languagecontext"


const NewFileScreen = ({ isNewFileOpen, setisNewFileOpen, handleSaveNew }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <div className="overlay" id="overlay" >
            <Popup
                open= {isNewFileOpen}
                closeOnDocumentClick={false}
                overlayStyle={{ background: 'rgba(0,0,0,0.8'}}
            >
                <div className='content-saveNew' id="content-saveNew" role = "dialog" aria-label="new file window">
                    <div className="content-saveNew-header ">
                        <h2 tabIndex="0">{translations?.editorNavbar.filenamePlaceholder}</h2>
                        <div className='saveNew-header'>
                            <button className="close-button-saveNew" onClick={() => setisNewFileOpen(false)}>X</button>
                        </div>
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleSaveNew(event)
                    }}>
                        <label>                    
                            <input
                                type="text"
                                placeholder={
                                    translations?.editorNavbar.filenamePlaceholder
                                }
                                id='newFileNameInput'
                            />
                        </label>
                        <div className="content-saveNew-submit-button">
                            <button type='submit'>
                                {translations?.editorNavbar.saveWithName}
                            </button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    )
}

export default NewFileScreen