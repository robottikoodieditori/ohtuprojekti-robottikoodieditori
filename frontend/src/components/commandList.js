import "../index.css";
import { useState, useEffect } from 'react';
import keywords from "../static/keywords_finnish.txt"

const CommandList = ({ searchTerm, handleCommandClick, translations }) => {
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

    const getTranslatedCommand = (command) => {

        return translations?.command?.[command] || command;
    };

    return (
        <div className="command-list-container">
            <ul className="command-list">
                {
                    commands
                        .filter(command => getTranslatedCommand(command).includes(searchTerm))
                        .map((command) => (
                            <li key={command}>
                                <button className="command-button" onClick={() => handleCommandClick(command)}>
                                    {getTranslatedCommand(command)}
                                </button>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
    
}

export default CommandList;
