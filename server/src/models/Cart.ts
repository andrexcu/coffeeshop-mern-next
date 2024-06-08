import mongoose from "mongoose";
import CartItem, { cartItemSchema } from "./CartItem";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: String, required: true },
  cartItem: [{ type: Schema.Types.ObjectId, ref: "CartItem", default: [] }],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
