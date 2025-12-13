import { useEffect, useState } from "react";
import { getAllTemplates } from "../api/templateApi";
import TemplateCard from "../components/TemplateCard";
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
    <div className="templates-page">
      <h1>All Templates</h1>

      <div className="templates-grid">
        {templates.map((tpl) => (
          <TemplateCard key={tpl._id} template={tpl} />
        ))}
      </div>
    </div>
  );
}

export default Templates;
