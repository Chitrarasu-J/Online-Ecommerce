import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import "./TemplateCard.css";

export default function TemplateCard({ template }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useContext(AuthContext);

  const title = template.title || template.name || "Untitled";
  const price = template.price !== undefined ? template.price : template.amount || 0;
  const img = template.imageUrl || template.image || template.imageUrlPath || "/images/templates/portfolio.png";
  // make rupee
  const rupee = `₹${price}`;

  const handleImageClick = () => {
    const id = template._id || template.id;
    navigate(`/image/${id}`);
  };

  const handleCart = () => {
    if (!user) {
      alert("Please sign in to add items to your cart");
      return;
    }
    const id = template._id || template.id;
    console.log("adding to cart", id);
    addToCart(id)
      .then((ok) => {
        if (ok) {
          alert("Added to cart");
        } else {
          alert("Failed to add to cart");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding to cart");
      });
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please sign in to add items to your wishlist");
      return;
    }
    const id = template._id || template.id;
    console.log("adding to wishlist", id);
    addToWishlist(id)
      .then((ok) => {
        if (ok) {
          alert("Added to wishlist");
        } else {
          alert("Failed to add to wishlist");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding to wishlist");
      });
  };

  return (
    <article className="card">
      <div className="card-thumb" onClick={handleImageClick}>
        <img src={img} alt={title} style={{ cursor: "pointer" }} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="card-footer">
          <div className="price">{rupee}</div>
          <button className="buy" onClick={handleCart}>
            Add to cart
          </button>
          <button className="wishlist-btn" onClick={handleWishlist}>
            ♥
          </button>
        </div>
      </div>
    </article>
  );
}
