// Searchbar.js
// Provides a search input bar for filtering commands or other elements.

import "../css/index.css";
import "../css/input.css";

/**
 * Searchbar component creates a text input for searching.
 *
 * Props:
 * - searchTerm: The current search term.
 * - handleSearchChange: Function to call when the search input changes.
 * - translations: Object containing localized strings.
 */
const Searchbar = ({ searchTerm, handleSearchChange, translations }) => {
    return (
        <div id='searchbar'>
            {/* Accessible label for the search input */}
            <label htmlFor="searchInput" style={{ display: 'none' }}>
                {translations.searchPlaceholder}
            </label>
            {/* Text input for entering search terms */}
            <input
                type="text"
                id="searchInput"
                placeholder={translations.searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar-input"
            />
        </div>
    );
}

export default Searchbar;
