import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/status`;

const getCurrentUser = async () => {
  // const response = await fetch(URL, { method: "GET", credentials: "include" });
  const response = await axios.get(URL, { withCredentials: true });
  return response.data;
};

export default getCurrentUser;
