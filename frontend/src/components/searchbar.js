/*import "../index.css";
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
*/

import "../index.css";

const Searchbar = ({ searchTerm, handleSearchChange, translations }) => {
    console.log("Translations in Searchbar:", translations);
    return (
        <div className="search-bar" id='searchbar'>
            <input
                type="text"
                placeholder={translations.searchPlaceholder}  /* Here the placeholder is now dynamic */
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default Searchbar;
