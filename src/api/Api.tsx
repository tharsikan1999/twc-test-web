import axios from "axios";

const Base_API_URL = "http://localhost:3333/contacts/";

export const fetchContacts = async () => {
  try {
    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("JWT token not found in local storage");
    }

    const res = await axios.get(`${Base_API_URL}all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to get data ");
  }
};
