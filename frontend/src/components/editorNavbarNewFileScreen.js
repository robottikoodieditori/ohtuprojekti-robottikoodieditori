import { useContext } from "react"
import Popup from "reactjs-popup"
import { LanguageContext } from "../contexts/languagecontext"
import '../css/button.css'
import '../css/input.css'
import '../css/popup.css'
import '../css/form.css'

/**
 * `NewFileScreen` component renders a popup screen for creating new files within the code editor.
 * It provides an input field for specifying the filename and a button to trigger the save operation.
 * The popup is controlled via a boolean state and it includes a form submission handler.
 * Internationalization is supported through `LanguageContext`, allowing for localization of text elements like 
 * placeholders and button labels.
 *
 * @component
 * @example
 * return (
 *   <NewFileScreen
 *      isNewFileOpen={isNewFileOpen}
 *      setisNewFileOpen={setisNewFileOpen}
 *      handleSaveNew={handleSaveNew}
 *   />
 * )
 *
 * @param {Object} props - Props for NewFileScreen
 * @param {boolean} props.isNewFileOpen - Boolean to control the visibility of the popup
 * @param {Function} props.setisNewFileOpen - Function to update the popup's open/close state
 * @param {Function} props.handleSaveNew - Function to handle the saving of a new file
 */

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