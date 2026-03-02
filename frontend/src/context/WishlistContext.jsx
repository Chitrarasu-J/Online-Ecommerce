import { createContext, useContext, useState, useEffect } from "react";
import {
  addToWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
} from "../api/wishlistApi";
import { AuthContext } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const loadWishlist = async () => {
    try {
      const res = await getWishlistApi();
      setWishlistItems(res.data.items || []);
    } catch (err) {
      setWishlistItems([]);
    }
  };

  const addToWishlist = async (templateId) => {
    try {
      const res = await addToWishlistApi(templateId);
      setWishlistItems(res.data.items);
      return true;
    } catch (err) {
      console.error("Add to wishlist error:", err);
      return false;
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const res = await removeFromWishlistApi(itemId);
      setWishlistItems(res.data.items);
    } catch (err) {
      console.error("Remove from wishlist error:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
