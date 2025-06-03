import { create } from 'zustand';
import { auth } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user: User | null) => {
    set({ user });
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { token, user } = await auth.login(email, password);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: 'Invalid email or password', isLoading: false });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await auth.register(name, email, password);
      const { token, user } = await auth.login(email, password);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ user: null });
        return;
      }

      const { user } = await auth.verifyToken();
      set({ user });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null });
    }
  },
}));