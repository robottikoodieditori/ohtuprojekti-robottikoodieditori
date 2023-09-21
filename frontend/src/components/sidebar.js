import '../index.css';
import { useState, useContext } from 'react';
import CommandList from './commandList';
import Searchbar from './searchbar';
import OneCommand from './oneCommand';
import { useDispatch, useSelector } from 'react-redux';
import { resetWord } from '../reducers/highlightReducer';
import { LanguageContext } from '../contexts/languagecontext';

const Sidebar = () => {
    const { language, translations } = useContext(LanguageContext); // Include translations here

    const clickedCommand = useSelector(state => state.highlight);
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
        dispatch(resetWord());
    }

    return (
        <div className="sidebar" id='sidebar'>
            <div className='content'>
                {selectedCommand ? (
                    <OneCommand 
                        selectedCommand={selectedCommand} 
                        setSelectedCommand={setSelectedCommand} 
                        language={language} 
                        translations={translations} // Pass translations
                    />
                ) : (
                    <div>
                        <Searchbar 
                            searchTerm={searchTerm} 
                            handleSearchChange={handleSearchChange} 
                            language={language} 
                            translations={translations} // Pass translations
                        />
                        <CommandList 
                            searchTerm={searchTerm} 
                            handleCommandClick={handleCommandClick} 
                            language={language} 
                            translations={translations} // Pass translations
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

/*
import '../index.css';
import { useState, useContext } from 'react';
import CommandList from './commandList';
import Searchbar from './searchbar';
import OneCommand from './oneCommand';
import { useDispatch, useSelector } from 'react-redux';
import { resetWord } from '../reducers/highlightReducer';
import { LanguageContext } from '../contexts/languagecontext'; 

const Sidebar = () => {
    const { language } = useContext(LanguageContext);

    const clickedCommand = useSelector(state => state.highlight)
    const dispatch = useDispatch()
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
        setSelectedCommand(clickedCommand)
        dispatch(resetWord())
    }

    return (
        <div className="sidebar" id='sidebar'>
            <div className='content'>
                {selectedCommand ? (
                    <OneCommand selectedCommand={selectedCommand} setSelectedCommand={setSelectedCommand} language={language} />
                ) : (
                    <div>
                        <Searchbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} language={language} />
                        <CommandList searchTerm={searchTerm} handleCommandClick={handleCommandClick} language={language} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;*/