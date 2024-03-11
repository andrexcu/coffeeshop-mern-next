import axios from "axios";
import { revalidatePath } from "next/cache";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cartItem`;

const getCartItemQuantity = async () => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.get(URL, { withCredentials: true });

  return response.data;
};

export default getCartItemQuantity;
