import { useState } from 'react'
import DetailSearchPopup from './DetailSearchPopup'
import type { SearchTarget } from './DetailSearchPopup'
import Button from '../ui/Button'

interface DetailSearchButtonProps {
  target: SearchTarget
  query: string
  onTargetChange: (target: SearchTarget) => void
  onQueryChange: (query: string) => void
  onSearch?: (target: SearchTarget, query: string) => void
}

export default function DetailSearchButton({
  target,
  query,
  onTargetChange,
  onQueryChange,
  onSearch,
}: DetailSearchButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((v) => !v)}
      >
        상세검색
      </Button>

      {isOpen && (
        <DetailSearchPopup
          target={target}
          query={query}
          onTargetChange={onTargetChange}
          onQueryChange={onQueryChange}
          onClose={() => setIsOpen(false)}
          onSearch={(target, query) => {
            setIsOpen(false)
            onSearch?.(target, query)
          }}
        />
      )}
    </div>
  )
}
