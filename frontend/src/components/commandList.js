import "../index.css";
import { useState, useEffect } from 'react';
import keywords from "../utils/keywords_finnish.txt"


const CommandList = ({ searchTerm, handleCommandClick }) => {
    const [commands, setCommands] = useState([]);

    useEffect(() => {
        fetch(keywords)
            .then((response) => response.text())
            .then((text) => {
                const commandsArray = text.split(',').sort();
                setCommands(commandsArray);
            })
            .catch((error) => console.error('Error reading commands:', error));
    }, []);

    return (
        <div>
            <h2>Käskyt</h2>
            <ul>
                {
                    commands.filter(command => command.includes(searchTerm)).map((command) => (
                        <li key={command}>
                            <button className="buttonsidebar" onClick={() => handleCommandClick(command)}>
                                {command}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CommandList;