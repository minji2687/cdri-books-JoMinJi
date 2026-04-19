import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium transition-colors rounded-md inline-flex items-center justify-center gap-1'
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-light-gray text-text-secondary hover:opacity-90',
    outline: 'border border-gray bg-white text-text-secondary hover:border-primary hover:text-primary',
    ghost: 'text-text-subtitle hover:text-text-primary',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-xs h-[34px]',
    md: 'px-5 py-2.5 text-[13px]',
    lg: 'px-5 py-3.5 text-sm',
  }
  
  const widthStyles = fullWidth ? 'w-full' : ''
  
  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
