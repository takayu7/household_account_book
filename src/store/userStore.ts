// src/store/userStore.ts
import { create } from 'zustand'
import { UserType } from '@/lib/type'

interface UserStore {
  user: UserType | null
  isLoggedIn: boolean
  setUser: (user: UserType) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}))