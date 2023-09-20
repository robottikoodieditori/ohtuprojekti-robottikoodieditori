import "../index.css"
import docs from "../services/tooltips.json"
import ReactMarkdown from "react-markdown";

const OneCommand = ({ selectedCommand, setSelectedCommand }) => {
    return (
        <div>
            <button className='buttonsidebar' onClick={() => setSelectedCommand(null)}>
                Takaisin
            </button>

            <h2>{selectedCommand}</h2>

            <ReactMarkdown>
                {docs[selectedCommand]}
            </ReactMarkdown>

        </div>
    )
}

export default OneCommand;