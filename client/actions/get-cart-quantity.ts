import { ProductType } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cart/getCartQuantity`;

const getCartQuantity = async (userId: string) => {
  try {
    const response = await axios.post(URL, {userId},{ withCredentials: true });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export default getCartQuantity;
