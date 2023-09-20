import '../index.css';
import { useState, useEffect } from 'react';
import docs from "../services/tooltips.json"
import keywords from "../utils/keywords_finnish.txt"
import ReactMarkdown from "react-markdown";


const Sidebar = () => {
    const [commands, setCommands] = useState([]);
    const [selectedCommand, setSelectedCommand] = useState(null);

    useEffect(() => {
        fetch(keywords)
            .then((response) => response.text())
            .then((text) => {
                const commandsArray = text.split(',').filter(Boolean);
                setCommands(commandsArray);            
            })
            .catch((error) => console.error('Error reading commands:', error));
    }, []);

    const handleCommandClick = (command) => {
        setSelectedCommand(command);
    };

    return (
        <div className="sidebar" id='sidebar'>
            {selectedCommand ? (
                <div>
                    <button className='buttonsidebar' onClick={() => setSelectedCommand(null)}>Takaisin</button>
                    <h2>{selectedCommand}</h2>
                    <ReactMarkdown>{docs[selectedCommand]}</ReactMarkdown>
                </div>
            ) : (
                <div>
                    <h2>Käskyt</h2>
                    <ul>
                        {commands.map((command) => (
                            <li key={command}>
                                <button className="buttonsidebar" onClick={() => handleCommandClick(command)}>{command}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


export default Sidebar;
  