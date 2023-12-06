import "../css/index.css";
import "../css/input.css";

/**
 * `Searchbar` component creates a text input for searching.
 *
 * @component
 * @param {Object} props - Props for Searchbar component
 * @param {string} props.searchTerm - The current search term.
 * @param {Function} props.handleSearchChange - Function to call when the search input changes.
 * @param {object} props.translations - Object containing localized strings.
 * @returns {JSX.Element} - JSX element containing the search input.
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
