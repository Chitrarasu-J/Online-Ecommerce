import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        template: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Template",
          required: true,
        },
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
