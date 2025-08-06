'use client'

import React, { useState, useEffect } from 'react'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import Layout from '@/components/layout'

export default function CreditsPage() {
  const [userPoints, setUserPoints] = useState(0)

  // Load points from localStorage on component mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('userPoints')
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints))
    }
  }, [])

  // Save points to localStorage whenever points change
  useEffect(() => {
    localStorage.setItem('userPoints', userPoints.toString())
  }, [userPoints])

  const handleBuyPoints = () => {
    setUserPoints(prev => prev + 20)
    toast.success('Successfully purchased 20 points for ₹10!')
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-semibold text-white mb-2">Your Credits</h2>
            <p className="text-gray-400">Manage your download credits</p>
          </div>

          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">{userPoints}</div>
              <p className="text-gray-400">Available Points</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-white">Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Per download</span>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">5 points</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Per upload</span>
                  <Badge variant="outline" className="bg-green-900 text-green-400 border-green-700">+10 points</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <Button onClick={handleBuyPoints} className="w-full bg-blue-600 hover:bg-blue-700">
                  Buy 20 Points for ₹10
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
