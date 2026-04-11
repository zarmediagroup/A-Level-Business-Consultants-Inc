'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { defaultTenant } from '@/types/tenant'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { BrandLogo } from '@/components/branding/BrandLogo'

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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-150"
        style={{
          backgroundColor: 'var(--ink)',
          borderBottom: scrolled ? '2px solid var(--white)' : '2px solid transparent',
          boxShadow: scrolled ? 'var(--neo-shadow-sm)' : 'none',
        }}
      >
        <div
          className="container-main flex items-center justify-between"
          style={{ height: '64px' }}
        >
          {/* Logo — horizontal mark + optional wordmark on larger breakpoints */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink"
            aria-label={`${tenant.firm_name} — home`}
          >
            <span className="relative block h-10 w-10 sm:h-11 sm:w-11 shrink-0">
              <BrandLogo
                width={502}
                height={497}
                priority
                className="!h-full !w-full object-contain object-center"
              />
            </span>
            <span
              className="hidden sm:block font-mono text-[0.7rem] tracking-[0.12em] uppercase font-bold truncate"
              style={{ color: 'var(--white)' }}
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
                className="font-sans text-[13px] font-bold tracking-[0.04em] uppercase transition-colors duration-100 hover:text-[var(--accent)]"
                style={{ color: 'var(--muted)' }}
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
              className="hidden md:flex items-center gap-1 font-sans text-[13px] font-bold tracking-[0.04em] uppercase neo-btn-primary px-4"
              style={{ height: '36px' }}
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
                className="block w-6 h-[3px] origin-center"
                style={{ backgroundColor: 'var(--white)' }}
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-6 h-[3px]"
                style={{ backgroundColor: 'var(--white)' }}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-6 h-[3px] origin-center"
                style={{ backgroundColor: 'var(--white)' }}
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.15 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: 'var(--ink)', borderLeft: '3px solid var(--accent)' }}
          >
            {/* Mobile menu — logo row */}
            <div className="flex items-center gap-3 px-8 py-6" style={{ borderBottom: '2px solid var(--white)' }}>
              <span className="relative block h-12 w-12 shrink-0">
                <BrandLogo width={502} height={497} className="!h-full !w-full object-contain object-center" />
              </span>
              <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--white)' }}>
                {tenant.firm_name}
              </span>
            </div>

            <nav className="flex flex-col flex-1 px-8 py-10 gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  style={{ borderBottom: '2px solid var(--rule-mid)' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-bebas py-5 hover:text-[var(--accent)] transition-colors duration-100"
                    style={{ fontSize: '2.5rem', color: 'var(--white)', letterSpacing: '0.05em' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/portal"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center neo-btn-primary px-8 py-4 font-mono text-sm tracking-[0.1em] uppercase"
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
