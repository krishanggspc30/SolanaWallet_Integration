"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function WalletInfo() {
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!publicKey || !connected) return

    const getBalance = async () => {
      try {
        setIsLoading(true)
        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com")
        const balance = await connection.getBalance(publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error("Error fetching balance:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getBalance()
    // Set up polling for balance updates
    const intervalId = setInterval(getBalance, 30000) // every 30 seconds

    return () => clearInterval(intervalId)
  }, [publicKey, connected])

  if (!mounted || !connected || !publicKey) return null

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
            <p className="font-mono text-sm truncate max-w-[280px] md:max-w-[400px]">{publicKey.toString()}</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center">
              <span className="text-xs font-bold">SOL</span>
            </div>

            {isLoading ? (
              <Skeleton className="h-7 w-20" />
            ) : (
              <div className="font-medium text-xl">{balance?.toFixed(4) || "0"}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

