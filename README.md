# 🏨 Hotel Booking App

A modern, responsive hotel booking platform built with **Next.js 13 App Router**, **Tailwind CSS**, and **TypeScript**. Users can explore destinations, search for hotels by location, choose room types, review prices with VAT, and complete bookings through a clean and interactive UI.

---

## ✨ Features

- 🌐 **Explore Page** – Showcases popular Thai destinations with images and flags.
- 🔍 **Hotel Search** – Search hotels by location (via mock JSON API).
- 🏨 **Hotel Detail Page** – View room types, availability, and "Book Now" options.
- 📅 **Booking Flow** – Input check-in/check-out dates and guest info using `react-datepicker`.
- 💸 **Pricing Calculator** – Auto-calculates price, applies 7% VAT, and displays cost breakdown.
- 💳 **Payment Page** – Includes card & QR payment mock form with live summary.
- ✅ **Booking Confirmation** – Confirmation page showing selected method and total cost.
- 🧳 **Trips Page** – Displays all previously booked trips using context providers.

---

## 🧪 Tech Stack

- [x] **Next.js 13+ (App Router)**
- [x] **TypeScript**
- [x] **Tailwind CSS**
- [x] **React Context API** (for booking & preference management)
- [x] **Leaflet & React-Leaflet** (interactive map for explore page)
- [x] **React Datepicker**
- [x] **Mocked JSON API** for hotel and pricing data

---

## 📁 Project Structure

src/
├── app/ # Pages & routing (App Router)
│ ├── page.tsx # Landing page
│ ├── explore/ # Hotel explore page
│ ├── payment/ # Payment & done pages
│ └── trips/ # Booked trips page
├── components/ # UI components
│ ├── home/ # Explore & Map components
│ ├── hotel/ # Hotel card/details
│ └── providers/ # Context providers
├── lib/ # Mock API logic
├── public/ # Assets (flags etc.)
└── styles/ # Global styles (Tailwind)


---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/rujisaranmalan/hotel-booking.git
cd hotel-booking

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Open in browser
http://localhost:3000

🙌 Author

Rujisaran Malan
Portfolio | GitHub
