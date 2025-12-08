import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search templates..." />
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;
