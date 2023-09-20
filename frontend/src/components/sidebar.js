import '../index.css';
import { useState } from 'react';
import CommandList from './commandList';
import Searchbar from './searchbar';
import OneCommand from './oneCommand';

const Sidebar = () => {
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCommandClick = (command) => {
        setSelectedCommand(command);
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

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

