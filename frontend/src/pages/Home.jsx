import Navbar from "../components/Navbar";
import ChatbotButton from "../components/ChatbotButton";
import Chatbot from "../components/Chatbot";
import TemplateCard from "../components/TemplateCard";
import "./Home.css";
import { useState } from "react";

function Home() {
  const [openChat, setOpenChat] = useState(false);

  // Example local template items for homepage preview
  const popular = [
    {
      _id: "1",
      title: "Portfolio Website",
      price: 49,
      imageUrl: "/portfolio.png"
    },
    {
      _id: "2",
      title: "E-commerce Store",
      price: 49,
      imageUrl: "/ecommerce.png"
    },
    {
      _id: "3",
      title: "Business Website",
      price: 49,
      imageUrl: "/business.png"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="home-wrapper">

        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>
              Find the Best <br />
              Website Templates <br />
              for Your Needs
            </h1>

            <div className="search-box">
              <input type="text" placeholder="Search templates..." />
              <button>🔍</button>
            </div>
          </div>

          <div className="hero-image">
            <img src="/home.png" alt="hero" />
          </div>
        </div>


        {/* POPULAR TEMPLATES SECTION */}
        <h2 className="section-title">Popular Templates</h2>
        <div className="template-row">
          {popular.map((item) => (
            <TemplateCard key={item._id} template={item} />
          ))}
        </div>
      </div>

      {/* CHATBOT */}
      <ChatbotButton onClick={() => setOpenChat(true)} />
      {openChat && <Chatbot onClose={() => setOpenChat(false)} />}
    </>
  );
}

export default Home;
