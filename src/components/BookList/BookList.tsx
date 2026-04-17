import type { Book } from '@/types/book'
import BookCard from '@/components/BookCard/BookCard'

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="w-full">
      {books.map((book, index) => (
        <BookCard key={`${book.isbn}-${index}`} book={book} />
      ))}
    </div>
  )
}
