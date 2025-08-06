'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Home, Upload, CreditCard, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedButton } from '@/components/ui/animated-button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal
} from '@/components/ui/dialog'
import { Toaster, toast } from 'sonner'
import AuthModal from '@/components/auth-modal'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userPoints, setUserPoints] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState(null)

  // Load points from localStorage on component mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('userPoints')
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints))
    }
  }, [])

  // Check for saved authentication on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user')
    router.push('/dashboard')
    toast.success('Logged out successfully!')
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'contribute', label: 'Contribute', icon: Upload, path: '/contribute' },
    { id: 'credits', label: 'Credits', icon: CreditCard, path: '/credits' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ]

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white">PDF Library</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                pathname === item.path
                  ? 'text-gray-800'
                  : 'text-gray-600'
              }`} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Points</span>
          <Badge variant="secondary" className="bg-green-600 text-white">
            {userPoints}
          </Badge>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto bg-gray-900">
        {/* Auth Header */}
        <div className="flex items-center justify-end p-4 border-b border-gray-800">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img
                  src={user?.avatar || "/placeholder.svg"}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-blue-500 bg-gray-800"
                />
                <div className="absolute right-0 top-12 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <AnimatedButton
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </AnimatedButton>
          )}
        </div>

        {children}
      </main>

      {/* Auth Modal */}
      <AuthModal 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        setUser={setUser}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Toaster position="top-right" />
    </div>
  )
}
