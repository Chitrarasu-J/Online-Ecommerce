import "./TemplateSection.css";

function TemplateSection({ title, templates }) {
  return (
    <div className="section-container">
      <h2>{title}</h2>

      <div className="template-grid">
        {templates.map((t, index) => (
          <div className="template-card" key={index}>
            <img src={t.img} alt={t.name} />
            <h3>{t.name}</h3>
            <p>$49</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSection;
