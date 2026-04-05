import Link from 'next/link'
import { defaultTenant } from '@/types/tenant'

export function Footer() {
  const tenant = defaultTenant
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--rule)', backgroundColor: 'var(--obsidian)' }}
    >
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex items-center justify-center border rounded-[1px] font-mono text-[0.6rem] tracking-[0.18em] uppercase"
                style={{ width: '36px', height: '32px', borderColor: 'var(--rule-mid)', color: 'var(--white)' }}
              >
                ALC
              </div>
              <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: 'var(--muted)' }}>
                {tenant.firm_name}
              </span>
            </div>
            <p className="font-sans text-sm leading-loose max-w-xs" style={{ color: 'var(--muted)' }}>
              SAICA-registered chartered accountants and auditors supporting South African businesses with precision and integrity.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['SAICA Registered', 'IRBA Approved', 'CIPC Accredited', 'POPIA Compliant'].map(badge => (
                <span
                  key={badge}
                  className="font-mono text-[0.6rem] tracking-[0.14em] uppercase px-2 py-1 border rounded-[1px]"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--faint)' }}>
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
                  className="font-sans text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--muted)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--faint)' }}>
              Get in Touch
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.1em] uppercase mb-1" style={{ color: 'var(--faint)' }}>Location</p>
                <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{tenant.address}</p>
                <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{tenant.city}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.1em] uppercase mb-1" style={{ color: 'var(--faint)' }}>Hours</p>
                <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>Mon – Fri: 08:30 – 17:00</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.1em] uppercase mb-1" style={{ color: 'var(--faint)' }}>Contact</p>
                <a href={`tel:${tenant.phone}`} className="font-mono text-sm hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
                  WhatsApp: {tenant.phone}
                </a>
                <br />
                <a href={`mailto:${tenant.email}`} className="font-mono text-sm hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
                  {tenant.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>
            © {year} {tenant.firm_name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>
            · SAICA Registered · IRBA Approved · POPIA Compliant · Fully Confidential
          </p>
        </div>
      </div>
    </footer>
  )
}
