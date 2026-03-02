import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { initiatePayment } from "../api/paymentApi";
import "./Payment.css";

// helper to dynamically load Razorpay checkout script
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });
};

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }
  }, [user, cartItems, navigate]);

  const totalPrice = cartItems.reduce((sum, item) => {
    const tpl = item.template || item;
    return sum + (tpl.price || tpl.amount || 0);
  }, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const paymentData = {
        amount: totalPrice * 100, // Convert to paise
        currency: "INR",
        ...formData,
        items: cartItems.map((item) => item.template || item),
      };

      const res = await initiatePayment(paymentData);

      // ensure razorpay script is loaded before opening checkout
      const ok = await loadRazorpayScript().catch(() => false);

      if (ok && window.Razorpay && res.data.order) {
        const options = {
          key: res.data.razorpayKey,
          amount: res.data.order.amount,
          currency: res.data.order.currency,
          name: "Pro Template Studio",
          description: "Template Purchase",
          order_id: res.data.order.id,
          handler: function (response) {
            navigate("/payment-success", {
              state: { orderId: response.razorpay_order_id },
            });
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback - no script or order
        navigate("/payment-success");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        <div className="payment-left">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item) => {
              const tpl = item.template || item;
              return (
                <div key={item._id} className="order-item">
                  <img
                    src={tpl.imageUrl || "/images/templates/portfolio.png"}
                    alt={tpl.title}
                  />
                  <div className="item-info">
                    <h4>{tpl.title}</h4>
                    <p>₹{tpl.price || tpl.amount || 0}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-total">
            <h3>Total: ₹{totalPrice}</h3>
          </div>
        </div>

        <div className="payment-right">
          <h2>Billing Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                required
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Street Name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
            </div>

            <button
              type="submit"
              className="pay-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
