import type { Book } from '@/types/book'
import BookCard from './BookCard'

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="w-full mt-[36px]">
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} />
      ))}
    </div>
  )
}
