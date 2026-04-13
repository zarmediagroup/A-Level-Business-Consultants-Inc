'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'
import { defaultTenant } from '@/types/tenant'

type TransactionKey = '<50' | '50–200' | '200–500' | '500+'
type SoftwareKey = 'None' | 'Excel' | 'Xero' | 'Sage' | 'QuickBooks' | 'Other'

const baseRates: Record<TransactionKey, number> = {
  '<50': 18000, '50–200': 36000, '200–500': 72000, '500+': 144000,
}
const softwarePenalty: Record<SoftwareKey, number> = {
  None: 1.55, Excel: 1.35, Xero: 1.0, Sage: 1.05, QuickBooks: 1.08, Other: 1.2,
}

function fmt(n: number) {
  return `R ${n.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}`
}

export function Calculator() {
  const tenant = defaultTenant
  const [turnover, setTurnover] = useState('')
  const [employees, setEmployees] = useState('')
  const [transactions, setTransactions] = useState<TransactionKey>('<50')
  const [software, setSoftware] = useState<SoftwareKey>('Excel')
  const [result, setResult] = useState<{ cost: number; optimised: number; saving: number } | null>(null)

  const calculate = () => {
    const emp = parseInt(employees) || 0
    const cost = Math.round(
      baseRates[transactions] * softwarePenalty[software] * (1 + emp * 0.012)
    )
    setResult({ cost, optimised: Math.round(cost * 0.62), saving: Math.round(cost * 0.38) })
  }

  const fieldStyle = {
    border: '2px solid var(--white)',
    backgroundColor: 'var(--ink)',
    color: 'var(--white)',
    height: '48px',
    padding: '0 1rem',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: '0.875rem',
    fontWeight: '600',
    width: '100%',
    appearance: 'none' as const,
    outline: 'none',
  }

  const labelStyle = {
    fontFamily: 'var(--font-ibm-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    fontWeight: '700',
    color: 'var(--white)',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--obsidian)', borderTop: '2px solid var(--white)', borderBottom: '2px solid var(--white)' }}
      aria-labelledby="calculator-heading"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-12 lg:gap-16 items-start">

          {/* Left */}
          <FadeUp>
            <div
              className="inline-flex items-center mb-6"
            >
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-fg)',
                  border: '2px solid #0A0A08',
                }}
              >
                Bookkeeping Health Check
              </span>
            </div>
            <h2
              id="calculator-heading"
              className="font-bebas mb-5"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.05,
                color: 'var(--white)',
                letterSpacing: '0.02em',
              }}
            >
              Is Your Bookkeeping Costing You Money?
            </h2>
            <p className="font-sans leading-[1.7] mb-8 font-medium" style={{ color: 'var(--muted)', fontSize: '0.9375rem' }}>
              Disorganised records and missed reconciliations often increase professional time and compliance risk.
              The calculator below gives an illustrative cost comparison from your inputs — not a quote or assurance.
            </p>
          </FadeUp>

          {/* Right — Calculator */}
          <FadeUp delay={0.12}>
            <div
              style={{
                backgroundColor: 'var(--carbon)',
                border: '2px solid var(--white)',
                boxShadow: 'var(--neo-shadow)',
              }}
            >
              {/* Header */}
              <div
                className="px-8 py-4"
                style={{
                  borderBottom: '2px solid var(--white)',
                  backgroundColor: 'var(--graphite)',
                }}
              >
                <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold" style={{ color: 'var(--accent-fg)' }}>
                  Estimate Your Accounting Costs
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="turnover" style={labelStyle}>Annual Turnover (R)</label>
                    <input
                      id="turnover"
                      type="number"
                      placeholder="e.g. 2 500 000"
                      value={turnover}
                      onChange={e => setTurnover(e.target.value)}
                      style={fieldStyle}
                      onFocus={e => (e.currentTarget.style.boxShadow = 'var(--neo-shadow-sm)')}
                      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                    />
                  </div>
                  <div>
                    <label htmlFor="employees" style={labelStyle}>Number of Employees</label>
                    <input
                      id="employees"
                      type="number"
                      placeholder="e.g. 12"
                      value={employees}
                      onChange={e => setEmployees(e.target.value)}
                      style={fieldStyle}
                      onFocus={e => (e.currentTarget.style.boxShadow = 'var(--neo-shadow-sm)')}
                      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                    />
                  </div>
                  <div>
                    <label htmlFor="transactions" style={labelStyle}>Transactions per Month</label>
                    <select
                      id="transactions"
                      value={transactions}
                      onChange={e => setTransactions(e.target.value as TransactionKey)}
                      style={fieldStyle}
                    >
                      <option value="<50">&lt;50</option>
                      <option value="50–200">50–200</option>
                      <option value="200–500">200–500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="software" style={labelStyle}>Current Accounting Software</label>
                    <select
                      id="software"
                      value={software}
                      onChange={e => setSoftware(e.target.value as SoftwareKey)}
                      style={fieldStyle}
                    >
                      {(['None', 'Excel', 'Xero', 'Sage', 'QuickBooks', 'Other'] as SoftwareKey[]).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculate}
                  className="w-full h-12 neo-btn-primary font-sans text-sm mb-6"
                >
                  Calculate →
                </button>

                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        border: '2px solid var(--white)',
                        backgroundColor: 'var(--ink)',
                        boxShadow: 'var(--neo-shadow-sm)',
                      }}
                    >
                      <div
                        className="p-5 flex flex-col gap-3"
                        style={{ borderBottom: '2px solid var(--rule-mid)' }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                            Estimated annual cost:
                          </span>
                          <span className="font-mono text-sm font-bold" style={{ color: 'var(--white)' }}>
                            {fmt(result.cost)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                            With optimised bookkeeping:
                          </span>
                          <span className="font-mono text-sm font-bold" style={{ color: 'var(--profit)' }}>
                            {fmt(result.optimised)}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-sans text-sm font-bold" style={{ color: 'var(--white)' }}>
                            Potential annual saving:
                          </span>
                          <span
                            className="font-bebas"
                            style={{ fontSize: '1.75rem', color: 'var(--accent)' }}
                          >
                            {fmt(result.saving)}
                          </span>
                        </div>
                        <p className="font-mono text-[0.6rem] tracking-[0.08em] mb-5 font-medium" style={{ color: 'var(--faint)' }}>
                          Illustrative estimate from your inputs — not a binding quote or professional assurance.
                        </p>
                        <a
                          href={tenant.calendly_url ?? '/contact'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center w-full py-3 font-sans font-bold text-sm neo-btn-primary"
                        >
                          Book a Free Accounting Review →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
