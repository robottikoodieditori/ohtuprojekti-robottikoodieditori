import "../css/index.css"
import docs from "../static/tooltips.json"
import ReactMarkdown from "react-markdown";

const OneCommand = ({ selectedCommand, setSelectedCommand , language, translations}) => {
    return (
        <div>
            <button className='buttonsidebar' onClick={() => setSelectedCommand(null)}>
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