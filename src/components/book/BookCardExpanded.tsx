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

      {/* 내용 */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-[8px]">
              <span className="text-[18px] font-bold text-text-primary leading-[18px]">
                {book.title}
              </span>
              <span className="text-[14px] text-text-secondary leading-[14px]">
                {book.authors.join(', ')}
              </span>
            </div>
            {book.contents && (
              <div className="mt-[16px]">
                <p className="text-[14px] font-bold text-text-primary mb-[8px]">책 소개</p>
                <p className="text-[13px] text-text-secondary leading-[22px] max-w-[520px] line-clamp-5">
                  {book.contents}
                </p>
              </div>
            )}
          </div>
          <Button variant="outline" size="md" onClick={onCollapse} className="shrink-0">
            상세보기 <ChevronIcon up />
          </Button>
        </div>

        {/* 가격 + 구매하기 */}
        <div className="mt-auto pt-[24px]">
          <div className="flex flex-col items-end gap-1 mb-[12px]">
            {book.price > 0 && book.sale_price > 0 && book.price !== book.sale_price && (
              <span className="text-[13px] text-text-subtitle line-through">
                원가 {book.price.toLocaleString()}원
              </span>
            )}
            <span className="text-[18px] font-bold text-text-primary">
              할인가 {price.toLocaleString()}원
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
