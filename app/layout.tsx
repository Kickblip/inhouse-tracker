import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "react-toastify"
import UserSearchBar from "@/components/UserSearchBar"
import { Analytics } from "@vercel/analytics/react"

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
  description: "Stat tracking for Longhorn LoL custom games",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased vsc-initialized`}>
        <Analytics />
        <ToastContainer />
        <div className="flex flex-col">
          <UserSearchBar />
          {children}
        </div>
      </body>
    </html>
  )
}
