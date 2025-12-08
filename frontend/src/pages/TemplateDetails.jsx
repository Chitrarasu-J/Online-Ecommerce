import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getTemplateById } from "../api/templateApi";
import "./TemplateDetails.css";

function TemplateDetails() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getTemplateById(id);
      setTemplate(data);
    }
    load();
  }, [id]);

  if (!template) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-left">
          <img src={template.imageUrl} alt={template.title} />
        </div>

        <div className="details-right">
          <h1>{template.title}</h1>
          <p className="price">${template.price}</p>
          <p className="category">Category: {template.category}</p>
          <p className="desc">{template.description}</p>

          <button className="add-cart-btn">Add to Cart</button>
        </div>
      </div>
    </>
  );
}

export default TemplateDetails;
