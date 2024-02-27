import { ProductType } from "@/lib/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products?popular=true`;

const getPopularProducts = async (): Promise<ProductType[]> => {
  const response = await axios.get(URL, { withCredentials: true });
  return response.data;
};

export default getPopularProducts;
