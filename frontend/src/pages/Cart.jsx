import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import "./Cart.css";  // optional if you add styling later

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.imageUrl || item.template?.imageUrl} alt="" />

              <div>
                <h3>{item.title || item.template?.title}</h3>
                <p>₹{item.price || item.template?.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Cart;   // <-- THIS FIXES THE ERROR
