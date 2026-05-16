import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Luxor Balloons - Soar Above Egypt's Ancient Wonders",
  description: "Book luxury hot air balloon rides over Luxor, Egypt. Experience breathtaking sunrise flights over ancient temples and the Nile River.",
  keywords: "hot air balloon, Luxor, Egypt, sunrise flight, Nile, temples, booking",
  openGraph: {
    title: "Luxor Balloons - Soar Above Egypt's Ancient Wonders",
    description: "Book luxury hot air balloon rides over Luxor, Egypt",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
