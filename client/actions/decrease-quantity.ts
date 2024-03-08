import axios from "axios";
import { revalidatePath } from "next/cache";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cartItem/decreaseQuantity`;

const decreaseQuantity = async (productId: string) => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.post(
    URL,
    { productId },
    { withCredentials: true }
  );

  return response.data;
};

export default decreaseQuantity;
