interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  onDetailSearch?: () => void
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onDetailSearch,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-[50px] w-[480px] items-center gap-3 rounded-full bg-light-gray px-5">
        <SearchIcon />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-subtitle outline-none"
        />
      </div>
      <button
        onClick={onDetailSearch}
        className="h-[34px] rounded-md border border-gray bg-white px-[16px] text-[12px] text-text-secondary hover:border-primary hover:text-primary transition-colors"
      >
        상세검색
      </button>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.5" cy="7.5" r="5.5" stroke="#8D94A0" strokeWidth="1.5" />
      <path
        d="M12 12L16 16"
        stroke="#8D94A0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
