import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'A Level Business Consultants Inc — SAICA-registered chartered accountants led by Adrian Quina CA(SA), supporting South African SMEs with precision and integrity.',
}

const credentials = ['SAICA', 'IRBA', 'CIPC', 'CIMA', 'SAIT']

const values = [
  {
    title: 'Accuracy',
    body: 'Every figure is verified. Every return is reviewed. We sign our names to your financials — that means we stand behind every number.',
  },
  {
    title: 'Independence',
    body: 'Our professional judgement is never compromised. We provide objective, unbiased counsel regardless of commercial pressure.',
  },
  {
    title: 'Accountability',
    body: 'We take ownership of your compliance calendar. Deadlines are never missed. Issues are escalated immediately.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-40 pb-24"
        style={{ backgroundColor: 'var(--ink)', borderBottom: '2px solid var(--white)' }}
      >
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-6">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: '#0A0A08', border: '2px solid #0A0A08' }}
              >
                About Us
              </span>
            </div>
            <h1
              className="font-bebas mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.0, color: 'var(--white)', letterSpacing: '0.02em' }}
            >
              Numbers Built on{' '}
              <span style={{ color: 'var(--accent)' }}>Trust</span>
            </h1>
          </FadeUp>

          {/* Credentials bar */}
          <FadeUp delay={0.12}>
            <div className="flex flex-wrap gap-2 mb-16">
              {credentials.map(c => (
                <span
                  key={c}
                  className="font-mono text-[0.65rem] tracking-[0.14em] uppercase px-3 py-1.5 font-bold"
                  style={{ border: '2px solid var(--white)', color: 'var(--white)', backgroundColor: 'var(--carbon)' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="font-sans leading-[1.9] text-base mb-6 font-medium" style={{ color: 'var(--muted)' }}>
                  We are a professional accounting and advisory practice operating in South Africa,
                  focused on helping clients navigate their financial responsibilities with clarity
                  and confidence. Our services span accounting, tax, and strategic advice, supporting
                  both individuals and small to medium-sized businesses across diverse sectors.
                </p>
                <p className="font-sans leading-[1.9] text-base font-medium" style={{ color: 'var(--muted)' }}>
                  More than just service providers, we position ourselves as long-term partners
                  — invested in your journey and committed to the sustainable growth of your business.
                </p>
              </div>

              {/* Quote */}
              <div
                className="flex flex-col justify-center p-8"
                style={{
                  backgroundColor: 'var(--accent)',
                  border: '2px solid #0A0A08',
                  boxShadow: 'var(--neo-shadow-lg)',
                }}
              >
                <div
                  className="font-bebas leading-none mb-4 select-none"
                  style={{ fontSize: '4rem', color: '#0A0A08' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <p
                  className="font-sans font-bold leading-[1.7] mb-6"
                  style={{ fontSize: '1.0625rem', color: '#0A0A08' }}
                >
                  We sign our names to your financials. That means we stand behind every figure.
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase font-bold" style={{ color: '#3A3A30' }}>
                  Adrian Quina CA(SA) · Founder & Principal Accountant
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Principal */}
      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)', borderBottom: '2px solid var(--white)' }}>
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-12">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: '#0A0A08', border: '2px solid #0A0A08' }}
              >
                Our Principal
              </span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 items-start">
            <FadeUp>
              <div
                style={{
                  border: '2px solid var(--white)',
                  backgroundColor: 'var(--carbon)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                {/* Portrait placeholder */}
                <div
                  className="w-full flex items-center justify-center font-mono text-[0.65rem] tracking-[0.14em] uppercase"
                  style={{ height: '320px', color: 'var(--faint)' }}
                >
                  <div className="text-center">
                    <div
                      className="w-20 h-20 flex items-center justify-center font-bebas text-3xl mx-auto mb-4"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: '#0A0A08',
                        border: '2px solid #0A0A08',
                      }}
                    >
                      AQ
                    </div>
                    <p style={{ color: 'var(--muted)' }}>Portrait</p>
                  </div>
                </div>
                <div className="p-5" style={{ borderTop: '2px solid var(--white)' }}>
                  <p className="font-sans font-bold" style={{ color: 'var(--white)' }}>Adrian Quina</p>
                  <p className="font-mono text-[0.65rem] tracking-[0.1em] font-medium mt-1" style={{ color: 'var(--muted)' }}>
                    CA(SA) · SAICA Registered · Founder
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <h2
                className="font-bebas mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', letterSpacing: '0.02em', lineHeight: 1.05 }}
              >
                A Leader Built for South Africa&apos;s SME Sector
              </h2>
              <p className="font-sans leading-[1.9] mb-6 font-medium" style={{ color: 'var(--muted)' }}>
                A Level Business Consultants Inc is led by Adrian Quina, a registered Chartered
                Accountant with a strong passion for empowering South Africa&apos;s SME sector. He
                provides hands-on, tailored solutions to ambitious business owners, equipping them
                with the financial insights, mentorship, and compliance support they need to grow
                and succeed.
              </p>
              <p className="font-sans leading-[1.9] font-medium" style={{ color: 'var(--muted)' }}>
                With deep expertise in tax, audit, bookkeeping and company secretarial matters,
                Adrian brings big-firm rigour to small-business accessibility — ensuring every
                client receives the same level of attention and precision regardless of their size.
              </p>
              <div className="mt-8">
                <a
                  href="https://calendly.com/adrian-abcinc/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-primary inline-flex items-center justify-center h-12 px-7 font-sans text-sm"
                >
                  Schedule a Consultation →
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-12">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: '#0A0A08', border: '2px solid #0A0A08' }}
              >
                Our Values
              </span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div
                  className="p-8 h-full service-card"
                  style={{ backgroundColor: 'var(--carbon)' }}
                >
                  <div
                    className="inline-flex items-center justify-center font-mono text-[0.65rem] font-bold mb-6 px-2 py-1"
                    style={{ backgroundColor: 'var(--accent)', color: '#0A0A08', border: '2px solid #0A0A08' }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    className="font-bebas mb-4"
                    style={{ fontSize: '1.75rem', color: 'var(--white)', letterSpacing: '0.04em' }}
                  >
                    {v.title}
                  </h3>
                  <p className="font-sans text-sm leading-[1.8] font-medium" style={{ color: 'var(--muted)' }}>
                    {v.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
