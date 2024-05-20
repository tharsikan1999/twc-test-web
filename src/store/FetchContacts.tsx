import { useEffect } from "react";
import useStore from "./store";
import axios from "axios";

const FetchContacts = () => {
  const setContacts = useStore((state) => state.setContacts);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          throw new Error("JWT token not found in local storage");
        }

        const res = await axios.get("http://localhost:3333/contacts/all", {
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
