'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { UploadZone } from '@/components/portal/UploadZone'

type Category = 'All' | 'AFS' | 'Management Accounts' | 'SARS Returns' | 'Bank Statements' | 'Payroll'

const categories: Category[] = ['All', 'AFS', 'Management Accounts', 'SARS Returns', 'Bank Statements', 'Payroll']

const documents = [
  { name: 'Annual Financial Statements 2024.pdf',   category: 'AFS',                 uploadedBy: 'Adrian Quina CA(SA)', period: 'FY 2024', date: '2025-01-22' },
  { name: 'Annual Financial Statements 2023.pdf',   category: 'AFS',                 uploadedBy: 'Adrian Quina CA(SA)', period: 'FY 2023', date: '2024-02-10' },
  { name: 'Management Accounts Dec 2024.pdf',       category: 'Management Accounts', uploadedBy: 'Adrian Quina CA(SA)', period: 'Dec 2024', date: '2025-01-10' },
  { name: 'Management Accounts Nov 2024.pdf',       category: 'Management Accounts', uploadedBy: 'Adrian Quina CA(SA)', period: 'Nov 2024', date: '2024-12-08' },
  { name: 'VAT201 February 2025.pdf',               category: 'SARS Returns',        uploadedBy: 'Adrian Quina CA(SA)', period: 'Feb 2025', date: '2025-02-01' },
  { name: 'VAT201 January 2025.pdf',                category: 'SARS Returns',        uploadedBy: 'Adrian Quina CA(SA)', period: 'Jan 2025', date: '2025-01-05' },
  { name: 'SARS Assessment 2024.pdf',               category: 'SARS Returns',        uploadedBy: 'SARS',                period: 'FY 2024', date: '2024-12-18' },
  { name: 'Bank Statement Dec 2024.pdf',            category: 'Bank Statements',     uploadedBy: 'Demo Client',         period: 'Dec 2024', date: '2025-01-03' },
  { name: 'Bank Statement Nov 2024.pdf',            category: 'Bank Statements',     uploadedBy: 'Demo Client',         period: 'Nov 2024', date: '2024-12-02' },
  { name: 'Payroll Summary Q4 2024.pdf',            category: 'Payroll',             uploadedBy: 'Adrian Quina CA(SA)', period: 'Q4 2024', date: '2024-12-15' },
  { name: 'Payroll Summary Q3 2024.pdf',            category: 'Payroll',             uploadedBy: 'Adrian Quina CA(SA)', period: 'Q3 2024', date: '2024-09-15' },
]

const PAGE_SIZE = 8

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = documents.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <DashboardWidget
        label="Document Vault"
        action={
          <button
            onClick={() => setDrawerOpen(true)}
            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
            style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          >
            Upload +
          </button>
        }
      >
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1) }}
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-[1px] transition-all duration-200"
              style={{
                borderColor: activeCategory === cat ? 'var(--white)' : 'var(--rule-mid)',
                color: activeCategory === cat ? 'var(--white)' : 'var(--muted)',
                backgroundColor: activeCategory === cat ? 'var(--ash)' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-5">
          <input
            type="search"
            placeholder="Search documents..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full h-10 px-4 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white placeholder-faint focus:outline-none focus:border-white transition-colors"
            style={{ fontFamily: 'var(--font-ibm-mono)' }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                {['Name', 'Category', 'Uploaded By', 'Period', 'Date', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase"
                    style={{ color: 'var(--faint)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((doc, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: '1px solid var(--rule)' }}
                  className="group"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>📄</span>
                      <span className="font-sans text-sm text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]"
                      style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                    >
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{doc.uploadedBy}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="font-mono text-[0.75rem]" style={{ color: 'var(--muted)' }}>{doc.period}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>{doc.date}</span>
                  </td>
                  <td className="py-3">
                    <button
                      className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                      style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                    >
                      ↓ Download
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
            <p className="font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>
              {filtered.length} documents
            </p>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 font-mono text-[0.75rem] border rounded-[1px] transition-all"
                  style={{
                    borderColor: p === page ? 'var(--white)' : 'var(--rule-mid)',
                    color: p === page ? 'var(--white)' : 'var(--muted)',
                    backgroundColor: p === page ? 'var(--ash)' : 'transparent',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </DashboardWidget>

      {/* Upload Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{
                width: 'min(440px, 100vw)',
                backgroundColor: 'var(--carbon)',
                borderLeft: '1px solid var(--rule)',
              }}
            >
              <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid var(--rule)' }}>
                <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                  Upload Documents
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="font-mono text-lg text-white hover:text-muted transition-colors"
                  aria-label="Close drawer"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <UploadZone />
                <div className="mt-8">
                  <button
                    className="w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
