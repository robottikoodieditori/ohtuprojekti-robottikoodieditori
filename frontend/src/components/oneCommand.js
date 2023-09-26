import "../index.css"
import tooltips_finnish from "../services/tooltips.json"
import tooltips_english from "../services/tooltips_english.json"
import ReactMarkdown from "react-markdown";

const OneCommand = ({ selectedCommand, setSelectedCommand , language, translations}) => {
    const docs = language === 'fi' ? tooltips_finnish : tooltips_english;
    return (
        <div>
            <button className='buttonsidebar' onClick={() => setSelectedCommand(null)}>
                {translations?.returnbutton}
            </button>

            <h2>{translations?.command?.[selectedCommand] || selectedCommand}</h2>

            <ReactMarkdown>
                {docs[translations?.command?.[selectedCommand] || selectedCommand]}
            </ReactMarkdown>

        </div>
    )
}

export default OneCommand;