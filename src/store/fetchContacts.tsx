import { useEffect } from "react";
import useStore from "./store";
import axios from "axios";

const FetchContacts = () => {
  const setContacts = useStore((state) => state.setContacts);

  const GET_API_URL = "http://localhost:3333/contacts/all"; // Replace with your actual API URL

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          throw new Error("JWT token not found in local storage");
        }

        const res = await axios.get(`${GET_API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setContacts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to get data ");
      }
    };

    fetchContacts();
  }, [setContacts]);
};

export default FetchContacts;
