import SearchBar from "./SearchBar";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-left">
        <h1>Find the Best Website Templates<br/>for Your Needs</h1>
        <SearchBar />
      </div>

      <div className="hero-right-card">
        <img src="/logo.png" alt="template" className="hero-logo" />
        <p className="hero-caption">web design<br />development</p>
      </div>
    </div>
  );
}

export default HeroSection;
