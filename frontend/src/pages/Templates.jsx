import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TemplateCard from "../components/TemplateCard";
import { getAllTemplates } from "../api/templateApi";
import "./Templates.css";

function Templates() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAllTemplates();
      setTemplates(data);
    }
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="templates-container">
        <h2>All Templates</h2>

        <div className="templates-grid">
          {templates.map((template) => (
            <TemplateCard key={template._id} template={template} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Templates;
