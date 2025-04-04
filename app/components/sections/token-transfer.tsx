"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function TokenTransfer({ onSuccess }: { onSuccess: (tx: any) => void }) {
  const { publicKey, connected } = useWallet()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const [recipientAddress, setRecipientAddress] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock tokens for demo
  const mockTokens = [
    { symbol: "SOL", name: "Solana" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "MTK", name: "My Token" },
  ]

  const handleTransferTokens = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !connected) return

    try {
      setIsTransferring(true)

      // Validate recipient address (simplified)
      if (recipientAddress.length < 32) {
        throw new Error("Invalid recipient address")
      }

      // Simulate token transfer
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would transfer tokens using Solana web3.js
      const mockSignature = "Tx" + Math.random().toString(36).substring(2, 10)

      toast({
        title: "Transfer Successful",
        description: `${transferAmount} ${selectedToken} has been sent to the recipient.`,
        variant: "default",
      })

      // Add to transaction history
      onSuccess({
        signature: mockSignature,
        timestamp: new Date().toISOString(),
        type: "transfer",
        details: `Sent ${transferAmount} ${selectedToken} to ${recipientAddress.substring(0, 4)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
      })

      // Reset form
      setRecipientAddress("")
      setTransferAmount("")
    } catch (error: any) {
      console.error("Error transferring tokens:", error)
      toast({
        title: "Transfer Failed",
        description: error.message || "There was an error transferring your tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTransferring(false)
    }
  }

  if (!mounted) return null

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-teal-400">Token Transfer</CardTitle>
        <CardDescription>Send tokens to another wallet address</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTransferTokens} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipientAddress">Recipient Address</Label>
            <Input
              id="recipientAddress"
              placeholder="Enter recipient wallet address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              required
              className="bg-gray-900/50 border-gray-700 focus:border-teal-500 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tokenSelect">Select Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken} required>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 focus:border-teal-500">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {mockTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.name} ({token.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transferAmount">Amount</Label>
            <Input
              id="transferAmount"
              type="number"
              placeholder="Enter amount to transfer"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              required
              min="0.000001"
              step="0.000001"
              className="bg-gray-900/50 border-gray-700 focus:border-teal-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isTransferring || !selectedToken || !connected}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:opacity-90 transition-all"
          >
            {isTransferring ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Tokens...
              </>
            ) : (
              "Send Tokens"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

