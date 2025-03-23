import { create } from "zustand";
import { IUser } from "@/types/user";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  resetUser: () => void;
}

const useUser = create<UserState>((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  resetUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useUser;
