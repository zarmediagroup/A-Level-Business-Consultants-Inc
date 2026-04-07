import Link from 'next/link'
import { defaultTenant } from '@/types/tenant'

export function Footer() {
  const tenant = defaultTenant
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--obsidian)',
        borderTop: '3px solid var(--white)',
      }}
    >
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold"
                style={{
                  width: '44px',
                  height: '40px',
                  backgroundColor: 'var(--accent)',
                  color: '#0A0A08',
                  border: '2px solid #0A0A08',
                }}
              >
                ALC
              </div>
              <span className="font-mono text-[0.75rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--white)' }}>
                {tenant.firm_name}
              </span>
            </div>
            <p className="font-sans text-sm leading-loose max-w-xs font-medium" style={{ color: 'var(--muted)' }}>
              SAICA-registered chartered accountants and auditors supporting South African businesses with precision and integrity.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['SAICA Registered', 'IRBA Approved', 'CIPC Accredited', 'POPIA Compliant'].map(badge => (
                <span
                  key={badge}
                  className="font-mono text-[0.6rem] tracking-[0.14em] uppercase px-2.5 py-1 font-bold"
                  style={{
                    border: '2px solid var(--white)',
                    color: 'var(--white)',
                    backgroundColor: 'var(--carbon)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6 font-bold" style={{ color: 'var(--accent)' }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/services', label: 'Services' },
                { href: '/packages', label: 'Packages' },
                { href: '/about',    label: 'About Us' },
                { href: '/contact',  label: 'Contact' },
                { href: '/portal',   label: 'Client Portal' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm font-bold transition-colors duration-100 hover:text-[var(--accent)]"
                  style={{ color: 'var(--muted)' }}
                >
                  → {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6 font-bold" style={{ color: 'var(--accent)' }}>
              Get in Touch
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>Location</p>
                <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>{tenant.address}</p>
                <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>{tenant.city}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>Hours</p>
                <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>Mon – Fri: 08:30 – 17:00</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>Contact</p>
                <a
                  href={`tel:${tenant.phone}`}
                  className="block font-mono text-sm font-bold hover:text-[var(--accent)] transition-colors duration-100"
                  style={{ color: 'var(--muted)' }}
                >
                  WhatsApp: {tenant.phone}
                </a>
                <a
                  href={`mailto:${tenant.email}`}
                  className="block font-mono text-sm font-bold hover:text-[var(--accent)] transition-colors duration-100"
                  style={{ color: 'var(--muted)' }}
                >
                  {tenant.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: '2px solid var(--rule-mid)' }}
        >
          <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--faint)' }}>
            © {year} {tenant.firm_name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--faint)' }}>
            · SAICA · IRBA · POPIA · Fully Confidential
          </p>
        </div>
      </div>
    </footer>
  )
}
