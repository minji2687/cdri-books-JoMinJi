import { useState, useRef, useEffect } from 'react'
import DetailSearchPopup from '@/components/DetailSearchPopup/DetailSearchPopup'
import type { SearchTarget } from '@/components/DetailSearchPopup/DetailSearchPopup'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query?: string) => void
  onDetailSearch?: (target: SearchTarget, query: string) => void
  history?: string[]
  onRemoveHistory?: (query: string) => void
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onDetailSearch,
  history = [],
  onRemoveHistory,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const showDropdown = focused && history.length > 0

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFocused(false)
      onSearch()
    }
  }

  const handleHistoryClick = (query: string) => {
    onChange(query)
    setFocused(false)
    onSearch(query)
  }

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      {/* 입력창 */}
      <div
        className={[
          'flex h-[50px] w-[480px] items-center gap-3 px-5',
          showDropdown
            ? 'rounded-t-[25px] bg-light-gray'
            : 'rounded-full bg-light-gray',
        ].join(' ')}
      >
        <SearchIcon />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          placeholder="검색어를 입력하세요"
          className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-subtitle outline-none"
        />
      </div>

      {/* 검색 기록 드롭다운 */}
      {showDropdown && (
        <ul className="absolute top-[50px] left-0 w-[480px] rounded-b-[20px] bg-light-gray pb-3 z-10">
          {history.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between px-[56px] py-[10px] hover:bg-gray/30 cursor-pointer"
            >
              <span
                className="flex-1 text-[14px] text-text-primary"
                onMouseDown={() => handleHistoryClick(item)}
              >
                {item}
              </span>
              {onRemoveHistory && (
                <button
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    onRemoveHistory(item)
                  }}
                  className="text-text-subtitle hover:text-text-primary"
                >
                  <CloseIcon />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 상세검색 버튼 + 팝업 */}
      <div className="relative">
        <button
          onClick={() => setDetailOpen((v) => !v)}
          className="h-[34px] rounded-md border border-gray bg-white px-[16px] text-[12px] text-text-secondary hover:border-primary hover:text-primary transition-colors"
        >
          상세검색
        </button>

        {detailOpen && (
          <DetailSearchPopup
            onClose={() => setDetailOpen(false)}
            onSearch={(target, query) => {
              setDetailOpen(false)
              onDetailSearch?.(target, query)
            }}
          />
        )}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7.5" cy="7.5" r="5.5" stroke="#8D94A0" strokeWidth="1.5" />
      <path d="M12 12L16 16" stroke="#8D94A0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2L12 12M12 2L2 12" stroke="#8D94A0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
