import DetailSearchPopup from './DetailSearchPopup'
import type { SearchTarget } from './DetailSearchPopup'
import Button from '../ui/Button'

interface DetailSearchButtonProps {
  target: SearchTarget
  inputValue: string
  onTargetChange: (target: SearchTarget) => void
  onInputChange: (value: string) => void
  onSearch?: (target: SearchTarget, keyword: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function DetailSearchButton({
  target,
  inputValue,
  onTargetChange,
  onInputChange,
  onSearch,
  isOpen,
  onOpenChange,
}: DetailSearchButtonProps) {
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOpenChange(!isOpen)}
      >
        상세검색
      </Button>

      {isOpen && (
        <DetailSearchPopup
          target={target}
          inputValue={inputValue}
          onTargetChange={onTargetChange}
          onInputChange={onInputChange}
          onClose={() => onOpenChange(false)}
          onSearch={(target, keyword) => {
            onOpenChange(false)
            onSearch?.(target, keyword)
          }}
        />
      )}
    </div>
  )
}
