'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'
import { defaultTenant } from '@/types/tenant'

const faqs = [
  {
    q: 'How quickly can you take on a new client?',
    a: 'We can typically onboard within 5 business days. For urgent matters like SARS audits or overdue returns, we prioritise accordingly.',
  },
  {
    q: 'Do you work with businesses outside Cape Town?',
    a: 'Yes. We work with clients across South Africa. Our cloud-based systems (Xero, SARS eFiling) allow us to serve clients remotely without compromise.',
  },
  {
    q: 'What happens to my current accountant\'s work?',
    a: 'We conduct a full handover review, identify any outstanding matters, and take structured ownership. No work is lost in transition.',
  },
  {
    q: 'Is my financial information kept confidential?',
    a: 'Absolutely. All information is protected under POPIA and our professional confidentiality obligations as SAICA members. We never share client data.',
  },
  {
    q: 'What accounting software do you use?',
    a: 'We primarily use Xero — a cloud-based system that gives you real-time visibility. We also work with Sage, QuickBooks and manual systems, and can migrate you to Xero.',
  },
]

export default function ContactPage() {
  const tenant = defaultTenant
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    service: '',
    structure: '',
    details: '',
    name: '',
    email: '',
    phone: '',
    submitted: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData(prev => ({ ...prev, submitted: true }))
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    height: '48px',
    padding: '0 1rem',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: '2px solid var(--white)',
    backgroundColor: 'var(--ink)',
    color: 'var(--white)',
    outline: 'none',
    appearance: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ibm-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'var(--white)',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <>
      <Navbar />

      <section
        className="pt-40 pb-16"
        style={{ backgroundColor: 'var(--ink)', borderBottom: '2px solid var(--white)' }}
      >
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-6">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
              >
                Contact Us
              </span>
            </div>
            <h1
              className="font-bebas"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.0, color: 'var(--white)', letterSpacing: '0.02em' }}
            >
              Get in{' '}
              <span style={{ color: 'var(--accent)' }}>Touch</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">
            <FadeUp>
              <div
                style={{
                  backgroundColor: 'var(--carbon)',
                  border: '2px solid var(--white)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                <div
                  className="px-8 py-4"
                  style={{ borderBottom: '2px solid var(--white)', backgroundColor: 'var(--graphite)' }}
                >
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold" style={{ color: 'var(--accent)' }}>
                    Enquiry form
                  </p>
                </div>

                <div className="p-8">
                  {formData.submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div
                        className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase font-bold px-3 py-1.5 mb-6"
                        style={{ backgroundColor: 'var(--profit)', color: '#0A0A08', border: '2px solid #0A0A08' }}
                      >
                        ✓ Message received
                      </div>
                      <h3
                        className="font-bebas mb-3"
                        style={{ fontSize: '2.5rem', color: 'var(--white)', letterSpacing: '0.04em' }}
                      >
                        Thank you, {formData.name.split(' ')[0]}.
                      </h3>
                      <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                        Adrian will be in touch within 1 business day.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div>
                        <label htmlFor="service" style={labelStyle}>
                          What service are you interested in?
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                          style={fieldStyle}
                          required
                        >
                          <option value="">Select…</option>
                          <option value="accounting">Accounting</option>
                          <option value="company-registration">Company registration</option>
                          <option value="tax-registration">Tax registration (VAT/PAYE)</option>
                          <option value="tax-return">Tax return</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="structure" style={labelStyle}>
                          Business structure
                        </label>
                        <select
                          id="structure"
                          value={formData.structure}
                          onChange={e => setFormData(p => ({ ...p, structure: e.target.value }))}
                          style={fieldStyle}
                          required
                        >
                          <option value="">Select…</option>
                          <option value="sole-trader">Sole trader</option>
                          <option value="company">Company</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="details" style={labelStyle}>
                          Tell us about your business and assistance required
                        </label>
                        <textarea
                          id="details"
                          rows={5}
                          placeholder="Provide some information about your business and the assistance required…"
                          value={formData.details}
                          onChange={e => setFormData(p => ({ ...p, details: e.target.value }))}
                          style={{
                            ...fieldStyle,
                            height: 'auto',
                            padding: '0.75rem 1rem',
                            resize: 'vertical',
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="name" style={labelStyle}>
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          style={fieldStyle}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" style={labelStyle}>
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                          style={fieldStyle}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" style={labelStyle}>
                          Contact number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="e.g. 063 304 1942"
                          value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          style={fieldStyle}
                        />
                      </div>
                      <button type="submit" className="neo-btn-primary w-full h-12 font-sans text-sm">
                        Submit →
                      </button>
                      <p className="font-mono text-[0.62rem] tracking-[0.08em] text-center font-medium" style={{ color: 'var(--faint)' }}>
                        Protected under POPIA · SAICA professional confidentiality
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="flex flex-col gap-8">
                <div>
                  <p
                    className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6 font-bold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Get in Touch
                  </p>
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>
                        Location
                      </p>
                      <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                        {tenant.address}, {tenant.city}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>
                        Our hours
                      </p>
                      <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                        08:30 – 17:00 Monday – Friday
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>
                        WhatsApp
                      </p>
                      <a
                        href={`https://wa.me/27${tenant.phone?.replace(/\D/g, '').slice(1)}`}
                        className="font-sans text-sm font-bold transition-colors hover:text-[var(--accent)]"
                        style={{ color: 'var(--muted)' }}
                      >
                        {tenant.phone}
                      </a>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1 font-bold" style={{ color: 'var(--faint)' }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${tenant.email}`}
                        className="font-sans text-sm font-bold transition-colors hover:text-[var(--accent)]"
                        style={{ color: 'var(--muted)' }}
                      >
                        {tenant.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--accent)',
                    border: '2px solid #0A0A08',
                    boxShadow: '4px 4px 0px #0A0A08',
                    padding: '1.5rem',
                  }}
                >
                  <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-2 font-bold" style={{ color: 'var(--accent-fg-muted)' }}>
                    Prefer to schedule directly?
                  </p>
                  <p className="font-sans text-sm font-medium mb-5" style={{ color: 'var(--accent-fg-muted)' }}>
                    Book a 30-minute consultation with Adrian via Calendly.
                  </p>
                  <a
                    href={tenant.calendly_url ?? '/contact'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn-dark flex items-center justify-center w-full h-12 font-sans text-sm"
                  >
                    Book via Calendly →
                  </a>
                </div>

                <div>
                  <p
                    className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6 font-bold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Frequently Asked Questions
                  </p>
                  <div style={{ border: '2px solid var(--white)' }}>
                    {faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group"
                        style={{ borderBottom: i < faqs.length - 1 ? '2px solid var(--rule-mid)' : 'none' }}
                        open={openFaq === i}
                        onToggle={e => {
                          if ((e.target as HTMLDetailsElement).open) setOpenFaq(i)
                          else if (openFaq === i) setOpenFaq(null)
                        }}
                      >
                        <summary className="flex justify-between items-center gap-3 px-5 py-4 cursor-pointer list-none">
                          <span className="font-sans text-sm font-bold" style={{ color: 'var(--white)' }}>
                            {faq.q}
                          </span>
                          <span className="font-bebas shrink-0" style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>
                            {openFaq === i ? '−' : '+'}
                          </span>
                        </summary>
                        <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--rule-mid)' }}>
                          <p className="font-sans text-sm leading-[1.8] font-medium pt-3" style={{ color: 'var(--muted)' }}>
                            {faq.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
