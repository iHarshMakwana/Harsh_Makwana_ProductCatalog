import React, { useState, useEffect } from "react";

function SearchBar({ setSearchTerm }) {
  const [input, setInput] = useState("");
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  const handleSearch = () => {
    if (input && !recentSearches.includes(input)) {
      const newSearches = [input, ...recentSearches].slice(0, 3);
      setRecentSearches(newSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    }
    setSearchTerm(input);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      {recentSearches.length > 0 && (
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => { setInput(search); setSearchTerm(search); }}>
              {search}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;