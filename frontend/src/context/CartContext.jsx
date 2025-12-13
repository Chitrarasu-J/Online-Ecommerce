import { createContext, useContext, useState, useEffect } from "react";
import { addToCartApi, getCartApi, removeFromCartApi } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart when app starts (if user logged in)
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartApi();
      setCartItems(res.data.items || []);
    } catch (err) {
      setCartItems([]);
    }
  };

  const addToCart = async (templateId) => {
    try {
      const res = await addToCartApi(templateId);

      setCartItems(res.data.items);
      return true;
    } catch (err) {
      console.log("Add to cart error:", err);
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await removeFromCartApi(itemId);

      setCartItems(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
