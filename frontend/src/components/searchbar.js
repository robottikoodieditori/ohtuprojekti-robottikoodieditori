import "../index.css";
// import { useState, useEffect } from 'react';
// import keywords from "../utils/keywords_finnish.txt"


const Searchbar = ({ searchTerm, handleSearchChange }) => {

    return (
        <div className="search-bar" id='searchbar'>
            <input
                type="text"
                placeholder="Etsi käskyä"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default Searchbar;