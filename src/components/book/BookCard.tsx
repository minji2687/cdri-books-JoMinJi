import { useState, useCallback, useMemo } from 'react'
import type { Book } from '@/types/book'
import { useFavoriteStore } from '@/lib/favoriteStore'
import BookCardCompact from './BookCardCompact'
import BookCardExpanded from './BookCardExpanded'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore()
  const favorited = isFavorite(book.isbn)

  const price = useMemo(
    () => (book.sale_price > 0 ? book.sale_price : book.price),
    [book.sale_price, book.price]
  )

  const toggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      favorited ? removeFavorite(book.isbn) : addFavorite(book)
    },
    [favorited, book.isbn, addFavorite, removeFavorite]
  )

  if (expanded) {
    return (
      <BookCardExpanded
        book={book}
        price={price}
        favorited={favorited}
        onCollapse={() => setExpanded(false)}
        onToggleFavorite={toggleFavorite}
      />
    )
  }

  return <BookCardCompact book={book} price={price} onExpand={() => setExpanded(true)} />
}
