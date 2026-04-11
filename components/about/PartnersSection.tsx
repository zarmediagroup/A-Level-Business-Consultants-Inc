import Image from 'next/image'

const partners = [
  {
    src: '/images/partners/xero-cloud-accounting-software-logo.png',
    alt: 'Xero cloud accounting software — partner of ABC Inc South Africa',
  },
  {
    src: '/images/partners/simplepay-payroll-software-logo.png',
    alt: 'SimplePay payroll software — ABC Inc accounting partner',
  },
  {
    src: '/images/partners/saica-south-africa-chartered-accountants-logo.png',
    alt: 'SAICA — The South African Institute of Chartered Accountants — ABC Inc',
  },
]

export function PartnersSection() {
  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)', borderBottom: '2px solid var(--white)' }}>
      <div className="container-main">
        <div className="text-center mb-12">
          <span
            className="inline-block font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5 mb-6"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
          >
            Our Partners
          </span>
          <h2
            className="font-bebas"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', letterSpacing: '0.02em' }}
          >
            Technology &amp; professional bodies we work with
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">
          {partners.map(p => (
            <div
              key={p.src}
              className="flex items-center justify-center w-full px-6 py-8"
              style={{
                backgroundColor: 'var(--carbon)',
                border: '2px solid var(--white)',
                boxShadow: 'var(--neo-shadow-sm)',
                minHeight: '120px',
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={200}
                height={80}
                className="object-contain max-h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
