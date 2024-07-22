"use client";
import { CartItem } from "@/context/ShoppingCartContext";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cartItem/mergeLocalCartToUser`;

export type mergeCartType = {
  cartItem: CartItem[]
  userId: string,
}

const mergeLocalCartToUser = async ({cartItem, userId}: mergeCartType) => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.post(URL, {userId, cartItem}, { withCredentials: true });

  return response.data;
};

export default mergeLocalCartToUser;
