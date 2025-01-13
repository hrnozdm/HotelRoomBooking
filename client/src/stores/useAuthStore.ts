import { create } from "zustand";
import {login as loginService,logout as logoutService} from "../services/authService";




interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    role:string | null;
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: !!localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    login: async (username, password) => {
      const data = await loginService(username, password);
      set({ isLoggedIn: true, username: data.user.username });
    },
    logout: () => {
      logoutService();
      set({ isLoggedIn: false, username: null });
    },
    role:localStorage.getItem('role')
  }));