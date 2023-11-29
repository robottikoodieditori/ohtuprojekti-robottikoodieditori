// CommandList.js
// Displays a list of commands that can be clicked, with filtering based on a search term.

import "../css/index.css";
import "../css/button.css";
import '../css/sidebar.css';
import { useState, useEffect } from 'react';
import keywords from "../static/keywords_finnish.txt";

/**
 * CommandList component to display a list of commands.
 *
 * Props:
 * - searchTerm: The term used to filter the list of commands.
 * - handleCommandClick: Function to call when a command is clicked.
 * - translations: Object containing localized strings.
 */
const CommandList = ({ searchTerm, handleCommandClick, translations }) => {
    const [commands, setCommands] = useState([]);

    // Fetches commands from a local file and sets them to state
    useEffect(() => {
        fetch(keywords)
            .then((response) => response.text())
            .then((text) => {
                const commandsArray = text.split(',').sort();
                setCommands(commandsArray);
            })
            .catch((error) => console.error('Error reading commands:', error));
    }, []);

    // Returns the translated version of a command if available
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
                                {/* Each command is a button that can be clicked */}
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
