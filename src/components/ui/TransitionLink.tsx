'use client'
import { usePageTransition } from './PageTransitionProvider'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export default function TransitionLink({ href, children, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let external links, hash links, and modifier keys pass through normally
    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('#') ||
      e.metaKey || e.ctrlKey || e.shiftKey
    ) {
      onClick?.(e)
      return
    }
    e.preventDefault()
    onClick?.(e)
    navigate(href)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
