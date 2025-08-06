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
    <div className="premium-sidebar">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <div className="logo-text">PDF Library</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            <button
              onClick={() => router.push(item.path)}
              className="nav-link"
            >
              <div className="nav-icon">
                <item.icon className="w-5 h-5" />
              </div>
              <span>{item.label}</span>
            </button>
          </div>
        ))}
      </nav>

      {/* Points Section - Made Smaller */}
      <div className="points-section-small">
        <div className="points-card-small">
          <div className="points-label-small">Points</div>
          <div className="points-value-small">
            <div className="points-number-small">{userPoints}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .premium-sidebar {
          width: 280px;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
          overflow: hidden;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          background: rgba(124, 58, 237, 0.05);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          border: 1px solid rgba(124, 58, 237, 0.1);
        }

        .floating-element:nth-child(1) {
          width: 60px;
          height: 60px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-element:nth-child(2) {
          width: 40px;
          height: 40px;
          top: 60%;
          left: 80%;
          animation-delay: 2s;
        }

        .floating-element:nth-child(3) {
          width: 30px;
          height: 30px;
          top: 80%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }

        .sidebar-header {
          padding: 32px 24px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          z-index: 2;
        }

        .sidebar-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.02), transparent);
          pointer-events: none;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #7c3aed, #3b82f6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
          position: relative;
          overflow: hidden;
        }

        .logo-icon::before {
          content: '📚';
          font-size: 18px;
          position: relative;
          z-index: 2;
        }

        .logo-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .logo-text {
          color: #e2e8f0;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 24px 0;
          z-index: 2;
          position: relative;
        }

        .nav-item {
          position: relative;
          margin: 4px 16px;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item:hover {
          transform: translateX(4px);
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          color: rgba(226, 232, 240, 0.7);
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          background: none;
          border: none;
          width: 100%;
          cursor: pointer;
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(59, 130, 246, 0.1));
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(124, 58, 237, 0.3);
        }

        .nav-item.active .nav-link {
          color: #e2e8f0;
          font-weight: 600;
        }

        .nav-item:not(.active):hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .nav-item:not(.active):hover .nav-link {
          color: #e2e8f0;
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .nav-item:hover .nav-icon {
          transform: scale(1.1);
        }

        /* Smaller Points Section */
        .points-section-small {
          padding: 16px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          background: rgba(0, 0, 0, 0.2);
          z-index: 2;
        }

        .points-card-small {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.6));
          border-radius: 12px;
          padding: 12px 16px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .points-card-small::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(124, 58, 237, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .points-card-small:hover::before {
          opacity: 1;
        }

        .points-label-small {
          color: rgba(148, 163, 184, 0.8);
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .points-value-small {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .points-number-small {
          color: #10b981;
          font-size: 20px;
          font-weight: 700;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .premium-sidebar {
            width: 100%;
          }
          
          .sidebar-header {
            padding: 24px 20px 20px;
          }
          
          .logo-text {
            font-size: 20px;
          }
        }
      `}</style>
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
