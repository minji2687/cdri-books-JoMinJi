import { useState, useRef, useEffect, useCallback } from 'react'
import type { SearchTarget } from './DetailSearchPopup'
import SearchInput from './SearchInput'
import SearchHistory from './SearchHistory'
import DetailSearchButton from './DetailSearchButton'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query?: string) => void
  detailTarget: SearchTarget
  detailQuery: string
  onDetailTargetChange: (target: SearchTarget) => void
  onDetailQueryChange: (query: string) => void
  onDetailSearch?: (target: SearchTarget, query: string) => void
  history?: string[]
  onRemoveHistory?: (query: string) => void
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  detailTarget,
  detailQuery,
  onDetailTargetChange,
  onDetailQueryChange,
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
    (query: string) => {
      onChange(query)
      setFocused(false)
      onSearch(query)
    },
    [onChange, onSearch]
  )

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <SearchInput
        value={value}
        onChange={onChange}
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
        query={detailQuery}
        onTargetChange={onDetailTargetChange}
        onQueryChange={onDetailQueryChange}
        onSearch={onDetailSearch}
      />
    </div>
  )
}
