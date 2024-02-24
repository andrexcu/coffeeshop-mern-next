const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/status`;

const getCurrentUser = async () => {
  const response = await fetch(URL, { method: "GET", credentials: "include" });

  return response.json();
};

export default getCurrentUser;
