import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

export const metadata: Metadata = {
  title: "AI-Workshop",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
