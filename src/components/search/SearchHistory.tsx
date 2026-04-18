import { CloseIcon } from '../ui/icons'

interface SearchHistoryProps {
  items: string[]
  onSelect: (item: string) => void
  onRemove?: (item: string) => void
}

export default function SearchHistory({
  items,
  onSelect,
  onRemove,
}: SearchHistoryProps) {
  if (items.length === 0) return null

  return (
    <ul className="absolute top-[50px] left-0 w-[480px] rounded-b-[20px] bg-light-gray pb-3 z-10">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center justify-between px-[56px] py-[10px] hover:bg-gray/30 cursor-pointer"
        >
          <span
            className="flex-1 text-[14px] text-text-primary"
            onMouseDown={() => onSelect(item)}
          >
            {item}
          </span>
          {onRemove && (
            <button
              onMouseDown={(e) => {
                e.stopPropagation()
                onRemove(item)
              }}
              className="text-text-subtitle hover:text-text-primary"
            >
              <CloseIcon />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
