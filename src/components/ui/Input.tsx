import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  icon?: ReactNode
  variant?: 'default' | 'underline'
  inputSize?: 'sm' | 'md'
}

export default function Input({
  value,
  onChange,
  onEnter,
  icon,
  variant = 'default',
  inputSize = 'md',
  className = '',
  onKeyDown,
  ...props
}: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter()
    }
    onKeyDown?.(e)
  }

  const sizeStyles = {
    sm: 'text-[13px]',
    md: 'text-[14px]',
  }

  const variantStyles = {
    default: '',
    underline: 'border-b border-text-primary pb-[4px]',
  }

  const inputClassName = [
    'w-full bg-transparent text-text-primary placeholder:text-text-subtitle outline-none',
    sizeStyles[inputSize],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const containerClassName = [
    'flex items-center',
    variantStyles[variant],
    icon && 'gap-3',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClassName}>
      {icon && <span className="shrink-0">{icon}</span>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        {...props}
      />
    </div>
  )
}
