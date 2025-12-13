import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="logo">Pro Template Studio</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Templates</li>
          <li>About</li>
          <li>Cart</li>
        </ul>

        <div className="auth">
          <button className="signin">Sign In</button>
          <button className="signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}
