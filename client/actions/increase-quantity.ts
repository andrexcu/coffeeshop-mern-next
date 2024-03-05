import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cartItem/increaseQuantity`;

const increaseQuantity = async (productId: string) => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.post(
    URL,
    { productId },
    { withCredentials: true }
  );
  return response.data;
};

export default increaseQuantity;
