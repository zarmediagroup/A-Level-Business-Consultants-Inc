'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { defaultTenant } from '@/types/tenant'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navLinks = [
  { href: '/',          label: 'Home' },
  { href: '/services',  label: 'Services' },
  { href: '/packages',  label: 'Packages' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const tenant = defaultTenant

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-[280ms] ease-in-out"
        style={{
          backgroundColor: scrolled ? 'var(--ink)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
        }}
      >
        <div
          className="container-main flex items-center justify-between"
          style={{ height: '64px' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label={tenant.firm_name}>
            <div
              className="flex items-center justify-center border rounded-[1px] font-mono text-[0.6rem] tracking-[0.18em] uppercase"
              style={{
                width: '36px',
                height: '32px',
                borderColor: 'var(--rule-mid)',
                color: 'var(--white)',
              }}
            >
              ALC
            </div>
            <span
              className="hidden sm:block font-mono text-[0.7rem] tracking-[0.12em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              {tenant.firm_name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[13px] tracking-[0.02em] transition-colors duration-[240ms]"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden md:flex" />

            <Link
              href="/portal"
              className="hidden md:flex items-center gap-1 font-sans text-[13px] tracking-[0.02em] text-white border border-white rounded-[2px] px-4 transition-all duration-200 hover:bg-white hover:text-ink"
              style={{ height: '32px' }}
            >
              Client Portal →
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-5 h-px bg-white origin-center"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-white"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-white origin-center"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: 'var(--ink)' }}
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-playfair text-3xl text-white hover:text-off-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
              >
                <Link
                  href="/portal"
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm tracking-[0.1em] text-white border border-white px-6 py-3 rounded-[1px] hover:bg-white hover:text-ink transition-all"
                >
                  CLIENT PORTAL →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
