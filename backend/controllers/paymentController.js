import Razorpay from "razorpay";
import crypto from "crypto";

// initialize razorpay lazily to avoid startup errors
let razorpay = null;
const getRazorpay = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

// create order
export const initiatePayment = async (req, res) => {
  try {
    const { amount, currency, fullName, email, phone, address, city, zipCode, items } = req.body;

    const razorpayInstance = getRazorpay();
    // create razorpay order
    const order = await razorpayInstance.orders.create({
      amount,
      currency,
      receipt: `order_rcptid_${Date.now()}`,
    });

    res.json({
      order,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("initiatePayment error", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};

// verify payment signature
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // here you could mark order paid, save to DB, etc.
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error("verifyPayment error", err);
    res.status(500).json({ message: "Verification failed" });
  }
};
