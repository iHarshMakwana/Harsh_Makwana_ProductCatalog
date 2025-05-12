import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MiniCart from "./components/MiniCart.jsx";
import "./styles/styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 100,
    category: "All",
    color: "All",
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("newest");

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.price >= filters.priceMin &&
      p.price <= filters.priceMax &&
      (filters.category === "All" || p.category === filters.category) &&
      (filters.color === "All" || p.color === filters.color) &&
      p.rating >= filters.rating
    );

    if (sortOption === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortOption === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortOption === "newest") result.sort((a, b) => (b.isNew ? 1 : -1));

    setFilteredProducts(result);
  }, [products, searchTerm, filters, sortOption]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist(
      wishlist.find((item) => item.id === product.id)
        ? wishlist.filter((item) => item.id !== product.id)
        : [...wishlist, product]
    );
  };

  // Reset filters, search, and sort to default
  const resetFilters = () => {
    setFilters({ priceMin: 0, priceMax: 100, category: "All", color: "All", rating: 0 });
    setSearchTerm("");
    setSortOption("newest");
  };

  return (
    <div className="app">
      <header>
        <button className="home-button" onClick={resetFilters}>Home</button>
        <h1>E-Commerce</h1>
        <div className="header-buttons">
          <p>Wishlist: {wishlist.length}</p>
          <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
            Cart: {cart.length}
          </button>
        </div>
      </header>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="controls">
        <FilterPanel filters={filters} setFilters={setFilters} setSortOption={setSortOption} />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>
      {isCartOpen && (
        <MiniCart
          cart={cart}
          removeFromCart={removeFromCart}
          closeCart={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;