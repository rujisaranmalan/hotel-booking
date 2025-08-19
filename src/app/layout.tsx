// src/app/layout.tsx
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { PreferencesProvider } from "@/components/providers/PreferencesProvider";
import { BookingsProvider } from "@/components/providers/BookingsProvider";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";

export const metadata = { title: "Hotel Booking", description: "Explore & book" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-purple-canvas text-white">
        <PreferencesProvider>
          <BookingsProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1">
                <div className="max-w-7xl mx-auto p-4 sm:p-6">{children}</div>
              </main>
            </div>
          </BookingsProvider>
        </PreferencesProvider>

        {/* react-datepicker portal target */}
        <div id="dp-portal" />
      </body>
    </html>
  );
}
