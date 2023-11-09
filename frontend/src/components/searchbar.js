import "../css/index.css";

const Searchbar = ({ searchTerm, handleSearchChange, translations }) => {
    console.log("Translations in Searchbar:", translations);
    return (
        <div className="search-bar" id='searchbar'>
            <label htmlFor="searchInput" style={{ display: 'none' }}>
                {translations.searchPlaceholder}
            </label>
            <input
                type="text"
                id="searchInput"
                placeholder={translations.searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default Searchbar; 