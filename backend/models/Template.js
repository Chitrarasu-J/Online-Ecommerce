import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    demoUrl: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
