import React from "react";

function ProductCard({ product, addToCart, toggleWishlist, isInWishlist }) {
  return (
    <div className="product-card" role="article">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="rating">Rating: {product.rating}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <button
        className={isInWishlist ? "wishlist active" : "wishlist"}
        onClick={() => toggleWishlist(product)}
      >
        ♥
      </button>
    </div>
  );
}

export default ProductCard;