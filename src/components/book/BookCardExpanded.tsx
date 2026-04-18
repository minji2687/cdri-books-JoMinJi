import type { Book } from '@/types/book'
import { ChevronIcon, HeartIcon } from '../ui/icons'
import Button from '../ui/Button'

interface BookCardExpandedProps {
  book: Book
  price: number
  favorited: boolean
  onCollapse: () => void
  onToggleFavorite: (e: React.MouseEvent) => void
}

export default function BookCardExpanded({
  book,
  price,
  favorited,
  onCollapse,
  onToggleFavorite,
}: BookCardExpandedProps) {
  return (
    <div className="flex gap-[24px] py-[24px] border-b border-gray">
      {/* 썸네일 */}
      <div className="relative shrink-0">
        <div className="w-[180px] h-[230px] bg-light-gray rounded-sm overflow-hidden">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <button onClick={onToggleFavorite} className="absolute top-2 right-2">
          <HeartIcon filled={favorited} />
        </button>
      </div>

      {/* 중앙 내용 */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-[8px] mb-[16px]">
          <span className="text-[20px] font-bold text-text-primary leading-[20px]">
            {book.title}
          </span>
          <span className="text-[14px] text-text-secondary leading-[14px]">
            {book.authors.join(', ')}
          </span>
        </div>

        {book.contents && (
          <div>
            <p className="text-[14px] font-bold text-text-primary mb-[8px]">책 소개</p>
            <p className="text-[13px] text-text-secondary leading-[22px] line-clamp-5">
              {book.contents}
            </p>
          </div>
        )}
      </div>

      {/* 오른쪽 가격/구매 영역 */}
      <div className="flex flex-col items-end justify-between shrink-0 w-[280px]">
        <Button variant="outline" size="sm" onClick={onCollapse}>
          상세보기 <ChevronIcon up />
        </Button>

        <div className="flex flex-col items-end w-full">
          {book.price > 0 && book.sale_price > 0 && book.price !== book.sale_price && (
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[13px] text-[#9E9E9E]">원가</span>
              <span className="text-[18px] text-text-subtitle line-through">
                {book.price.toLocaleString()}원
              </span>
            </div>
          )}
          <div className="flex items-baseline gap-2 mb-[20px]">
            <span className="text-[13px] text-[#9E9E9E]">할인가</span>
            <span className="text-[18px] font-bold text-text-primary">
              {price.toLocaleString()}원
            </span>
          </div>

          <Button variant="primary" size="lg" fullWidth>
            구매하기
          </Button>
        </div>
      </div>
    </div>
  )
}
