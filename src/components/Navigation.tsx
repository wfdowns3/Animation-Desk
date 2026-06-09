'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/story', label: 'The Story' },
  { href: '/desks', label: 'The Desks' },
  { href: '/founders-edition', label: "Founder's Edition" },
  { href: '/institutions', label: 'Schools & Studios' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-luxury">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-xl md:text-2xl text-text tracking-tight hover:text-gold transition-colors duration-200 flex-shrink-0"
              aria-label="Animation Desk — Home"
            >
              Animation Desk
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-xs tracking-widest uppercase font-sans font-medium transition-colors duration-200 ${
                    pathname === href
                      ? 'text-gold'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/#waitlist"
                className="hidden md:inline-flex items-center justify-center
                           border border-gold text-gold
                           px-5 py-2.5
                           text-xs tracking-widest uppercase font-sans font-medium
                           transition-all duration-300
                           hover:bg-gold hover:text-background"
              >
                Join the list
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span
                  className={`block w-6 h-px bg-text transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-px bg-text transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-px bg-text transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-sm flex flex-col justify-center transition-all duration-500 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="container-luxury flex flex-col gap-8 py-20">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`font-serif text-4xl font-light transition-colors duration-200 ${
                pathname === href ? 'text-gold' : 'text-text hover:text-gold'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {label}
            </Link>
          ))}

          <div className="pt-8 border-t border-border">
            <Link
              href="/#waitlist"
              className="btn-gold w-full text-center"
            >
              Join the list
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
