import { useEffect, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import "./Home.css";
import { getAllTemplates } from "../api/templateApi";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllTemplates();
        // API returns either an array or { templates: [...] }
        setTemplates(Array.isArray(data) ? data : data.templates || []);
      } catch (err) {
        console.error("Failed to load templates", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
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
            <img src="/images/templates/home.png" alt="Preview" />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Featured Templates</h2>

        {loading && <p>Loading templates...</p>}

        <div className="template-grid">
          {templates.map((t) => (
            <TemplateCard key={t._id || t.id} template={t} />
          ))}
        </div>
      </section>
    </>
  );
}
