import nodemailer from 'nodemailer'
import { defaultTenant } from '@/types/tenant'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   ?? 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM ?? `"${defaultTenant.firm_name}" <noreply@abcinc.co.za>`
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

function baseHtml(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${defaultTenant.firm_name}</title>
<style>
  body { margin:0; padding:0; background:#080808; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#ffffff; }
  .wrap { max-width:560px; margin:40px auto; background:#181818; border:1px solid rgba(255,255,255,0.08); border-radius:2px; overflow:hidden; }
  .header { padding:24px 32px; border-bottom:1px solid rgba(255,255,255,0.08); }
  .logo { font-family:monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#888; }
  .logo strong { color:#fff; }
  .body { padding:32px; }
  h2 { font-size:18px; font-weight:600; margin:0 0 16px; color:#fff; }
  p { font-size:14px; line-height:1.7; color:#888; margin:0 0 16px; }
  .btn { display:inline-block; padding:12px 24px; background:#ffffff; color:#080808; font-size:13px; font-weight:600; text-decoration:none; border-radius:2px; }
  .meta { font-family:monospace; font-size:11px; color:#404040; margin-top:8px; }
  .footer { padding:20px 32px; border-top:1px solid rgba(255,255,255,0.06); }
  .footer p { font-family:monospace; font-size:10px; letter-spacing:0.08em; color:#404040; margin:0; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo"><strong>ABC</strong> &nbsp;${defaultTenant.firm_name}</div>
  </div>
  <div class="body">${body}</div>
  <div class="footer"><p>POPIA Compliant · SAICA Registered · IRBA Approved</p></div>
</div>
</body>
</html>`
}

export async function sendInvitationEmail(opts: {
  clientEmail: string
  clientName: string
  inviteUrl: string
}) {
  await transporter.sendMail({
    from: FROM,
    to: opts.clientEmail,
    subject: `You have been invited to the ${defaultTenant.firm_name} portal`,
    html: baseHtml(`
      <h2>Welcome, ${opts.clientName}</h2>
      <p>Adrian Quina CA(SA) has invited you to access the ${defaultTenant.firm_name} client portal.</p>
      <p>Click the button below to verify your email and set your password. This link expires in 24 hours.</p>
      <br/>
      <a class="btn" href="${opts.inviteUrl}">Accept Invitation →</a>
      <p class="meta" style="margin-top:24px;">If you were not expecting this invitation, you can safely ignore this email.</p>
    `),
  })
}

export async function sendDocumentUploadAdminEmail(opts: {
  clientName: string
  clientEmail: string
  category: string
  year: number
  fileName: string
  documentId: string
}) {
  const link = `${APP_URL}/portal/admin/documents`
  await transporter.sendMail({
    from: FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New document uploaded — ${opts.clientName}`,
    html: baseHtml(`
      <h2>New Document Uploaded</h2>
      <p><strong style="color:#fff">${opts.clientName}</strong> (${opts.clientEmail}) has uploaded a new document.</p>
      <p class="meta">Category: ${opts.category} &nbsp;|&nbsp; Year: ${opts.year} &nbsp;|&nbsp; File: ${opts.fileName}</p>
      <br/>
      <a class="btn" href="${link}">View in Portal →</a>
    `),
  })
}

export async function sendUploadConfirmationEmail(opts: {
  clientEmail: string
  clientName: string
  category: string
  year: number
  fileName: string
}) {
  await transporter.sendMail({
    from: FROM,
    to: opts.clientEmail,
    subject: `Document received — ${defaultTenant.firm_name}`,
    html: baseHtml(`
      <h2>Document Received</h2>
      <p>Hi ${opts.clientName},</p>
      <p>We have received your document and it is now under review.</p>
      <p class="meta">File: ${opts.fileName} &nbsp;|&nbsp; Category: ${opts.category} &nbsp;|&nbsp; Year: ${opts.year}</p>
      <br/>
      <a class="btn" href="${APP_URL}/portal/documents">View Documents →</a>
    `),
  })
}

export async function sendDocumentStatusEmail(opts: {
  clientEmail: string
  clientName: string
  fileName: string
  status: string
  documentId: string
}) {
  const statusColors: Record<string, string> = {
    'Received':       '#888',
    'Under Review':   '#D97706',
    'Processed':      '#16A34A',
    'Requires Action':'#DC2626',
  }
  const color = statusColors[opts.status] ?? '#888'
  await transporter.sendMail({
    from: FROM,
    to: opts.clientEmail,
    subject: `Document status updated — ${opts.status}`,
    html: baseHtml(`
      <h2>Document Status Updated</h2>
      <p>Hi ${opts.clientName},</p>
      <p>The status of your document has been updated.</p>
      <p class="meta">File: ${opts.fileName}</p>
      <p><span style="color:${color};font-weight:600;font-family:monospace;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">${opts.status}</span></p>
      <br/>
      <a class="btn" href="${APP_URL}/portal/documents">View Documents →</a>
    `),
  })
}

export async function sendCommentNotificationEmail(opts: {
  clientEmail: string
  clientName: string
  fileName: string
  comment: string
  documentId: string
}) {
  await transporter.sendMail({
    from: FROM,
    to: opts.clientEmail,
    subject: 'Your accountant has left a comment on a document',
    html: baseHtml(`
      <h2>New Comment on Your Document</h2>
      <p>Hi ${opts.clientName},</p>
      <p>Adrian Quina CA(SA) has left a comment on <strong style="color:#fff">${opts.fileName}</strong>:</p>
      <blockquote style="border-left:2px solid rgba(255,255,255,0.2);margin:16px 0;padding:12px 16px;color:#ccc;font-style:italic;">
        "${opts.comment}"
      </blockquote>
      <p>Please log in to review and respond if action is required.</p>
      <br/>
      <a class="btn" href="${APP_URL}/portal/documents">View Document →</a>
    `),
  })
}

export async function sendResubmissionAdminEmail(opts: {
  clientName: string
  clientEmail: string
  fileName: string
  originalFileName: string
}) {
  await transporter.sendMail({
    from: FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `Document resubmitted — ${opts.clientName}`,
    html: baseHtml(`
      <h2>Document Resubmission</h2>
      <p><strong style="color:#fff">${opts.clientName}</strong> has resubmitted a corrected document.</p>
      <p class="meta">New file: ${opts.fileName} &nbsp;|&nbsp; Original: ${opts.originalFileName}</p>
      <br/>
      <a class="btn" href="${APP_URL}/portal/admin/documents">Review in Portal →</a>
    `),
  })
}
