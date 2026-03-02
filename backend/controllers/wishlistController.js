import Wishlist from "../models/Wishlist.js";

// Add template to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { templateId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [{ template: templateId }],
      });
      return res.status(201).json(wishlist);
    }

    // avoid adding duplicates
    const exists = wishlist.items.some(
      (item) => item.template.toString() === templateId
    );
    if (!exists) {
      wishlist.items.push({ template: templateId });
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items.template"
    );
    res.json(wishlist || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove template from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await wishlist.save();
    const updatedWishlist = await wishlist.populate("items.template");
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};