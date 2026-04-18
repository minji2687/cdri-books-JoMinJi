import iconBook from '@/assets/icon_book.png'

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({
  message = '검색된 결과가 없습니다.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-[16px] py-[80px]">
      <img src={iconBook} alt="검색 결과 없음" className="w-[80px] h-[80px]" />
      <p className="text-[14px] text-text-subtitle">{message}</p>
    </div>
  )
}
