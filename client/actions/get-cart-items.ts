import axios from "axios";
import { revalidatePath } from "next/cache";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cart/getCartItems`;

const getCartItems = async ({userId}: {userId: string}) => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.post(URL, {userId},{ withCredentials: true });

  return response.data;
};

export default getCartItems;
