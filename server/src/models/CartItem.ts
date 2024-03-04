import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const cartItemSchema = new Schema({
  productId: { type: String, required: true },
  cartId: { type: String, ref: "Cart", required: true },
  quantity: { type: Number, required: true },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
