import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/Header/Header"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    template: "%s | ABConvert",
    default: "Home page | ABConvert",
  },
  description: "Your personalized e-commerce platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto py-8 px-4">
              {children}
            </main>
            <Toaster />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
