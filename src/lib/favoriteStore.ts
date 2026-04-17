import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Book } from '@/types/book'

interface FavoriteState {
  favorites: Book[]
  addFavorite: (book: Book) => void
  removeFavorite: (isbn: string) => void
  isFavorite: (isbn: string) => boolean
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (book) =>
        set((state) => ({
          favorites: state.favorites.some((b) => b.isbn === book.isbn)
            ? state.favorites
            : [book, ...state.favorites],
        })),
      removeFavorite: (isbn) =>
        set((state) => ({
          favorites: state.favorites.filter((b) => b.isbn !== isbn),
        })),
      isFavorite: (isbn) => get().favorites.some((b) => b.isbn === isbn),
    }),
    { name: 'favorites-storage' }
  )
)
