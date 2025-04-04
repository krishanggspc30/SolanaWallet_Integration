"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { connected, connecting, publicKey } = useWallet()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only rendering wallet UI after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-purple-900/50 to-teal-900/50">
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
          Solana Token Manager
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create, mint, and transfer Solana tokens with a seamless user experience
        </p>

        <div className="flex justify-center">
          {mounted && (
            <div className="wallet-adapter-button-container">
              <WalletMultiButton
                className={`
                !bg-gradient-to-r !from-purple-500 !to-teal-500 !rounded-lg !py-3 !px-6 !text-white
                !font-medium !transition-all hover:!shadow-lg hover:!opacity-90
                ${connected ? "!from-teal-500 !to-teal-600" : ""}
                ${connecting ? "!opacity-70" : ""}
              `}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

