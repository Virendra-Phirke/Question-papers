'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface AuthModalProps {
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  setUser: (user: any) => void
  setIsAuthenticated: (auth: boolean) => void
}

export default function AuthModal({ 
  showAuthModal, 
  setShowAuthModal, 
  setUser, 
  setIsAuthenticated 
}: AuthModalProps) {
  const [authMode, setAuthMode] = useState('signin')
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (authMode === 'signup') {
      const newUser = {
        id: Date.now(),
        name: authForm.name,
        email: authForm.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authForm.name)}&background=3b82f6&color=fff`
      }
      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(newUser))
      toast.success('Account created successfully!')
    } else {
      const existingUser = {
        id: 1,
        name: authForm.email.split('@')[0],
        email: authForm.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authForm.email.split('@')[0])}&background=3b82f6&color=fff`
      }
      setUser(existingUser)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(existingUser))
      toast.success('Signed in successfully!')
    }
    
    setShowAuthModal(false)
    setAuthForm({ email: '', password: '', name: '' })
  }

  const handleGoogleAuth = () => {
    const googleUser = {
      id: Date.now(),
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=ea4335&color=fff'
    }
    setUser(googleUser)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(googleUser))
    setShowAuthModal(false)
    toast.success('Signed in with Google successfully!')
  }

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="max-w-sm sm:max-w-md p-0 bg-transparent border-none overflow-hidden">
        <div className="relative bg-gradient-to-br from-red-950/20 via-red-900/30 to-black/40 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-red-500/20 shadow-2xl">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-3 h-3 sm:w-5 sm:h-5 bg-red-500/20 rounded-full animate-pulse"></div>
            <div className="absolute top-[60%] right-[15%] w-2 h-2 sm:w-4 sm:h-4 bg-red-400/30 rounded-full animate-bounce"></div>
            <div className="absolute bottom-[20%] left-[20%] w-2 h-2 sm:w-3 sm:h-3 bg-red-600/25 rounded-full animate-pulse delay-1000"></div>
          </div>

          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent"></div>

          <div className="relative z-10 p-6 sm:p-8">
            {/* Logo Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="relative inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg shadow-red-500/40 overflow-hidden">
                <span className="relative text-white text-lg sm:text-2xl font-bold">P</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent mb-2">
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed px-2">
                {authMode === 'signin' 
                  ? 'Sign in to continue your premium experience'
                  : 'Join our premium platform'
                }
              </p>
            </div>

            {/* Google Sign In Button */}
            <div className="mb-6">
              <button
                onClick={handleGoogleAuth}
                className="group relative w-full bg-gray-900/50 border-2 border-gray-700 hover:border-red-500/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 font-semibold text-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 overflow-hidden text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center my-4 sm:my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <span className="px-3 sm:px-4 text-gray-400 text-xs sm:text-sm font-medium bg-transparent">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={authForm.name}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-900/30 border border-gray-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-3 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
            
            {/* Toggle Auth Mode */}
            <div className="text-center mt-4 sm:mt-6">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {authMode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700/50">
              <p className="text-xs text-gray-500 px-2">
                By continuing, you agree to our{' '}
                <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Terms</a>
                {' '}and{' '}
                <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Privacy</a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
