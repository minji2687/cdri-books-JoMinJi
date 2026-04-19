import { useCallback } from 'react'
import { CloseIcon } from '../ui/icons'

interface SearchHistoryItemProps {
  item: string
  onSelect: (item: string) => void
  onRemove?: (item: string) => void
}

function SearchHistoryItem({ item, onSelect, onRemove }: SearchHistoryItemProps) {
  const handleSelect = useCallback(() => onSelect(item), [item, onSelect])

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onRemove?.(item)
    },
    [item, onRemove]
  )

  return (
    <li className="flex items-center justify-between px-[56px] py-[10px] hover:bg-gray/30 cursor-pointer">
      <span
        className="flex-1 text-[14px] text-text-primary"
        onMouseDown={handleSelect}
      >
        {item}
      </span>
      {onRemove && (
        <button onMouseDown={handleRemove} className="text-text-subtitle hover:text-text-primary">
          <CloseIcon />
        </button>
      )}
    </li>
  )
}

interface SearchHistoryProps {
  items: string[]
  onSelect: (item: string) => void
  onRemove?: (item: string) => void
}

export default function SearchHistory({ items, onSelect, onRemove }: SearchHistoryProps) {
  if (items.length === 0) return null

  return (
    <ul className="absolute top-[50px] left-0 w-[480px] rounded-b-[20px] bg-light-gray pb-3 z-10">
      {items.map((item) => (
        <SearchHistoryItem key={item} item={item} onSelect={onSelect} onRemove={onRemove} />
      ))}
    </ul>
  )
}
