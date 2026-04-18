import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { ChevronIcon, CloseIcon } from './icons'
import Button from './Button'

export type SearchTarget = 'title' | 'person' | 'publisher'

const SEARCH_OPTIONS: { value: SearchTarget; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
]

interface DetailSearchPopupProps {
  onClose: () => void
  onSearch: (target: SearchTarget, query: string) => void
}

export default function DetailSearchPopup({ onClose, onSearch }: DetailSearchPopupProps) {
  const [target, setTarget] = useState<SearchTarget>('title')
  const [query, setQuery] = useState('')
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setSelectOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [handleClick])

  const handleSearch = useCallback(() => {
    if (!query.trim()) return
    onSearch(target, query)
    onClose()
  }, [query, target, onSearch, onClose])

  const selectedLabel = useMemo(
    () => SEARCH_OPTIONS.find((o) => o.value === target)?.label ?? '제목',
    [target]
  )

  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[300px] rounded-[12px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] p-[24px]">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute right-[16px] top-[16px] text-text-subtitle hover:text-text-primary"
      >
        <CloseIcon />
      </button>

      {/* 검색 조건 + 입력 */}
      <div className="flex items-end gap-[12px] mb-[16px]">
        {/* 셀렉트 */}
        <div ref={selectRef} className="relative">
          <button
            onClick={() => setSelectOpen((v) => !v)}
            className="flex items-center gap-[6px] text-[14px] font-medium text-text-primary"
          >
            {selectedLabel}
            <ChevronIcon up={selectOpen} />
          </button>

          {selectOpen && (
            <ul className="absolute left-0 top-[calc(100%+4px)] w-[100px] rounded-[8px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-10">
              {SEARCH_OPTIONS.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    setTarget(opt.value)
                    setSelectOpen(false)
                  }}
                  className={[
                    'px-[16px] py-[10px] text-[13px] cursor-pointer hover:bg-light-gray',
                    target === opt.value ? 'text-primary font-medium' : 'text-text-secondary',
                  ].join(' ')}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 입력 */}
        <div className="flex-1 border-b border-text-primary pb-[4px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="검색어 입력"
            className="w-full text-[13px] text-text-primary placeholder:text-text-subtitle outline-none bg-transparent"
          />
        </div>
      </div>

      {/* 검색하기 버튼 */}
      <Button
        variant="primary"
        size="md"
        fullWidth
        onClick={handleSearch}
      >
        검색하기
      </Button>
    </div>
  )
}
