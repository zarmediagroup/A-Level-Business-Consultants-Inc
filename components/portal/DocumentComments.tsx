'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { DocumentComment } from '@/types/database'

interface Props {
  documentId:   string
  documentName: string
  onResubmit?:  () => void
}

export function DocumentComments({ documentId, onResubmit }: Props) {
  const { isAdmin, profile } = useAuth()
  const [comments, setComments] = useState<DocumentComment[]>([])
  const [loading,  setLoading]  = useState(true)
  const [input,    setInput]    = useState('')
  const [posting,  setPosting]  = useState(false)
  const [error,    setError]    = useState('')

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/documents/${documentId}/comments`)
    if (res.ok) setComments(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [documentId])

  async function handlePost(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setPosting(true); setError('')
    const res = await fetch(`/api/documents/${documentId}/comments`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ content: input.trim() }),
    })
    setPosting(false)
    if (!res.ok) { const j = await res.json(); setError(j.error); return }
    setInput(''); load()
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Thread */}
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        {loading ? (
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : comments.length === 0 ? (
          <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>
            {isAdmin ? 'No comments yet. Post one below to notify the client.' : 'No comments from your accountant yet.'}
          </p>
        ) : (
          comments.map(comment => {
            const isAuthor   = comment.author_id === profile?.id
            const authorRole = (comment.author as unknown as { role?: string } | undefined)?.role
            const isAdminMsg = authorRole === 'admin'
            return (
              <div
                key={comment.id}
                className="rounded-[1px] p-4"
                style={{
                  backgroundColor: isAdminMsg ? 'var(--ash)'  : 'var(--ink)',
                  border:          '1px solid var(--rule)',
                  borderLeft:      isAdminMsg ? '2px solid var(--white)' : '1px solid var(--rule)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-white">
                    {(comment.author as unknown as { full_name?: string } | undefined)?.full_name ?? 'Unknown'}
                    {isAdminMsg && <span className="ml-2" style={{ color: 'var(--faint)' }}>· Accountant</span>}
                  </span>
                  <span className="font-mono text-[0.6rem]" style={{ color: 'var(--faint)' }}>
                    {new Date(comment.created_at).toLocaleString('en-ZA', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="font-sans text-sm" style={{ color: 'var(--off-white)' }}>{comment.content}</p>
              </div>
            )
          })
        )}
      </div>

      {/* Input — admin always, client only to view (they can resubmit) */}
      {isAdmin && (
        <form onSubmit={handlePost} className="flex flex-col gap-3 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Post a comment or request a correction…"
            rows={4}
            className="w-full px-4 py-3 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white resize-none focus:outline-none focus:border-white transition-colors"
          />
          {error && <p className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{error}</p>}
          <button
            type="submit"
            disabled={posting || !input.trim()}
            className="h-11 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60"
          >
            {posting ? 'Posting…' : 'Post Comment & Notify Client'}
          </button>
        </form>
      )}

      {/* Client: show resubmit CTA if there are admin comments */}
      {!isAdmin && comments.some(c => (c.author as unknown as { role?: string } | undefined)?.role === 'admin') && onResubmit && (
        <div className="pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
          <p className="font-sans text-sm mb-3" style={{ color: 'var(--muted)' }}>
            Your accountant has requested changes. Upload a corrected document.
          </p>
          <button
            onClick={onResubmit}
            className="w-full h-11 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors"
          >
            Upload Corrected Document →
          </button>
        </div>
      )}
    </div>
  )
}
