import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTemplateById } from "../api/templateApi";
import "./ImageViewer.css";

export default function ImageViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTemplateById(id);
        setTemplate(data);
      } catch (err) {
        console.error("Failed to load template image", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="image-viewer-container">
        <div className="loader">Loading image...</div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="image-viewer-container">
        <div className="error-message">Template not found</div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="image-viewer-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="image-wrapper">
        <img
          src={template.imageUrl || "/images/templates/portfolio.png"}
          alt={template.title}
          className="fullscreen-image"
        />
      </div>
      <div className="image-info">
        <h2>{template.title}</h2>
        <p className="price">₹{template.price || template.amount || 0}</p>
      </div>
    </div>
  );
}
