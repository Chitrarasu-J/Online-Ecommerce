import React from "react";
import "./TemplateCard.css";

export default function TemplateCard({ template }) {
  const title = template.title || template.name || "Untitled";
  const price = template.price !== undefined ? template.price : template.amount || 0;
  const img = template.imageUrl || template.image || template.imageUrlPath || "/images/templates/portfolio.png";
  // make rupee
  const rupee = `₹${price}`;

  return (
    <article className="card">
      <div className="card-thumb">
        <img src={img} alt={title} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="card-footer">
          <div className="price">{rupee}</div>
          <button className="buy">Add to cart</button>
        </div>
      </div>
    </article>
  );
}
