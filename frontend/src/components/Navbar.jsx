import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="logo">Pro Template Studio</div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/templates">Templates</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li>
            <Link to="/cart">
              Cart {cartItems && cartItems.length > 0 ? `(${cartItems.length})` : ""}
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              Wishlist {wishlistItems && wishlistItems.length > 0 ? `(${wishlistItems.length})` : ""}
            </Link>
          </li>
        </ul>

        <div className="auth">
          {!user ? (
            <>
              <Link to="/signin" className="signin">Sign In</Link>
              <Link to="/signup" className="signup">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="user-email">{user.email}</span>
              <button className="signout" onClick={logout}>Sign Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
