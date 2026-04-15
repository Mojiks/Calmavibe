import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export default function Button({ children, onClick, className = "" }: Props) {
  return (
    <button
      onClick={onClick}
      className={`active:scale-95 transition-all duration-150 ease-in-out ${className}`}
    >
      {children}
    </button>
  )
}