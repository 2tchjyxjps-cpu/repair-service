import Link from "next/link"
import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: "primary" | "secondary"
  onClick?: () => void
}

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",

    secondary:
      "border border-black/10 bg-white text-zinc-900 hover:bg-zinc-100",
  }

  const className = `
    inline-flex h-14 items-center justify-center
    rounded-2xl px-8
    text-base font-semibold
    tracking-tight
    transition-all duration-200
    hover:-translate-y-0.5
    active:translate-y-0
    ${styles[variant]}
  `

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}