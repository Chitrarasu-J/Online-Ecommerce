import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left">
        <img src="/logo.png" className="logo" />

        <Link to="/">Home</Link>
        <Link to="/templates">Templates</Link>
      </div>

      <div className="right">
        <Link to="/cart">Cart</Link>
        <button className="btn">Sign In</button>
        <button className="btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
