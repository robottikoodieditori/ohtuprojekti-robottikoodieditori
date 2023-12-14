import "../css/index.css";
import "../css/button.css";
import '../css/sidebar.css';
import { useState, useEffect } from 'react';
import keywords from "../static/keywords_finnish.txt";
/**
 * `CommandList` component displays a searchable list of commands. It fetches commands from a local file,
 * filters them based on the provided search term, and allows each command to be clickable.
 * The component is responsible for displaying the commands in a list format where each command is a button.
 * Localization for commands is handled through the `translations` prop.
 *
 * @component
 * @example
 * const searchTerm = "example";
 * const handleCommandClick = (command) => { console.log(command); };
 * const translations = { command: { "exampleCommand": "Translated Example" } };
 * 
 * return (
 *   <CommandList
 *      searchTerm={searchTerm}
 *      handleCommandClick={handleCommandClick}
 *      translations={translations}
 *   />
 * )
 *
 * @param {Object} props - Props for CommandList
 * @param {string} props.searchTerm - Term used to filter the list of commands
 * @param {Function} props.handleCommandClick - Function to call when a command is clicked
 * @param {Object} props.translations - Object containing localized strings for commands
 */

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
    );
}

export default CommandList;
