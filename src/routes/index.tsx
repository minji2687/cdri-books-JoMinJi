/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import SearchBar from '@/components/SearchBar/SearchBar'
import BookList from '@/components/BookList/BookList'
import EmptyState from '@/components/EmptyState/EmptyState'
import { MOCK_BOOKS } from '@/mocks/books'
import type { Book } from '@/types/book'

export const Route = createFileRoute('/')({
  component: SearchPage,
})

function SearchPage() {
  const [query, setQuery] = useState('')
  const [books] = useState<Book[]>(MOCK_BOOKS)

  const handleSearch = () => {
    console.log('검색:', query)
  }

  return (
    <main className="px-[120px] pt-[60px]">
      <h1 className="text-[24px] font-bold leading-[24px] text-text-primary mb-[28px]">
        도서 검색
      </h1>

      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      <p className="mt-[20px] mb-[8px] text-[14px] text-text-secondary">
        도서 검색 결과&nbsp;&nbsp;총{' '}
        <span className="text-primary font-medium">{books.length}</span>건
      </p>

      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <EmptyState />
      )}
    </main>
  )
}
