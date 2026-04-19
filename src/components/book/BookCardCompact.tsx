import type { Book } from '@/types/book'
import { DetailArrowIcon, HeartIcon } from '../ui/icons'
import Button from '../ui/Button'

interface BookCardCompactProps {
  book: Book
  price: number
  favorited: boolean
  bookUrl: string
  onExpand: () => void
  onToggleFavorite: (e: React.MouseEvent) => void
}

export default function BookCardCompact({
  book,
  price,
  favorited,
  bookUrl,
  onExpand,
  onToggleFavorite,
}: BookCardCompactProps) {
  return (
    <div className="flex items-center gap-[20px] py-[20px] border-b border-gray">
      <div className="relative shrink-0">
        <div className="w-[60px] h-[80px] bg-light-gray rounded-sm overflow-hidden">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <button onClick={onToggleFavorite} className="absolute top-1 right-1">
          <HeartIcon filled={favorited} />
        </button>
      </div>

      <div className="flex flex-1 items-center gap-[12px] min-w-0">
        <span className="text-[16px] font-bold text-text-primary leading-[16px] truncate">
          {book.title}
        </span>
        <span className="text-[13px] text-text-secondary leading-[13px] shrink-0">
          {book.authors.join(', ')}
        </span>
      </div>

      <span className="shrink-0 text-[16px] font-bold text-text-primary w-[100px] text-right">
        {price.toLocaleString()}원
      </span>

      <div className="flex shrink-0 items-center gap-[8px]">
        <Button variant="primary" size="md" onClick={() => window.open(bookUrl, '_blank')} className="w-[115px] !h-[48px] !rounded-[8px] !px-[20px] !py-[13px] !text-[16px]">
          구매하기
        </Button>
        <Button variant="secondary" size="md" onClick={onExpand} className="!h-[48px] !rounded-[8px] !px-[20px] !py-[13px] !text-[16px] !font-medium !leading-[16px] !tracking-[0] whitespace-nowrap">
          상세보기 <DetailArrowIcon up={false} />
        </Button>
      </div>
    </div>
  )
}
