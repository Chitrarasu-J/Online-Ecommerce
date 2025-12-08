import { Link } from "react-router-dom";
import "./TemplateCard.css";

function TemplateCard({ template }) {
  return (
    <div className="template-card">
      <img src={template.imageUrl} alt={template.title} />

      <h3>{template.title}</h3>
      <p className="price">${template.price}</p>
      <p className="category">{template.category}</p>

      <Link to={`/template/${template._id}`} className="view-btn">
        View Template
      </Link>
    </div>
  );
}

export default TemplateCard;
