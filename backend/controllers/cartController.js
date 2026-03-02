import Cart from "../models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { templateId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ template: templateId }]
      });
      const populatedCart = await cart.populate("items.template");
      return res.status(201).json(populatedCart);
    }

    // Check if template already exists in cart
    const exists = cart.items.some(
      (item) => item.template.toString() === templateId
    );
    
    if (!exists) {
      cart.items.push({ template: templateId });
      await cart.save();
    }

    const populatedCart = await cart.populate("items.template");
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.template");

    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    // route uses /:id so grab id directly
    const itemId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await cart.save();
    const updatedCart = await cart.populate("items.template");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
