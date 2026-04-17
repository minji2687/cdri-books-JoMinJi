import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  user: null | {
    id: string
    name: string
    email: string
  }
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
)
