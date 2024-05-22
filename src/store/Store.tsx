import create from "zustand";

interface User {
  userID: string;
  email: string;
}

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearCurrentUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
}));

export default useUserStore;
