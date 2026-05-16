# Luxor Balloons - Hot Air Balloon Booking Platform

A luxury hot air balloon booking platform for Luxor, Egypt. Built with Next.js 14, Supabase, and Tailwind CSS.

## Features

### Website
- **Bilingual Support**: Full Arabic & English with RTL support
- **Hero Section**: Cinematic parallax with animated search/booking bar
- **Booking Flow**: 4-step wizard (Date → Passengers → Package → Payment)
- **Pricing**: Standard ($79), Premium ($129), Private Charter ($299+)
- **Operators**: Company cards with logos, ratings, and pricing
- **Weather Widget**: Real-time flight conditions
- **Reviews**: Testimonials with star ratings
- **Photo Gallery**: Lightbox with desert/balloon imagery
- **Trust & Safety**: Licensed operators, insurance, expert pilots
- **Map Integration**: Luxor launch sites
- **WhatsApp Chat**: Floating button for instant booking
- **Blog**: SEO content hub

### Admin Dashboard
- **KPI Cards**: Revenue, bookings, operators, ratings
- **Revenue Charts**: Visual analytics
- **Bookings Management**: Status control, passenger manifests
- **Operators Management**: CRUD with logo upload
- **Flights Management**: Calendar view, capacity control
- **Payments**: Paymob integration, revenue breakdown
- **Users & Reviews**: Full management
- **Settings**: Min price validation ($79 minimum)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **State**: Zustand / React Context
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Google Maps (placeholder)
- **Payments**: Paymob (Egypt)
- **i18n**: Custom implementation with next-intl patterns

## Color Palette (Desert/Balloon Inspired)

| Token | Hex | Usage |
|-------|-----|-------|
| Desert Gold | #C8860A | Primary, buttons, accents |
| Balloon Red | #C0392B | Premium package, alerts |
| Balloon Green | #1E8449 | Success, private package |
| Sky Blue | #2E86C1 | Info, backgrounds |
| Sand Beige | #F5CBA7 | Cards, soft backgrounds |
| Dark Base | #1A1A2E | Navbar, footer, admin |

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd luxor-balloons
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+201234567890
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
PAYMOB_API_KEY=your-paymob-api-key
PAYMOB_INTEGRATION_ID=your-integration-id
```

### 3. Database Setup
1. Create a new Supabase project
2. Go to SQL Editor
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. Enable Auth (Email provider)
5. Set up Storage bucket for operator logos

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── [locale]/
│   │   ├── (main)/          # Public website pages
│   │   │   ├── page.tsx     # Home (Hero, Packages, etc.)
│   │   │   ├── about/
│   │   │   ├── operators/
│   │   │   ├── flights/
│   │   │   ├── booking/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   └── admin/           # Admin dashboard
│   │       ├── page.tsx     # Dashboard
│   │       ├── bookings/
│   │       ├── operators/
│   │       ├── flights/
│   │       ├── payments/
│   │       ├── users/
│   │       ├── reviews/
│   │       └── settings/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── sections/            # Page sections (Hero, etc.)
│   ├── admin/               # Admin-specific components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── whatsapp-button.tsx
│   └── providers.tsx
├── lib/
│   ├── utils.ts
│   ├── supabase.ts
│   └── i18n.ts
├── hooks/
│   ├── use-toast.ts
│   └── use-auth.ts
├── types/
│   └── index.ts
├── messages/
│   ├── en.json
│   └── ar.json
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── public/
│   └── images/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .env.example
```

## Pricing Rules

- **Absolute Minimum**: $79 per person per flight
- **Standard**: $79 (1 hour, shared, 8-12 people)
- **Premium**: $129 (1 hour, smaller basket, champagne breakfast)
- **Private Charter**: $299+ (entire balloon, any group size)
- Admin cannot set flight price below $79 — validation error enforced

## Authentication

- **Tourist**: Can book flights, write reviews
- **Operator**: Can manage own flights and bookings
- **Admin**: Full system access

Default admin credentials (for development):
- Email: admin@loxurballoons.com
- Password: Admin123456

## License

MIT License - Luxor Balloons Team
