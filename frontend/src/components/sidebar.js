import '../index.css';
import { useState, useEffect } from 'react';
import docs from "../services/tooltips.json"
import keywords from "../utils/keywords_finnish.txt"
import ReactMarkdown from "react-markdown";

const Sidebar = () => {
    const [commands, setCommands] = useState([]);
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

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

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setSuggestions([]);
            return;
        }

        const matchingCommands = commands.filter(command => command.includes(term));
        setSuggestions(matchingCommands);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedCommand(suggestion);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="sidebar" id='sidebar'>
            <div className='content'>
                {selectedCommand ? (
                    <div>
                        <button className='buttonsidebar' onClick={() => setSelectedCommand(null)}>Takaisin</button>
                        <h2>{selectedCommand}</h2>
                        <ReactMarkdown>{docs[selectedCommand]}</ReactMarkdown>
                    </div>
                ) : (
                    <div>
                        <div className="search-bar" id='searchbar'>
                            <input
                                type="text"
                                placeholder="Etsi käskyä"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <h2>Käskyt</h2>
                        <ul>
                            {searchTerm === '' ? (
                                commands.map((command) => (
                                    <li key={command}>
                                        <button className="buttonsidebar" onClick={() => handleCommandClick(command)}>{command}</button>
                                    </li>
                                ))
                            ) : (
                                suggestions.map((suggestion) => (
                                    <li key={suggestion}>
                                        <button className="buttonsidebar" onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</button>
                                    </li>
                                ))   

                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;

  