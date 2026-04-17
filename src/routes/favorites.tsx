/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router'
import { useFavoriteStore } from '@/lib/favoriteStore'
import BookList from '@/components/BookList/BookList'
import EmptyState from '@/components/EmptyState/EmptyState'

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
})

const PAGE_SIZE = 10

function FavoritesPage() {
  const { favorites } = useFavoriteStore()

  const paged = favorites.slice(0, PAGE_SIZE)

  return (
    <main className="px-[120px] pt-[60px]">
      <h1 className="text-[24px] font-bold leading-[24px] text-text-primary mb-[12px]">
        내가 찜한 책
      </h1>

      <p className="mb-[8px] text-[14px] text-text-secondary">
        찜한 책&nbsp;&nbsp;총{' '}
        <span className="text-primary font-medium">{favorites.length}</span>건
      </p>

      {paged.length > 0 ? (
        <BookList books={paged} />
      ) : (
        <EmptyState message="찜한 책이 없습니다." />
      )}
    </main>
  )
}
