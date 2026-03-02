import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => {
      const tpl = item.template || item;
      return sum + (tpl.price || tpl.amount || 0);
    },
    0
  );

  // just rely on context loading logic; if empty we can still show
  if (!cartItems) return (
    <div className="cart-container">
      <p>Loading cart...</p>
    </div>
  );

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const tpl = item.template || item;
              return (
                <div key={item._id} className="cart-item">
                  <img
                    src={tpl.imageUrl || "/images/templates/portfolio.png"}
                    alt={tpl.title}
                  />
                  <div className="item-details">
                    <h3>{tpl.title}</h3>
                    <p className="price">₹{tpl.price || tpl.amount || 0}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn" onClick={() => navigate('/payment')}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
