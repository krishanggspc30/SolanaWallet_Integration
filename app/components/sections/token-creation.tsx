"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function TokenCreation({ onSuccess }: { onSuccess: (tx: any) => void }) {
  const { publicKey, connected } = useWallet()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenDecimals, setTokenDecimals] = useState("9")
  const [mintAmount, setMintAmount] = useState("")

  const [isCreating, setIsCreating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [tokenMint, setTokenMint] = useState<string | null>(null)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !connected) return

    try {
      setIsCreating(true)

      // Simulate token creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would create the token using Solana web3.js
      const mockTokenMint = "TokenMint" + Math.random().toString(36).substring(2, 10)
      setTokenMint(mockTokenMint)

      toast({
        title: "Token Created Successfully",
        description: `Your token ${tokenName} (${tokenSymbol}) has been created.`,
        variant: "default",
      })

      // Add to transaction history
      onSuccess({
        signature: mockTokenMint,
        timestamp: new Date().toISOString(),
        type: "create",
        details: `Created ${tokenName} (${tokenSymbol})`,
      })
    } catch (error) {
      console.error("Error creating token:", error)
      toast({
        title: "Error Creating Token",
        description: "There was an error creating your token. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleMintTokens = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !connected || !tokenMint) return

    try {
      setIsMinting(true)

      // Simulate token minting
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would mint tokens using Solana web3.js
      const mockSignature = "Tx" + Math.random().toString(36).substring(2, 10)

      toast({
        title: "Tokens Minted Successfully",
        description: `${mintAmount} ${tokenSymbol} tokens have been minted to your wallet.`,
        variant: "default",
      })

      // Add to transaction history
      onSuccess({
        signature: mockSignature,
        timestamp: new Date().toISOString(),
        type: "mint",
        details: `Minted ${mintAmount} ${tokenSymbol}`,
      })

      setMintAmount("")
    } catch (error) {
      console.error("Error minting tokens:", error)
      toast({
        title: "Error Minting Tokens",
        description: "There was an error minting your tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMinting(false)
    }
  }

  if (!mounted) return null

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-purple-400">Token Creation & Minting</CardTitle>
        <CardDescription>Create a new token and mint tokens to your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        {!tokenMint ? (
          <form onSubmit={handleCreateToken} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tokenName">Token Name</Label>
              <Input
                id="tokenName"
                placeholder="e.g., My Token"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-700 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenSymbol">Token Symbol</Label>
              <Input
                id="tokenSymbol"
                placeholder="e.g., MTK"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-700 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenDecimals">Decimals</Label>
              <Input
                id="tokenDecimals"
                type="number"
                placeholder="9"
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(e.target.value)}
                required
                min="0"
                max="9"
                className="bg-gray-900/50 border-gray-700 focus:border-purple-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isCreating || !connected}
              className="w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:opacity-90 transition-all"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Token...
                </>
              ) : (
                "Create Token"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleMintTokens} className="space-y-4">
            <div className="p-3 bg-gray-900/50 rounded-lg mb-2">
              <p className="text-sm text-gray-400">Token Created</p>
              <p className="font-medium">
                {tokenName} ({tokenSymbol})
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mintAmount">Mint Amount</Label>
              <Input
                id="mintAmount"
                type="number"
                placeholder="e.g., 1000"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                required
                min="1"
                className="bg-gray-900/50 border-gray-700 focus:border-teal-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isMinting || !connected}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:opacity-90 transition-all"
            >
              {isMinting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting Tokens...
                </>
              ) : (
                "Mint Tokens"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

