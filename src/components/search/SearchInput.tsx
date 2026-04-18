import { SearchIcon } from '../ui/icons'
import Input from '../ui/Input'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  onFocus?: () => void
  placeholder?: string
  hasDropdown?: boolean
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  onFocus,
  placeholder = '검색어 입력',
  hasDropdown = false,
}: SearchInputProps) {
  return (
    <div
      className={[
        'flex h-[50px] w-[480px] items-center gap-3 px-5 bg-light-gray',
        hasDropdown ? 'rounded-t-[25px]' : 'rounded-full',
      ].join(' ')}
    >
      <Input
        value={value}
        onChange={onChange}
        onEnter={onSearch}
        onFocus={onFocus}
        placeholder={placeholder}
        icon={<SearchIcon />}
        inputSize="md"
      />
    </div>
  )
}
