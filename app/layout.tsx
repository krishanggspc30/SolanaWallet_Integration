import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProviderWrapper } from "./providers/wallet-provider"
import { ThemeProvider } from "./providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solana Token Manager",
  description: "A modern dApp for managing Solana tokens",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <WalletProviderWrapper>{children}</WalletProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'