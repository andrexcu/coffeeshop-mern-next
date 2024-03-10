"use client";
import { CartItem } from "@/context/ShoppingCartContext";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cartItem/mergeLocalCartToUser`;

const mergeLocalCartToUser = async (cartItem: CartItem[]) => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.post(URL, cartItem, { withCredentials: true });

  return response.data;
};

export default mergeLocalCartToUser;
