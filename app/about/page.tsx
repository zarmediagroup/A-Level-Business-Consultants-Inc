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
        style={{ backgroundColor: 'var(--ink)', borderBottom: '1px solid var(--rule)' }}
      >
        <div className="container-main">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
              About Us
            </p>
            <h1
              className="font-playfair text-white mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.08 }}
            >
              Numbers Built on Trust
            </h1>
          </FadeUp>

          {/* Credentials bar */}
          <FadeUp delay={0.12}>
            <div className="flex flex-wrap gap-3 mb-16">
              {credentials.map(c => (
                <span
                  key={c}
                  className="font-mono text-[0.65rem] tracking-[0.14em] uppercase px-3 py-1.5 border rounded-[1px]"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="font-sans leading-[1.9] text-base mb-6" style={{ color: 'var(--muted)' }}>
                  We are a professional accounting and advisory practice operating in South Africa,
                  focused on helping clients navigate their financial responsibilities with clarity
                  and confidence. Our services span accounting, tax, and strategic advice, supporting
                  both individuals and small to medium-sized businesses across diverse sectors.
                </p>
                <p className="font-sans leading-[1.9] text-base" style={{ color: 'var(--muted)' }}>
                  More than just service providers, we position ourselves as long-term partners
                  — invested in your journey and committed to the sustainable growth of your business.
                </p>
              </div>

              {/* Quote */}
              <div
                className="rounded-[1px] p-8 flex flex-col justify-center"
                style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
              >
                <p
                  className="font-playfair italic leading-[1.7] mb-6"
                  style={{ fontSize: '1.1875rem', color: 'var(--off-white)' }}
                >
                  &ldquo;We sign our names to your financials. That means we stand behind every figure.&rdquo;
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase" style={{ color: 'var(--faint)' }}>
                  Adrian Quina CA(SA) · Founder & Principal Accountant
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Principal */}
      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)' }}>
        <div className="container-main">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-12" style={{ color: 'var(--muted)' }}>
              Our Principal
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 items-start">
            <FadeUp>
              <div
                className="rounded-[1px] overflow-hidden"
                style={{ border: '1px solid var(--rule)', backgroundColor: 'var(--carbon)' }}
              >
                {/* Placeholder portrait */}
                <div
                  className="w-full flex items-center justify-center font-mono text-[0.65rem] tracking-[0.14em] uppercase"
                  style={{ height: '320px', color: 'var(--faint)' }}
                >
                  <div className="text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center font-bebas text-3xl text-white border mx-auto mb-4"
                      style={{ borderColor: 'var(--rule-mid)', backgroundColor: 'var(--graphite)' }}
                    >
                      AQ
                    </div>
                    <p style={{ color: 'var(--muted)' }}>Portrait</p>
                  </div>
                </div>
                <div className="p-6" style={{ borderTop: '1px solid var(--rule)' }}>
                  <p className="font-sans font-semibold text-white mb-1">Adrian Quina</p>
                  <p className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
                    CA(SA) · SAICA Registered · Founder
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <h2 className="font-playfair text-white text-3xl mb-6">
                A Leader Built for South Africa&apos;s SME Sector
              </h2>
              <p className="font-sans leading-[1.9] mb-6" style={{ color: 'var(--muted)' }}>
                A Level Business Consultants Inc is led by Adrian Quina, a registered Chartered
                Accountant with a strong passion for empowering South Africa&apos;s SME sector. He
                provides hands-on, tailored solutions to ambitious business owners, equipping them
                with the financial insights, mentorship, and compliance support they need to grow
                and succeed.
              </p>
              <p className="font-sans leading-[1.9]" style={{ color: 'var(--muted)' }}>
                With deep expertise in tax, audit, bookkeeping and company secretarial matters,
                Adrian brings big-firm rigour to small-business accessibility — ensuring every
                client receives the same level of attention and precision regardless of their size.
              </p>
              <div className="mt-8">
                <a
                  href="https://calendly.com/adrian-abcinc/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-7 bg-white text-ink font-sans text-sm tracking-wide rounded-[2px] hover:bg-off-white transition-colors duration-200"
                >
                  Schedule a Consultation
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
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-12" style={{ color: 'var(--muted)' }}>
              Our Values
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ border: '1px solid var(--rule)' }}>
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="p-8 h-full" style={{ backgroundColor: 'var(--carbon)' }}>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
                    0{i + 1}
                  </p>
                  <h3 className="font-playfair text-white text-2xl mb-4">{v.title}</h3>
                  <p className="font-sans text-sm leading-[1.8]" style={{ color: 'var(--muted)' }}>{v.body}</p>
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
