import { useState } from 'react'
import DetailSearchPopup from './DetailSearchPopup'
import type { SearchTarget } from './DetailSearchPopup'
import Button from './Button'

interface DetailSearchButtonProps {
  onSearch?: (target: SearchTarget, query: string) => void
}

export default function DetailSearchButton({ onSearch }: DetailSearchButtonProps) {
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
