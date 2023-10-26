import "../index.css";
import { useState, useEffect } from 'react';
import keywords from "../static/keywords_finnish.txt"

const CommandList = ({ searchTerm, handleCommandClick, translations }) => {
    const [commands, setCommands] = useState([]);

    console.log('Translations in CommandList:', translations); // Debugging line
    console.log('Commands translations:', translations?.command); // Debugging line

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
        // Debugging line
        console.log('Trying to translate:', command, 'found:', translations?.commands?.[command]);
        
        // Lookup the translated command, or use the original if not found
        return translations?.command?.[command] || command;
    };

    return (
        <div>
            <h2>{translations?.commandListTitle}</h2>
            <ul>
                {
                    commands
                        .filter(command => getTranslatedCommand(command).includes(searchTerm))
                        .map((command) => (
                            <li key={command}>
                                <button className="buttonsidebar" onClick={() => handleCommandClick(command)}>
                                    {getTranslatedCommand(command)} {/* Translate the command */}
                                </button>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default CommandList;
