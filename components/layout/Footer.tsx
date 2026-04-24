import Link from 'next/link'
import { defaultTenant } from '@/types/tenant'
import { BrandLogo } from '@/components/branding/BrandLogo'

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
              <BrandLogo size={72} className="shrink-0" />
              <span className="font-mono text-[0.75rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--white)' }}>
                {tenant.firm_name}
              </span>
            </div>
            <p className="font-sans text-sm leading-loose max-w-xs font-medium" style={{ color: 'var(--muted)' }}>
              Professional accounting and advisory for South African businesses — clarity, compliance, and partnership.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['SAICA Registered', 'CIPC', 'POPIA Compliant'].map(badge => (
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
                <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                  {tenant.address}, {tenant.city}
                </p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>Our hours</p>
                <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>08:30 – 17:00 Monday – Friday</p>
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
                {tenant.same_as
                  ?.filter(url => /linkedin\.com/i.test(url))
                  .map(url => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-mono text-sm font-bold hover:text-[var(--accent)] transition-colors duration-100 mt-2"
                      style={{ color: 'var(--muted)' }}
                    >
                      LinkedIn →
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-4 mt-16 pt-8"
          style={{ borderTop: '2px solid var(--rule-mid)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--faint)' }}>
              © {year} {tenant.firm_name}. All rights reserved.
            </p>
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--faint)' }}>
              · SAICA · POPIA · Fully Confidential
            </p>
          </div>
          {tenant.web_credit && (
            <p className="font-mono text-[0.6rem] tracking-[0.08em] font-medium" style={{ color: 'var(--faint)' }}>
              Website by{' '}
              <a
                href={tenant.web_credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline-offset-2 hover:underline hover:text-[var(--accent)] transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                {tenant.web_credit.name}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
