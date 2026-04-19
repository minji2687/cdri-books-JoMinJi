import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { ChevronIcon, CloseIcon } from '../ui/icons'
import Button from '../ui/Button'
import Input from '../ui/Input'

export type SearchTarget = 'title' | 'person' | 'publisher'

const SEARCH_OPTIONS: { value: SearchTarget; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
]

interface DetailSearchPopupProps {
  target: SearchTarget
  inputValue: string
  onTargetChange: (target: SearchTarget) => void
  onInputChange: (value: string) => void
  onClose: () => void
  onSearch: (target: SearchTarget, keyword: string) => void
}

export default function DetailSearchPopup({
  target,
  inputValue,
  onTargetChange,
  onInputChange,
  onClose,
  onSearch,
}: DetailSearchPopupProps) {
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
    if (!inputValue.trim()) return
    onSearch(target, inputValue)
    onClose()
  }, [inputValue, target, onSearch, onClose])

  const handleOptionSelect = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const value = e.currentTarget.dataset.value as SearchTarget
      onTargetChange(value)
      setSelectOpen(false)
    },
    [onTargetChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch()
    },
    [handleSearch]
  )

  const selectedLabel = useMemo(
    () => SEARCH_OPTIONS.find((o) => o.value === target)?.label ?? '제목',
    [target]
  )

  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[360px] rounded-[8px] bg-white shadow-lg px-[24px] py-[36px]">
      <button
        onClick={onClose}
        className="absolute right-[16px] top-[16px] text-[#BDBDBD] hover:text-text-secondary transition-colors"
      >
        <CloseIcon size={16} />
      </button>

      <div className="flex items-center gap-[12px] mb-[16px]">
        <div ref={selectRef} className="relative">
          <button
            onClick={() => setSelectOpen((v) => !v)}
            className="flex items-center gap-[4px] text-[14px] text-[#757575] min-w-[60px]"
          >
            {selectedLabel}
            <ChevronIcon up={selectOpen} />
          </button>

          {selectOpen && (
            <ul className="absolute left-0 top-[calc(100%+4px)] w-[100px] rounded-[6px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] overflow-hidden z-10 border border-gray-200">
              {SEARCH_OPTIONS.filter((opt) => opt.value !== target).map((opt) => (
                <li
                  key={opt.value}
                  data-value={opt.value}
                  onClick={handleOptionSelect}
                  className={[
                    'px-[16px] py-[8px] text-[13px] cursor-pointer hover:bg-[#F5F5F5] transition-colors',
                    target === opt.value ? 'text-primary font-medium' : 'text-[#757575]',
                  ].join(' ')}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어 입력"
            className="w-full text-[14px] text-text-primary placeholder:text-[#BDBDBD] pb-[6px] border-b-1 border-primary focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full h-[44px] bg-primary text-white text-[15px] font-medium rounded-[8px] hover:bg-[#4A90E2] transition-colors"
      >
        검색하기
      </button>
    </div>
  )
}
