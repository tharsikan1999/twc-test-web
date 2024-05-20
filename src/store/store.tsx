// store.ts
import create, { SetState } from "zustand";
import { deleteContact } from "./contactsDeleteService";

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
    await deleteContact(id);
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  },
}));

export default useStore;
