import '../css/index.css';
import '../css/sidebar.css';
import { useState, useContext } from 'react';
import CommandList from './commandList'; 
import Searchbar from './searchbar'; 
import OneCommand from './oneCommand';
import { useDispatch, useSelector } from 'react-redux';
import { resetHighlightedWord } from '../reducers/editorReducer';
import { LanguageContext } from '../contexts/languagecontext';

/**
 * `Sidebar` component provides the sidebar for the application, including
 * the command list, search functionality, and display of individual command details.
 *
 * @component
 * @returns {JSX.Element} - JSX element containing the sidebar components.
 */

const Sidebar = () => {
    // Access language settings and translations from the LanguageContext
    const { language, translations } = useContext(LanguageContext);

    // Redux state selectors and dispatcher
    const clickedCommand = useSelector(state => state.editor.currentlyHighlightedWord)
    const dispatch = useDispatch();

    // Local component state
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Handler for when a command is selected from the list
    const handleCommandClick = (command) => {
        setSelectedCommand(command);
    };

    // Handler for changes in the search bar input
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    // Effect to set the selected command when a command is clicked within the editor
    if (clickedCommand !== '') {
        setSelectedCommand(clickedCommand);
        dispatch(resetHighlightedWord())
    }

    // Component rendering
    return (
        <div className="sidebar" id='sidebar'>
            {selectedCommand ? (
                <OneCommand 
                    selectedCommand={selectedCommand} 
                    setSelectedCommand={setSelectedCommand} 
                    language={language} 
                    translations={translations}
                />
            ) : (
                <div>
                    <h2 tabIndex="0" >{translations?.commandListTitle}</h2>
                    <Searchbar 
                        searchTerm={searchTerm} 
                        handleSearchChange={handleSearchChange} 
                        language={language} 
                        translations={translations}
                    />
                    <CommandList 
                        searchTerm={searchTerm} 
                        handleCommandClick={handleCommandClick} 
                        language={language} 
                        translations={translations}
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
