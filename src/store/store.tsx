// store.ts
import create, { SetState } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  // Add more fields as per your contact structure
}

interface StoreState {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  editContact: (id: string, updatedContact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
}

const useStore = create<StoreState>((set: SetState<StoreState>) => ({
  contacts: [],

  setContacts: (contacts: Contact[]) => set({ contacts }),

  editContact: (id: string, updatedContact: Partial<Contact>) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      ),
    })),

  deleteContact: async (id: string) => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("JWT token not found in local storage");
      }

      await axios.delete(`http://localhost:3333/contacts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        contacts: state.contacts.filter((contact) => contact.id !== id),
      }));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw new Error("Failed to delete contact");
    }
  },
}));

export default useStore;
