import { DashboardWidget } from '@/components/portal/DashboardWidget'

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <DashboardWidget label="Account Settings">
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-5" style={{ color: 'var(--faint)' }}>
              Profile
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name',     value: 'Demo Client',                    id: 'name' },
                { label: 'Email',         value: 'demo@alevelconsultants.co.za',   id: 'email' },
                { label: 'Phone',         value: '+27 63 304 1942',                id: 'phone' },
                { label: 'Company',       value: 'Demo Company (Pty) Ltd',         id: 'company' },
              ].map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type="text"
                    defaultValue={field.value}
                    className="w-full h-12 px-4 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '2rem' }}>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-5" style={{ color: 'var(--faint)' }}>
              Notifications
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Email notifications for new documents',
                'Deadline reminders (14 days before)',
                'Deadline reminders (7 days before)',
                'Messages from your accountant',
              ].map(pref => (
                <label key={pref} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-white w-4 h-4" />
                  <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{pref}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <button className="h-12 px-8 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors">
              Save Changes
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '2rem' }}>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--faint)' }}>
              Security
            </p>
            <p className="font-mono text-[0.65rem] tracking-[0.08em]" style={{ color: 'var(--faint)' }}>
              🔒 256-bit encrypted · POPIA compliant · SAICA professional standards
            </p>
          </div>
        </div>
      </DashboardWidget>
    </div>
  )
}
