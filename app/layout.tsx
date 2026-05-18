import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: "Repair Service",
  description: "Сервис поиска и бронирования услуг по ремонту техники",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="bg-[#f7f7f5] text-zinc-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}