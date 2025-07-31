import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NavBar from "./shared/NavBar"
import { ClerkProvider } from "@clerk/nextjs"
import GlobalBanner from "./shared/GlobalBanner"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Inhouse Tracker",
  description: "Tracking inhouse matches for Longhorn LoL",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NavBar />
          <div
            className="pointer-events-none fixed inset-x-0 top-0 -z-10
                      bg-[url(/champion-resources/regions/targon-gate.jpg)]
                      h-[80vh] bg-cover bg-center opacity-50
                      [mask-image:linear-gradient(to_bottom,black_20%,transparent)]
                      [webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
          />
          {children}

          <GlobalBanner />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
