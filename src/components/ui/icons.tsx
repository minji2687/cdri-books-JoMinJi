export function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      className={up ? '' : 'rotate-180'}
      style={{ display: 'inline-block' }}
    >
      <use href="/icons.svg#chevron-icon" />
    </svg>
  )
}

export function CloseIcon({ size = 20 }: { size?: number } = {}) {
  return (
    <svg width={size} height={size}>
      <use href="/icons.svg#close-icon" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="18" height="18">
      <use href="/icons.svg#search-icon" />
    </svg>
  )
}

export function DetailArrowIcon({ up = true }: { up?: boolean }) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      className={up ? '' : 'rotate-180'}
      style={{ display: 'inline-block' }}
    >
      <use href="/icons.svg#detail-arrow-icon" />
    </svg>
  )
}

export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      fill={filled ? '#E84119' : 'none'}
      stroke={filled ? '#E84119' : 'white'}
    >
      <use href="/icons.svg#heart-icon" />
    </svg>
  )
}
