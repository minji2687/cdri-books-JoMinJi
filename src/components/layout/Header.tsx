import { Link, useLocation } from '@tanstack/react-router'

const NAV_ITEMS = [
  { label: '도서 검색', to: '/search' },
  { label: '내가 찜한 책', to: '/favorites' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="w-full bg-white border-b border-gray">
      <div className="relative flex items-center px-[120px] py-[24px]">
        <Link
          to="/search"
          className="text-[24px] font-bold leading-[24px] text-text-primary"
        >
          CERTICOS BOOKS
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
          {NAV_ITEMS.map(({ label, to }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={[
                  'text-[20px] font-medium leading-[20px] transition-colors pb-2 border-b',
                  isActive
                    ? 'text-text-primary border-primary'
                    : 'text-text-secondary border-transparent hover:text-text-primary',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
