import '../index.css';
import { useState } from 'react';
import CommandList from './commandList';
import Searchbar from './searchbar';
import OneCommand from './oneCommand';
import { useDispatch, useSelector } from 'react-redux';
import { resetHighlightedWord } from '../reducers/editorReducer';

const Sidebar = () => {
    const clickedCommand = useSelector(state => state.editor.currentlyHighlightedWord)
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
        dispatch(resetHighlightedWord())
    }

    return (
        <div className="sidebar" id='sidebar'>
            <div className='content'>
                {selectedCommand ? (
                    <OneCommand selectedCommand={selectedCommand} setSelectedCommand={setSelectedCommand} />
                ) : (
                    <div>
                        <Searchbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                        <CommandList searchTerm={searchTerm} handleCommandClick={handleCommandClick} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;

