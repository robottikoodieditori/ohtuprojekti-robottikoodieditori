// OneCommand.js
// Renders detailed information about a selected command.
// This includes a title, a return button, and the command description in Markdown format.

import "../css/button.css"
import docs from "../static/tooltips.json"
import ReactMarkdown from "react-markdown";

/**
 * OneCommand component displays the detailed information for a selected command.
 * 
 * Props:
 * - selectedCommand: The command that is currently selected.
 * - setSelectedCommand: Function to update the selected command.
 * - language: Current language setting.
 * - translations: Translations object for localization.
 */
const OneCommand = ({ selectedCommand, setSelectedCommand , language, translations}) => {
    return (
        <div>
            <button className='button' onClick={() => setSelectedCommand(null)}>
                {translations?.returnbutton}
            </button>

            <h2>{translations?.command?.[selectedCommand] || selectedCommand}</h2>

            <ReactMarkdown>
                {docs[language][translations?.command?.[selectedCommand] || selectedCommand]}
            </ReactMarkdown>
        </div>
    )
}

export default OneCommand;
