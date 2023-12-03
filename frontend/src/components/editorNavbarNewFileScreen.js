/**
 * NewFileScreen.js
 * This component renders a popup screen for creating a new file in the code editor. It provides an input
 * field for the filename and a button to save the new file.
 * 
 * Props:
 * - isNewFileOpen: Boolean to determine if the popup screen is open.
 * - setisNewFileOpen: Function to update the state of the popup's visibility.
 * - handleSaveNew: Function to handle the saving of the new file with the provided filename.
 * 
 * The component uses the LanguageContext for internationalization, displaying texts (like placeholders
 * and button labels) in different languages as per the current language setting.
 */

import { useContext } from "react"
import Popup from "reactjs-popup"
import { LanguageContext } from "../contexts/languagecontext"
import '../css/button.css'
import '../css/input.css'
import '../css/popup.css'
import '../css/form.css'

const NewFileScreen = ({ isNewFileOpen, setisNewFileOpen, handleSaveNew }) => {
    const { translations } = useContext(LanguageContext)

    return (
        <Popup
            open= {isNewFileOpen}
            closeOnDocumentClick={false}
            overlayStyle={{ background: 'rgba(0,0,0,0.8'}}
        >
            <div className='popup' id="content-saveNew" role = "dialog" aria-label="new file window">
                <button className="close-button" onClick={() => setisNewFileOpen(false)}>X</button>
                <div className="popup-container">
                    <h2> {translations?.editorNavbar.filenamePlaceholder} </h2>
                    <form className='popup-form' onSubmit={(event) => {
                        event.preventDefault()
                        handleSaveNew(event)
                    }}>
                        <label>                    
                            <input
                                type="text"
                                placeholder={translations?.editorNavbar.filenamePlaceholder}
                                id='newFileNameInput'
                                className="popup-input"
                            />
                        </label>
                        <button className="popup-button" type='submit'>
                            {translations?.editorNavbar.saveWithName}
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    )
}

export default NewFileScreen