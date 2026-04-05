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

  const inputClass =
    'w-full h-12 px-4 font-sans text-sm rounded-[1px] bg-ink border border-graphite text-white placeholder-faint focus:outline-none focus:border-white transition-colors duration-200'
  const selectClass =
    'w-full h-12 px-4 font-sans text-sm rounded-[1px] bg-ink border border-graphite text-white focus:outline-none focus:border-white transition-colors duration-200 appearance-none cursor-pointer'
  const labelClass = 'font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted mb-1.5 block'

  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--obsidian)' }}
      aria-labelledby="calculator-heading"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-12 lg:gap-16 items-start">

          {/* Left */}
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--muted)' }}>
              Bookkeeping Health Check
            </p>
            <h2
              id="calculator-heading"
              className="font-playfair text-white mb-6"
              style={{ fontSize: '2.25rem', lineHeight: 1.15 }}
            >
              Is Your Bookkeeping Costing You Money?
            </h2>
            <p className="font-sans leading-[1.8] mb-8" style={{ color: 'var(--muted)', fontSize: '0.9375rem' }}>
              Most SMEs in South Africa spend 40% more on their annual audit than necessary
              due to disorganised records and missed reconciliations.
            </p>
            <div>
              <p
                className="font-bebas leading-none"
                style={{ fontSize: '5rem', color: 'var(--white)' }}
              >
                40%
              </p>
              <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase mt-1" style={{ color: 'var(--muted)' }}>
                average bookkeeping inefficiency
              </p>
            </div>
          </FadeUp>

          {/* Right — Calculator */}
          <FadeUp delay={0.12}>
            <div
              className="rounded-[1px] p-8"
              style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
            >
              <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-8" style={{ color: 'var(--muted)' }}>
                Estimate Your Accounting Costs
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="turnover" className={labelClass}>Annual Turnover (R)</label>
                  <input
                    id="turnover"
                    type="number"
                    placeholder="e.g. 2 500 000"
                    value={turnover}
                    onChange={e => setTurnover(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="employees" className={labelClass}>Number of Employees</label>
                  <input
                    id="employees"
                    type="number"
                    placeholder="e.g. 12"
                    value={employees}
                    onChange={e => setEmployees(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="transactions" className={labelClass}>Transactions per Month</label>
                  <select
                    id="transactions"
                    value={transactions}
                    onChange={e => setTransactions(e.target.value as TransactionKey)}
                    className={selectClass}
                  >
                    <option value="<50">&lt;50</option>
                    <option value="50–200">50–200</option>
                    <option value="200–500">200–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="software" className={labelClass}>Current Accounting Software</label>
                  <select
                    id="software"
                    value={software}
                    onChange={e => setSoftware(e.target.value as SoftwareKey)}
                    className={selectClass}
                  >
                    {(['None', 'Excel', 'Xero', 'Sage', 'QuickBooks', 'Other'] as SoftwareKey[]).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculate}
                className="w-full h-12 bg-white text-ink font-sans text-sm tracking-wide rounded-[1px] hover:bg-off-white transition-colors duration-200 mb-6"
              >
                Calculate
              </button>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-[1px] p-6"
                    style={{ border: '1px solid var(--rule)', backgroundColor: 'var(--ink)' }}
                  >
                    <div style={{ borderBottom: '1px solid var(--rule)' }} className="pb-4 mb-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                          Estimated annual accounting cost:
                        </span>
                        <span className="font-mono text-sm text-white">{fmt(result.cost)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                          With optimised bookkeeping:
                        </span>
                        <span className="font-mono text-sm" style={{ color: 'var(--profit)' }}>{fmt(result.optimised)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-sans text-sm text-white">Potential annual saving:</span>
                      <span className="font-bebas text-white" style={{ fontSize: '1.75rem' }}>
                        {fmt(result.saving)}
                      </span>
                    </div>
                    <p className="font-mono text-[0.65rem] tracking-[0.08em] mb-5" style={{ color: 'var(--faint)' }}>
                      Based on SAICA benchmarks for your turnover bracket and transaction volume.
                    </p>
                    <a
                      href={tenant.calendly_url ?? '/contact'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-3 border border-white text-white text-sm font-sans rounded-[1px] hover:bg-white hover:text-ink transition-all duration-200"
                    >
                      Book a Free Accounting Review →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
