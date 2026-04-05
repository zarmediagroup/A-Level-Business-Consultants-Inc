'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

type Step = 1 | 2 | 3 | 4

export default function ContactPage() {
  const tenant = defaultTenant
  const [step, setStep] = useState<Step>(1)
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

  const steps: { num: Step; label: string }[] = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Business' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Contact' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData(prev => ({ ...prev, submitted: true }))
  }

  const inputClass = 'w-full h-12 px-4 font-sans text-sm rounded-[1px] bg-ink border border-graphite text-white placeholder-faint focus:outline-none focus:border-white transition-colors duration-200'
  const selectClass = 'w-full h-12 px-4 font-sans text-sm rounded-[1px] bg-ink border border-graphite text-white focus:outline-none focus:border-white transition-colors duration-200 appearance-none'
  const labelClass = 'font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted mb-2 block'

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-40 pb-16"
        style={{ backgroundColor: 'var(--ink)', borderBottom: '1px solid var(--rule)' }}
      >
        <div className="container-main">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
              Contact Us
            </p>
            <h1
              className="font-playfair text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.08 }}
            >
              Let&apos;s Talk Numbers
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Main contact section */}
      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">

            {/* Form */}
            <FadeUp>
              <div
                className="rounded-[1px] p-8 md:p-10"
                style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
              >
                {/* Progress steps */}
                <div className="flex items-center gap-0 mb-10">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center flex-1">
                      <button
                        onClick={() => s.num <= step && setStep(s.num)}
                        className="flex items-center gap-2"
                        aria-current={s.num === step ? 'step' : undefined}
                      >
                        <div
                          className="w-6 h-6 rounded-[1px] flex items-center justify-center font-mono text-[0.6rem] border transition-all duration-200"
                          style={{
                            backgroundColor: s.num <= step ? 'var(--white)' : 'transparent',
                            borderColor: s.num <= step ? 'var(--white)' : 'var(--graphite)',
                            color: s.num <= step ? 'var(--ink)' : 'var(--muted)',
                          }}
                        >
                          {s.num}
                        </div>
                        <span
                          className="hidden sm:block font-mono text-[0.6rem] tracking-[0.1em] uppercase"
                          style={{ color: s.num <= step ? 'var(--white)' : 'var(--muted)' }}
                        >
                          {s.label}
                        </span>
                      </button>
                      {i < steps.length - 1 && (
                        <div
                          className="flex-1 h-px mx-3 transition-colors duration-300"
                          style={{ backgroundColor: s.num < step ? 'var(--white)' : 'var(--graphite)' }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {formData.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-4" style={{ color: 'var(--profit)' }}>
                      ✓ Message Received
                    </p>
                    <h3 className="font-playfair text-white text-2xl mb-3">Thank you, {formData.name.split(' ')[0]}.</h3>
                    <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                      Adrian will be in touch within 1 business day.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                          <h3 className="font-playfair text-white text-xl mb-8">What can we help you with?</h3>
                          <div className="mb-6">
                            <label htmlFor="service" className={labelClass}>Service Needed</label>
                            <select
                              id="service"
                              value={formData.service}
                              onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                              className={selectClass}
                              required
                            >
                              <option value="">Select a service...</option>
                              <option>Annual Financial Statements</option>
                              <option>Independent Audit & Review</option>
                              <option>Bookkeeping & Management Accounts</option>
                              <option>Tax Compliance</option>
                              <option>Company Secretarial</option>
                              <option>Business Advisory</option>
                              <option>Company Registration</option>
                              <option>VAT/PAYE Registration</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <button type="button" onClick={() => setStep(2)} className="w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors">
                            Continue →
                          </button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                          <h3 className="font-playfair text-white text-xl mb-8">Tell us about your business</h3>
                          <div className="mb-6">
                            <label htmlFor="structure" className={labelClass}>Business Structure</label>
                            <select
                              id="structure"
                              value={formData.structure}
                              onChange={e => setFormData(p => ({ ...p, structure: e.target.value }))}
                              className={selectClass}
                              required
                            >
                              <option value="">Select structure...</option>
                              <option>Sole Trader / Freelancer</option>
                              <option>Private Company (Pty) Ltd</option>
                              <option>Close Corporation</option>
                              <option>Trust</option>
                              <option>Non-Profit Organisation</option>
                              <option>Partnership</option>
                            </select>
                          </div>
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)} className="flex-1 h-12 border border-graphite text-white font-sans text-sm rounded-[1px] hover:border-white transition-colors">
                              ← Back
                            </button>
                            <button type="button" onClick={() => setStep(3)} className="flex-1 h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors">
                              Continue →
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                          <h3 className="font-playfair text-white text-xl mb-8">Describe your situation</h3>
                          <div className="mb-6">
                            <label htmlFor="details" className={labelClass}>Additional Information</label>
                            <textarea
                              id="details"
                              rows={5}
                              placeholder="Provide some information about your business and the assistance required..."
                              value={formData.details}
                              onChange={e => setFormData(p => ({ ...p, details: e.target.value }))}
                              className="w-full px-4 py-3 font-sans text-sm rounded-[1px] bg-ink border border-graphite text-white placeholder-faint focus:outline-none focus:border-white transition-colors resize-none"
                              required
                            />
                          </div>
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(2)} className="flex-1 h-12 border border-graphite text-white font-sans text-sm rounded-[1px] hover:border-white transition-colors">
                              ← Back
                            </button>
                            <button type="button" onClick={() => setStep(4)} className="flex-1 h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors">
                              Continue →
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                          <h3 className="font-playfair text-white text-xl mb-8">Your contact details</h3>
                          <div className="flex flex-col gap-5 mb-6">
                            <div>
                              <label htmlFor="name" className={labelClass}>Full Name</label>
                              <input id="name" type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className={inputClass} required />
                            </div>
                            <div>
                              <label htmlFor="email" className={labelClass}>Email Address</label>
                              <input id="email" type="email" placeholder="your@email.co.za" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className={inputClass} required />
                            </div>
                            <div>
                              <label htmlFor="phone" className={labelClass}>Contact Number</label>
                              <input id="phone" type="tel" placeholder="e.g. 063 304 1942" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className={inputClass} />
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(3)} className="flex-1 h-12 border border-graphite text-white font-sans text-sm rounded-[1px] hover:border-white transition-colors">
                              ← Back
                            </button>
                            <button type="submit" className="flex-1 h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors">
                              Submit →
                            </button>
                          </div>
                          <p className="font-mono text-[0.62rem] tracking-[0.08em] mt-4 text-center" style={{ color: 'var(--faint)' }}>
                            🔒 Information shared is protected under POPIA and professional confidentiality.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}
              </div>
            </FadeUp>

            {/* Office info */}
            <FadeUp delay={0.12}>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--faint)' }}>
                    Office
                  </p>
                  <div className="flex flex-col gap-6">
                    {[
                      { label: 'Location', value: `${tenant.address}, ${tenant.city}` },
                      { label: 'Hours', value: 'Monday – Friday: 08:30 – 17:00' },
                      { label: 'WhatsApp', value: tenant.phone ?? '', href: `https://wa.me/27${tenant.phone?.replace(/\D/g, '').slice(1)}` },
                      { label: 'Email', value: tenant.email ?? '', href: `mailto:${tenant.email}` },
                    ].map(item => (
                      <div key={item.label}>
                        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-1" style={{ color: 'var(--faint)' }}>
                          {item.label}
                        </p>
                        {item.href ? (
                          <a href={item.href} className="font-sans text-sm hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{item.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendly CTA */}
                <div
                  className="rounded-[1px] p-6"
                  style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
                >
                  <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--muted)' }}>
                    Prefer to schedule directly?
                  </p>
                  <p className="font-sans text-sm mb-5" style={{ color: 'var(--muted)' }}>
                    Book a free 30-minute consultation with Adrian via Calendly.
                  </p>
                  <a
                    href={tenant.calendly_url ?? '/contact'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors flex items-center justify-center"
                  >
                    Book via Calendly →
                  </a>
                </div>

                {/* FAQs */}
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--faint)' }}>
                    Frequently Asked Questions
                  </p>
                  <div className="flex flex-col gap-0" style={{ border: '1px solid var(--rule)' }}>
                    {faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group"
                        style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--rule)' : 'none' }}
                        open={openFaq === i}
                        onToggle={(e) => {
                          if ((e.target as HTMLDetailsElement).open) setOpenFaq(i)
                          else if (openFaq === i) setOpenFaq(null)
                        }}
                      >
                        <summary className="flex justify-between items-center gap-3 px-5 py-4 cursor-pointer list-none">
                          <span className="font-sans text-sm text-white">{faq.q}</span>
                          <span className="font-mono text-sm shrink-0" style={{ color: 'var(--muted)' }}>
                            {openFaq === i ? '−' : '+'}
                          </span>
                        </summary>
                        <div className="px-5 pb-4">
                          <p className="font-sans text-sm leading-[1.8]" style={{ color: 'var(--muted)' }}>{faq.a}</p>
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
