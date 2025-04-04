"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  signature: string
  timestamp: string
  type: "create" | "mint" | "transfer"
  details: string
}

export default function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  // Function to format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Function to get badge color based on transaction type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "create":
        return "purple"
      case "mint":
        return "teal"
      case "transfer":
        return "blue"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl">Transaction History</CardTitle>
        <CardDescription>Your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No transactions yet. Create or transfer tokens to see your transaction history.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">Type</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">Details</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">Time</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium text-sm">Signature</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                    <td className="py-3 px-2">
                      <Badge variant={getBadgeVariant(tx.type) as any} className="capitalize">
                        {tx.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-sm">{tx.details}</td>
                    <td className="py-3 px-2 text-sm text-gray-400">{formatTime(tx.timestamp)}</td>
                    <td className="py-3 px-2 text-right">
                      <a
                        href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-teal-400 hover:text-teal-300 text-sm"
                      >
                        {tx.signature.substring(0, 4)}...{tx.signature.substring(tx.signature.length - 4)}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

