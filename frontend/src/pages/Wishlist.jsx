import { useWishlist } from "../context/WishlistContext";
import "./Wishlist.css";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (!wishlistItems)
    return (
      <div className="wishlist-container">
        <p>Loading wishlist...</p>
      </div>
    );

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => {
            const tpl = item.template || item;
            return (
              <div key={item._id} className="wishlist-item">
                <img
                  src={tpl.imageUrl || "/images/templates/portfolio.png"}
                  alt={tpl.title}
                />
                <div className="item-info">
                  <h3>{tpl.title}</h3>
                  <p className="price">₹{tpl.price || tpl.amount || 0}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
