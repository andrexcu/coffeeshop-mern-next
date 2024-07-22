import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/status`;

const getCurrentUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await axios.get(URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return response.data;
};

export default getCurrentUser;