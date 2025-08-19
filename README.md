Hotel Booking — Next.js App

A responsive hotel booking demo built with Next.js (App Router), Tailwind, and a sprinkle of glassmorphism. It covers a full booking flow end-to-end: search → explore hotel → review → payment → success → trips history. No real payments (sorry, Visa), but the UX is realistic.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Features

Explore & Search

“Explore” page with search by location (calls mock API /api/hotels).

Result cards link to /hotel/[id] (hotel detail).

Hotel Detail

Photos, rating, room types.

Room type / dates / guests selection with a nice calendar (portal-based, cannot hide behind cards).

Review & Pricing

Shows check-in, check-out, guests, nights.

Pricing via API (/api/pricing) with discount = 0 and VAT 7%.

Guest details form with validation (zod + react-hook-form).

Payment

Payment methods list (UPI, Cards, Net Banking, PhonePay).

Pay Now CTA → /payment/done with confirmation.

Trips History

Every successful booking is saved to localStorage and shown in /trips (Upcoming / Past).

Powered by BookingsProvider.

Preferences

Language & currency toggles in Profile (persisted in localStorage).

i18n helper t() + <Money /> component for currency formatting.

Responsive UI

Tailwind v4 + custom tokens in globals.css.

Glass cards, light/dark card variants.

(Optional) Map Teaser

Leaflet map + clustering (compatible with React 19 when using the right versions).

Tech Stack

Next.js (App Router)

React 19

Tailwind CSS v4 (via @tailwindcss/postcss)

TypeScript

react-hook-form + zod (validation)

react-datepicker (portalized)

Lucide icons

Leaflet (optional; see notes for React 19 compatibility)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
