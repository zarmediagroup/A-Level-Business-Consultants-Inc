'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { DocumentRow } from '@/components/portal/DocumentRow'
import { UploadZone } from '@/components/portal/UploadZone'

const financialRows = [
  { label: 'Annual Turnover',     value: 'R 4,820,000', color: 'var(--off-white)' },
  { label: 'Deductible Expenses', value: 'R 1,640,000', color: 'var(--off-white)' },
  { label: 'Tax Provision',       value: 'R   861,300', color: 'var(--pending)' },
  { label: 'SARS Liability',      value: 'R    68,500', color: 'var(--loss)' },
  { label: 'Audit Status',        value: 'CLEAN AUDIT', color: 'var(--profit)' },
]

const deadlines = [
  { icon: '⚠', date: '28 Feb', desc: 'Provisional Tax 2nd Payment',    status: 'DUE SOON',  statusColor: 'var(--pending)' },
  { icon: '✓', date: '31 Jan', desc: 'VAT201 Return Filed',             status: 'COMPLETE',  statusColor: 'var(--profit)' },
  { icon: '○', date: '31 Mar', desc: 'Annual Financial Statements Due', status: 'UPCOMING',  statusColor: 'var(--muted)' },
  { icon: '○', date: '30 Apr', desc: 'ITR14 Filing Due',                status: 'UPCOMING',  statusColor: 'var(--muted)' },
  { icon: '○', date: '31 May', desc: 'EMP501 Reconciliation',           status: 'UPCOMING',  statusColor: 'var(--muted)' },
]

const documents = [
  { name: 'Annual Financial Statements 2024.pdf', date: '2025-01-22' },
  { name: 'Management Accounts Dec 2024.pdf',     date: '2025-01-10' },
  { name: 'VAT201 February 2025.pdf',             date: '2025-02-01' },
  { name: 'SARS Assessment 2024.pdf',             date: '2024-12-18' },
  { name: 'Payroll Summary Q4 2024.pdf',          date: '2024-12-15' },
]

const messages = [
  { monogram: 'AQ', sender: 'Adrian Quina CA(SA)', preview: 'Your Q4 management accounts are ready for review...', time: '10:24', unread: true },
  { monogram: 'AQ', sender: 'Adrian Quina CA(SA)', preview: 'Reminder: EMP501 reconciliation due 31 May...', time: 'Yesterday', unread: true },
  { monogram: 'SY', sender: 'SARS eFiling',        preview: 'Your VAT201 return has been assessed successfully...', time: '2 Feb', unread: false },
]

const scoreMetrics = [
  { label: 'Bank Reconciliation',   pct: 92 },
  { label: 'Invoice Capture',       pct: 94 },
  { label: 'VAT Compliance',        pct: 88 },
  { label: 'PAYE Submissions',      pct: 82 },
  { label: 'Document Organisation', pct: 74 },
]

function ScoreBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
        <span className="font-mono text-[0.75rem]" style={{ color: 'var(--muted)' }}>{pct}%</span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${width}%`, transition: `width 0.8s ease ${delay}ms` }}
        />
      </div>
    </div>
  )
}

export default function PortalDashboard() {
  const widgetVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  }

  return (
    <div className="grid grid-cols-12 gap-5">

      {/* Financial Summary */}
      <motion.div custom={0} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="2025 Financial Overview">
          <div className="flex flex-col gap-0">
            {financialRows.map((row, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3"
                style={{ borderBottom: i < financialRows.length - 1 ? '1px solid var(--rule)' : 'none' }}
              >
                <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{row.label}</span>
                <span className="font-mono text-sm font-medium" style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--muted)' }}>
                Tax Payment Progress
              </span>
              <span className="font-mono text-[0.65rem]" style={{ color: 'var(--muted)' }}>72%</span>
            </div>
            <div className="score-bar-track">
              <div className="score-bar-fill" style={{ width: '72%' }} />
            </div>
          </div>
          <button className="w-full h-10 mt-5 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors">
            Settle Outstanding Amount →
          </button>
        </DashboardWidget>
      </motion.div>

      {/* Compliance Calendar */}
      <motion.div custom={1} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Upcoming Deadlines">
          <div className="flex flex-col gap-0">
            {deadlines.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: i < deadlines.length - 1 ? '1px solid var(--rule)' : 'none' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm w-4 shrink-0" style={{ color: d.statusColor }}>{d.icon}</span>
                  <div>
                    <p className="font-sans text-sm text-white">{d.desc}</p>
                    <p className="font-mono text-[0.65rem]" style={{ color: 'var(--faint)' }}>{d.date} 2025</p>
                  </div>
                </div>
                <span
                  className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5 border rounded-[1px] shrink-0 ml-2"
                  style={{ borderColor: d.statusColor, color: d.statusColor }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </motion.div>

      {/* Document Vault */}
      <motion.div custom={2} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget
          label="Recent Documents"
          action={
            <Link
              href="/portal/documents"
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
              style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
            >
              Upload +
            </Link>
          }
        >
          <div>
            {documents.map(doc => (
              <DocumentRow key={doc.name} name={doc.name} date={doc.date} />
            ))}
          </div>
          <Link
            href="/portal/documents"
            className="block mt-4 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors hover:text-white"
            style={{ color: 'var(--muted)' }}
          >
            View All Documents →
          </Link>
        </DashboardWidget>
      </motion.div>

      {/* Upload Zone */}
      <motion.div custom={3} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Upload Documents">
          <UploadZone />
        </DashboardWidget>
      </motion.div>

      {/* Messages */}
      <motion.div custom={4} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Messages">
          <div className="flex flex-col gap-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 -mx-6 px-6 rounded-[1px]"
                style={{
                  borderLeft: msg.unread ? '2px solid var(--white)' : '2px solid transparent',
                  backgroundColor: msg.unread ? 'var(--ash)' : 'transparent',
                  borderBottom: i < messages.length - 1 ? '1px solid var(--rule)' : 'none',
                  marginBottom: i < messages.length - 1 ? 0 : 0,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[0.65rem] border shrink-0 mt-0.5"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  {msg.monogram}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-sans text-sm font-semibold text-white truncate">{msg.sender}</p>
                    <p className="font-mono text-[0.6rem] shrink-0 ml-2" style={{ color: 'var(--faint)' }}>{msg.time}</p>
                  </div>
                  <p className="font-sans text-[0.8rem] truncate" style={{ color: 'var(--muted)' }}>{msg.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </motion.div>

      {/* Bookkeeping Health Score */}
      <motion.div custom={5} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Bookkeeping Health Score">
          <div className="flex items-center gap-6 mb-8">
            <div>
              <p className="font-bebas text-white" style={{ fontSize: '4rem', lineHeight: 1 }}>
                87 / 100
              </p>
              <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase" style={{ color: 'var(--profit)' }}>
                Good Standing
              </p>
            </div>
            <div
              className="w-px self-stretch"
              style={{ backgroundColor: 'var(--rule)' }}
            />
            <div>
              <p className="font-sans text-sm mb-1" style={{ color: 'var(--muted)' }}>Overall score based on 5 key metrics</p>
              <p className="font-mono text-[0.65rem]" style={{ color: 'var(--faint)' }}>Updated monthly by your accountant</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {scoreMetrics.map((m, i) => (
              <ScoreBar key={m.label} label={m.label} pct={m.pct} delay={i * 100} />
            ))}
          </div>
          <p className="font-mono text-[0.65rem] mt-6" style={{ color: 'var(--faint)' }}>
            Last updated by Adrian Quina CA(SA) · 3 Feb 2025
          </p>
        </DashboardWidget>
      </motion.div>

    </div>
  )
}
