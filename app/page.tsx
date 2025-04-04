"use client"

import { useState, useEffect } from "react"
import HeroSection from "./components/sections/hero-section"
import WalletInfo from "./components/sections/wallet-info"
import TokenCreation from "./components/sections/token-creation"
import TokenTransfer from "./components/sections/token-transfer"
import TransactionHistory from "./components/sections/transaction-history"
import { useWallet } from "@solana/wallet-adapter-react"
import { Toaster } from "./components/ui/toaster"

export default function Home() {
  const { connected } = useWallet()
  const [transactions, setTransactions] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only rendering wallet-dependent UI after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to add new transactions to history
  const addTransaction = (transaction: any) => {
    setTransactions((prev) => [transaction, ...prev].slice(0, 10))
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />

      <div className="container px-4 py-8 mx-auto max-w-6xl">
        {mounted && connected ? (
          <div className="grid gap-8 md:gap-10">
            <WalletInfo />

            <div className="grid gap-8 lg:grid-cols-2">
              <TokenCreation onSuccess={addTransaction} />
              <TokenTransfer onSuccess={addTransaction} />
            </div>

            <TransactionHistory transactions={transactions} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Please connect your Solana wallet to access token management features.
            </p>
          </div>
        )}
      </div>
      <Toaster />
    </main>
  )
}

