import type { Metadata } from 'next'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'
import { PartnersSection } from '@/components/about/PartnersSection'
import { AboutTestimonials } from '@/components/about/AboutTestimonials'
import { defaultTenant } from '@/types/tenant'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'ABC INC — professional accounting and advisory in South Africa. Led by Adrian Quina CA(SA), supporting individuals and SMEs with clarity, compliance, and long-term partnership.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    images: [
      {
        url: '/images/team/adrian-quina-ca-sa-founder.png',
        width: 800,
        height: 800,
        alt: 'Adrian Quina CA(SA), founder of ABC INC — chartered accountant',
      },
    ],
  },
}

const credentials = ['SAICA', 'IRBA', 'CIPC', 'POPIA']

export default function AboutPage() {
  const tenant = defaultTenant

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
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
              >
                About Us
              </span>
            </div>
            <h1
              className="font-bebas mb-8"
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                lineHeight: 1.0,
                color: 'var(--white)',
                letterSpacing: '0.02em',
              }}
            >
              Clarity &amp; confidence in{' '}
              <span style={{ color: 'var(--accent)' }}>every figure</span>
            </h1>
          </FadeUp>

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
                  We are a professional accounting and advisory practice operating in South Africa, focused on helping
                  clients navigate their financial responsibilities with clarity and confidence. Our services span
                  accounting, tax, and strategic advice, supporting both individuals and small to medium-sized
                  businesses across diverse sectors. More than just service providers, we position ourselves as long-term
                  partners—invested in your journey and committed to the sustainable growth of your business.
                </p>
                <p className="font-sans leading-[1.9] text-base font-medium mb-10" style={{ color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--white)' }}>{tenant.firm_name}</strong> is led by Adrian Quina, a registered
                  Chartered Accountant with a strong passion for empowering South Africa&apos;s SME sector. He provides
                  hands-on, tailored solutions to ambitious business owners, equipping them with the financial insights,
                  mentorship, and compliance support they need to grow and succeed.
                </p>
                <a
                  href={tenant.calendly_url ?? 'https://calendly.com/adrian-abcinc/30min'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-primary inline-flex items-center justify-center h-12 px-7 font-sans text-sm"
                >
                  Schedule a consultation →
                </a>
              </div>

              <div
                className="flex flex-col justify-center p-8"
                style={{
                  backgroundColor: 'var(--accent)',
                  border: '2px solid #0A0A08',
                  boxShadow: 'var(--neo-shadow-lg)',
                }}
              >
                <div className="font-bebas leading-none mb-4 select-none" style={{ fontSize: '4rem', color: 'var(--accent-fg)' }} aria-hidden>
                  &ldquo;
                </div>
                <p className="font-sans font-bold leading-[1.7] mb-6" style={{ fontSize: '1.0625rem', color: 'var(--accent-fg)' }}>
                  We sign our names to your financials. That means we stand behind every figure.
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase font-bold" style={{ color: 'var(--accent-fg-muted)' }}>
                  Adrian Quina CA(SA) · Founder
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
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
              >
                Leadership
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
                <div className="relative w-full aspect-square overflow-hidden">
                  {tenant.principal_image_url ? (
                    <Image
                      src={tenant.principal_image_url}
                      alt="Adrian Quina CA(SA), founder of ABC INC — professional portrait, chartered accountant in Cape Town"
                      fill
                      className="object-cover object-[center_20%]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : null}
                </div>
                <div className="p-5" style={{ borderTop: '2px solid var(--white)' }}>
                  <p className="font-sans font-bold" style={{ color: 'var(--white)' }}>
                    Adrian Quina
                  </p>
                  <p className="font-mono text-[0.65rem] tracking-[0.1em] font-medium mt-1" style={{ color: 'var(--muted)' }}>
                    CA(SA) · SAICA Registered · Founder
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <h2
                className="font-bebas mb-6"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--white)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.05,
                }}
              >
                Work directly with your CA(SA)
              </h2>
              <p className="font-sans leading-[1.9] mb-8 font-medium" style={{ color: 'var(--muted)' }}>
                Book a consultation to discuss tax, compliance, bookkeeping or strategic advice — tailored to your
                business stage.
              </p>
              <p className="font-mono text-[0.7rem] tracking-[0.06em] font-bold mb-6" style={{ color: 'var(--white)' }}>
                Schedule a consultation
              </p>
              <a
                href={tenant.calendly_url ?? 'https://calendly.com/adrian-abcinc/30min'}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary inline-flex items-center justify-center h-12 px-7 font-sans text-sm"
              >
                Book via Calendly →
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      <PartnersSection />
      <AboutTestimonials />

      <Footer />
    </>
  )
}
