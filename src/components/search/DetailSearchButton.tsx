import { useState } from 'react'
import DetailSearchPopup from './DetailSearchPopup'
import type { SearchTarget } from './DetailSearchPopup'
import Button from '../ui/Button'

interface DetailSearchButtonProps {
  target: SearchTarget
  inputValue: string
  onTargetChange: (target: SearchTarget) => void
  onInputChange: (value: string) => void
  onSearch?: (target: SearchTarget, keyword: string) => void
}

export default function DetailSearchButton({
  target,
  inputValue,
  onTargetChange,
  onInputChange,
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
          inputValue={inputValue}
          onTargetChange={onTargetChange}
          onInputChange={onInputChange}
          onClose={() => setIsOpen(false)}
          onSearch={(target, keyword) => {
            setIsOpen(false)
            onSearch?.(target, keyword)
          }}
        />
      )}
    </div>
  )
}
