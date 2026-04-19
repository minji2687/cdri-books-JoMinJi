/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import SearchBar from '@/components/search/SearchBar'
import BookList from '@/components/book/BookList'
import EmptyState from '@/components/layout/EmptyState'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { useSearchBooks } from '@/api/books/hooks'
import type { SearchTarget } from '@/components/search/DetailSearchPopup'

export const Route = createFileRoute('/search')({
  component: SearchPage,
})

const PAGE_SIZE = 10

function SearchPage() {
  const [inputValue, setInputValue] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTarget, setSearchTarget] = useState<SearchTarget>('title')
  const [detailTarget, setDetailTarget] = useState<SearchTarget>('title')
  const [detailInputValue, setDetailInputValue] = useState('')
  const { history, addHistory, removeHistory } = useSearchHistory()

  const { data, isLoading, isError, error } = useSearchBooks({
    query: searchKeyword,
    target: searchTarget,
    page: 1,
    size: PAGE_SIZE,
  })

  const books = data?.documents ?? []
  const totalCount = data?.meta.total_count ?? 0

  const handleSearch = (q?: string) => {
    const searchTerm = q ?? inputValue
    if (!searchTerm.trim()) return
    addHistory(searchTerm)
    setSearchTarget('title')
    setDetailTarget('title')
    setDetailInputValue('')
    setSearchKeyword(searchTerm)
  }

  const handleDetailSearch = (target: SearchTarget, searchTerm: string) => {
    setSearchTarget(target)
    setInputValue('')
    addHistory(searchTerm)
    setSearchKeyword(searchTerm)
  }

  return (
    <main className="max-w-[1200px] mx-auto px-[120px] pt-[60px]">
      <h1 className="text-[24px] font-bold leading-[24px] text-text-primary mb-[28px] text-center">
        도서 검색
      </h1>

      <div className="flex justify-center">
        <SearchBar
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSearch={handleSearch}
          detailTarget={detailTarget}
          detailInputValue={detailInputValue}
          onDetailTargetChange={setDetailTarget}
          onDetailInputChange={setDetailInputValue}
          onDetailSearch={handleDetailSearch}
          history={history}
          onRemoveHistory={removeHistory}
        />
      </div>

      {isLoading && (
        <div className="text-center py-[40px] text-[14px] text-text-secondary">
          검색 중...
        </div>
      )}

      {isError && (
        <div className="text-center py-[40px] text-[14px] text-red-500">
          에러 발생: {error instanceof Error ? error.message : '알 수 없는 오류'}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <p className="mt-[20px] mb-[8px] text-[14px] text-text-secondary">
            도서 검색 결과&nbsp;&nbsp;총{' '}
            <span className="text-primary font-medium">{totalCount}</span>건
          </p>

          {books.length > 0 ? (
            <BookList books={books} />
          ) : (
            searchKeyword && <EmptyState />
          )}
        </>
      )}
    </main>
  )
}
