import type { Book } from '@/types/book'
import BookCard from '@/components/BookCard'

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="w-full">
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  )
}
