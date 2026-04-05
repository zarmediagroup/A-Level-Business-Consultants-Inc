# A Level Business Consultants Inc — ZAR Media Platform

World-class South African accounting firm website with integrated client document portal.

## Stack
- **Next.js 15** App Router · TypeScript strict
- **Tailwind CSS** with custom design tokens
- **Framer Motion** animations
- **Supabase** (optional — white-label tenant config)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials (optional — falls back to `defaultTenant` from `types/tenant.ts`).

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Calculator, Services, Metrics, Timeline, Results, Testimonials |
| `/about` | About page with team and values |
| `/services` | Detailed service breakdown (6 services) |
| `/packages` | Pricing packages (Individual + Company) |
| `/contact` | Multi-step contact form + FAQ |
| `/login` | Client portal login |
| `/portal` | Dashboard with 6 widgets |
| `/portal/documents` | Document vault with upload drawer |
| `/portal/reports` | Financial reports with status badges |
| `/portal/deadlines` | Compliance calendar |
| `/portal/messages` | Message centre |

## Design System

- **Ink** (`#080808`) surfaces, **white** typography
- **IBM Plex Mono** for all numbers and codes
- **Playfair Display** for editorial headlines
- **DM Sans** for body and UI
- **Bebas Neue** for large stat numbers
- 1px radius on everything — razor-sharp

## Branding / White-label

Update `types/tenant.ts` `defaultTenant` for static config, or connect Supabase and call `getTenantByDomain()` from `lib/tenant.ts` in your server components.
