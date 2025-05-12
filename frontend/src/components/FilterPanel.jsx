import React, { useState } from "react";

function FilterPanel({ filters, setFilters, setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-panel">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>
      {isOpen && (
        <div className="filter-content">
          <h2>Filters</h2>
          <div>
            <label>Price Range</label>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div>
            <label>Color</label>
            <select
              value={filters.color}
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
            </select>
          </div>
          <div>
            <label>Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
            >
              <option value="0">Any</option>
              <option value="4">4+ Stars</option>
            </select>
          </div>
          <div>
            <label>Sort By</label>
            <select
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;