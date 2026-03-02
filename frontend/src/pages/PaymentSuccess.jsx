import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="payment-container">
      <div className="payment-wrapper" style={{ justifyContent: "center" }}>
        <div className="payment-right">
          <h2>Payment Successful!</h2>
          {orderId && <p>Your order ID: <strong>{orderId}</strong></p>}
          <p>Thank you for your purchase. You can now return to the home page.</p>
          <button className="pay-btn" onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    </div>
  );
}
