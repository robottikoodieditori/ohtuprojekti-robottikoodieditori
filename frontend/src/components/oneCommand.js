import "../css/button.css"
import docs from "../static/tooltips.json"
import ReactMarkdown from "react-markdown";

/**
 * `OneCommand` component displays detailed information for a selected command.
 *
 * @component
 * @param {Object} props - Props for OneCommand component
 * @param {string|null} props.selectedCommand - The command that is currently selected.
 * @param {Function} props.setSelectedCommand - Function to update the selected command.
 * @param {string} props.language - Current language setting.
 * @param {object} props.translations - Translations object for localization.
 * @returns {JSX.Element} - JSX element containing detailed command information.
 */

const OneCommand = ({ selectedCommand, setSelectedCommand, language, translations }) => {
    return (
        <div>
            <button className='button' onClick={() => setSelectedCommand(null)}>
                {translations?.returnbutton}
            </button>
  
            <h2 tabIndex="0">{translations?.command?.[selectedCommand] || selectedCommand}</h2>
  
            {/* Render the command description in Markdown format */}
            <div tabIndex="0">
                <ReactMarkdown>
                    {docs[language][translations?.command?.[selectedCommand] || selectedCommand]}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default OneCommand;
