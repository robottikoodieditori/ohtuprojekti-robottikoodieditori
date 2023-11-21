import '../css/index.css';
import '../css/sidebar.css'
import { useState, useContext } from 'react';
import CommandList from './commandList';
import Searchbar from './searchbar';
import OneCommand from './oneCommand';
import { useDispatch, useSelector } from 'react-redux';
import { resetHighlightedWord } from '../reducers/editorReducer';
import { LanguageContext } from '../contexts/languagecontext';

const Sidebar = () => {
    const { language, translations } = useContext(LanguageContext);

    const clickedCommand = useSelector(state => state.editor.currentlyHighlightedWord)
    const dispatch = useDispatch();
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCommandClick = (command) => {
        setSelectedCommand(command);
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    if (clickedCommand !== '') {
        setSelectedCommand(clickedCommand);
        dispatch(resetHighlightedWord())
    }

    return (
        <div className="sidebar" id='sidebar'>
            <div className='content'>
                {selectedCommand ? (
                    <OneCommand 
                        selectedCommand={selectedCommand} 
                        setSelectedCommand={setSelectedCommand} 
                        language={language} 
                        translations={translations}
                    />
                ) : (
                    <div>
                        <h2 tabIndex="0">{translations?.commandListTitle}</h2>
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
        </div>
    );
};

export default Sidebar;
