import React from "react";

function MiniCart({ cart, removeFromCart, closeCart }) {
  return (
    <div className="mini-cart">
      <h2>Cart</h2>
      <button onClick={closeCart}>Close</button>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price.toFixed(2)}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MiniCart;