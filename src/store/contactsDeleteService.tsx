// contactsService.ts
import axios from "axios";
import { toast } from "react-toastify";

const DELETE_API_URL = "http://localhost:3333/contacts/delete/"; // Replace with your actual API URL

// Function to delete a contact
export const deleteContact = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("JWT token not found in local storage");
    }

    await axios.delete(`${DELETE_API_URL}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Contact deleted successfully");
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Failed to delete contact");
  }
};
