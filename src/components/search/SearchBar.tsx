import { useState, useRef, useEffect, useCallback } from 'react'
import type { SearchTarget } from './DetailSearchPopup'
import SearchInput from './SearchInput'
import SearchHistory from './SearchHistory'
import DetailSearchButton from './DetailSearchButton'

interface SearchBarProps {
  inputValue: string
  onInputChange: (value: string) => void
  onSearch: (keyword?: string) => void
  detailTarget: SearchTarget
  detailInputValue: string
  onDetailTargetChange: (target: SearchTarget) => void
  onDetailInputChange: (value: string) => void
  onDetailSearch?: (target: SearchTarget, keyword: string) => void
  history?: string[]
  onRemoveHistory?: (keyword: string) => void
}

export default function SearchBar({
  inputValue,
  onInputChange,
  onSearch,
  detailTarget,
  detailInputValue,
  onDetailTargetChange,
  onDetailInputChange,
  onDetailSearch,
  history = [],
  onRemoveHistory,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const showDropdown = focused && history.length > 0

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setFocused(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const handleSearch = useCallback(() => {
    setFocused(false)
    onSearch()
  }, [onSearch])

  const handleHistorySelect = useCallback(
    (keyword: string) => {
      onInputChange(keyword)
      setFocused(false)
      onSearch(keyword)
    },
    [onInputChange, onSearch]
  )

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <SearchInput
        value={inputValue}
        onChange={onInputChange}
        onSearch={handleSearch}
        onFocus={() => setFocused(true)}
        hasDropdown={showDropdown}
      />

      {showDropdown && (
        <SearchHistory
          items={history}
          onSelect={handleHistorySelect}
          onRemove={onRemoveHistory}
        />
      )}

      <DetailSearchButton
        target={detailTarget}
        inputValue={detailInputValue}
        onTargetChange={onDetailTargetChange}
        onInputChange={onDetailInputChange}
        onSearch={onDetailSearch}
      />
    </div>
  )
}
