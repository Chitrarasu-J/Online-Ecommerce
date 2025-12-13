import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TemplateCard from "../components/TemplateCard";
import "./Home.css";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/templates")
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO FULL WIDTH */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              Craft Your <br />
              <span>Digital Presence</span>
            </h1>

            <p>
              Explore Our Curated Collection of <b>Premium Templates</b>
            </p>

            <div className="search-box">
              <input placeholder="Search templates..." />
              <button>🔍</button>
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/templates/portfolio.png" alt="Preview" />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Featured Templates</h2>

        {loading && <p>Loading templates...</p>}

        <div className="template-grid">
          {templates.map(t => (
            <TemplateCard key={t._id} template={t} />
          ))}
        </div>
      </section>
    </>
  );
}
