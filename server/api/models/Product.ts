import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  onMenu: { type: Boolean, default: false, required: true },
  popular: { type: Boolean, default: false, required: true },
  special: { type: Boolean, default: false, required: true },
  type: { type: String, enum: ["classic", "choco", "mocha"] },
  description: { type: String },
  details: { type: String },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
