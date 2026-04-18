import type { Book } from '@/types/book'
import { ChevronIcon } from './icons'
import Button from './Button'

interface BookCardCompactProps {
  book: Book
  price: number
  onExpand: () => void
}

export default function BookCardCompact({ book, price, onExpand }: BookCardCompactProps) {
  return (
    <div className="flex items-center gap-[20px] py-[20px] border-b border-gray">
      {/* 썸네일 */}
      <div className="w-[60px] h-[80px] shrink-0 bg-light-gray rounded-sm overflow-hidden">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
        ) : null}
      </div>

      {/* 제목 + 저자 */}
      <div className="flex flex-1 items-center gap-[12px] min-w-0">
        <span className="text-[16px] font-bold text-text-primary leading-[16px] truncate">
          {book.title}
        </span>
        <span className="text-[13px] text-text-secondary leading-[13px] shrink-0">
          {book.authors.join(', ')}
        </span>
      </div>

      {/* 가격 */}
      <span className="shrink-0 text-[16px] font-bold text-text-primary w-[100px] text-right">
        {price.toLocaleString()}원
      </span>

      {/* 버튼 */}
      <div className="flex shrink-0 items-center gap-[8px]">
        <Button variant="primary" size="md">
          구매하기
        </Button>
        <Button variant="outline" size="md" onClick={onExpand}>
          상세보기 <ChevronIcon up={false} />
        </Button>
      </div>
    </div>
  )
}
