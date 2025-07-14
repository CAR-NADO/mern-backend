import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    country_of_origin: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    stock: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", productSchema);
