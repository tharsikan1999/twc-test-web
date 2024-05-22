import axios from "axios";
import { toast } from "react-toastify";

const Base_API_URL = "http://localhost:3333/contacts";

interface Contact {
  id?: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
}

const getAuthToken = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("JWT token not found in local storage");
  }
  return token;
};

// Fetch all contacts

export const fetchContacts = async () => {
  try {
    const token = getAuthToken();

    const res = await axios.get(`${Base_API_URL}/all`, {
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

// Create a new contact
export const createContact = async (contact: Contact): Promise<void> => {
  try {
    const token = getAuthToken();

    await axios.post(`${Base_API_URL}/add`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Contact added successfully");
  } catch (error) {
    toast.error("An error occurred");
    console.log(error);
  }
};

// Update a contact
export const updateContact = async (contact: Contact): Promise<void> => {
  try {
    const token = getAuthToken();

    // Send a PUT request to update the user
    await axios.put(
      `${Base_API_URL}/update/${contact.id}`,
      {
        name: contact.name,
        gender: contact.gender,
        email: contact.email,
        phone: contact.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("User updated successfully");
  } catch (error) {
    toast.error("Failed to update user. Please try again.");
    console.error("Error updating user:", error);
  }
};

//delete a contact
export const deleteContact = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();

    await axios.delete(`${Base_API_URL}/delete/${id}`, {
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
