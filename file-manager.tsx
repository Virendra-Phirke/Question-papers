'use client'

import React, { useState, useEffect } from 'react'
import { Home, FileText, Upload, CreditCard, Settings, Folder, Download, X, Grid3X3, List, Search, Plus, ChevronRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast, Toaster } from 'sonner'

// Enhanced mock data with nested structure
const mockFileSystem = {
  '/': {
    folders: [
      { id: 1, name: 'Documents', itemCount: 25, path: '/Documents' },
      { id: 2, name: 'Research Papers', itemCount: 18, path: '/Research Papers' },
      { id: 3, name: 'Presentations', itemCount: 12, path: '/Presentations' },
      { id: 4, name: 'Archive', itemCount: 45, path: '/Archive' },
      { id: 5, name: 'Personal', itemCount: 8, path: '/Personal' },
      { id: 6, name: 'Work Projects', itemCount: 32, path: '/Work Projects' }
    ],
    files: [
      { id: 1, name: 'Quick Reference.pdf', size: '1.2 MB', modified: '1 day ago' },
      { id: 2, name: 'Getting Started Guide.pdf', size: '3.4 MB', modified: '3 days ago' },
      { id: 3, name: 'System Overview.pdf', size: '2.1 MB', modified: '1 week ago' }
    ]
  },
  '/Documents': {
    folders: [
      { id: 7, name: 'Contracts', itemCount: 8, path: '/Documents/Contracts' },
      { id: 8, name: 'Reports', itemCount: 12, path: '/Documents/Reports' },
      { id: 9, name: 'Templates', itemCount: 5, path: '/Documents/Templates' }
    ],
    files: [
      { id: 4, name: 'Annual Report 2024.pdf', size: '2.4 MB', modified: '2 days ago' },
      { id: 5, name: 'Project Proposal.pdf', size: '1.8 MB', modified: '1 week ago' },
      { id: 6, name: 'Meeting Notes.pdf', size: '856 KB', modified: '3 days ago' },
      { id: 7, name: 'Budget Analysis.pdf', size: '3.2 MB', modified: '5 days ago' }
    ]
  },
  '/Documents/Contracts': {
    folders: [
      { id: 10, name: '2024', itemCount: 4, path: '/Documents/Contracts/2024' },
      { id: 11, name: '2023', itemCount: 3, path: '/Documents/Contracts/2023' }
    ],
    files: [
      { id: 8, name: 'Service Agreement.pdf', size: '1.5 MB', modified: '1 week ago' },
      { id: 9, name: 'NDA Template.pdf', size: '892 KB', modified: '2 weeks ago' }
    ]
  },
  '/Documents/Contracts/2024': {
    folders: [],
    files: [
      { id: 10, name: 'Q1 Contract.pdf', size: '2.1 MB', modified: '2 months ago' },
      { id: 11, name: 'Q2 Contract.pdf', size: '1.9 MB', modified: '1 month ago' },
      { id: 12, name: 'Vendor Agreement.pdf', size: '1.3 MB', modified: '3 weeks ago' },
      { id: 13, name: 'Partnership Deal.pdf', size: '2.8 MB', modified: '1 week ago' }
    ]
  },
  '/Documents/Reports': {
    folders: [
      { id: 12, name: 'Monthly', itemCount: 6, path: '/Documents/Reports/Monthly' },
      { id: 13, name: 'Quarterly', itemCount: 4, path: '/Documents/Reports/Quarterly' }
    ],
    files: [
      { id: 14, name: 'Performance Review.pdf', size: '3.1 MB', modified: '1 week ago' },
      { id: 15, name: 'Market Analysis.pdf', size: '4.2 MB', modified: '2 weeks ago' }
    ]
  },
  '/Research Papers': {
    folders: [
      { id: 14, name: 'AI & Machine Learning', itemCount: 8, path: '/Research Papers/AI & Machine Learning' },
      { id: 15, name: 'Data Science', itemCount: 6, path: '/Research Papers/Data Science' },
      { id: 16, name: 'Computer Vision', itemCount: 4, path: '/Research Papers/Computer Vision' }
    ],
    files: [
      { id: 16, name: 'Deep Learning Fundamentals.pdf', size: '5.2 MB', modified: '1 week ago' },
      { id: 17, name: 'Neural Networks Overview.pdf', size: '3.8 MB', modified: '2 weeks ago' },
      { id: 18, name: 'Research Methodology.pdf', size: '2.1 MB', modified: '3 weeks ago' }
    ]
  },
  '/Research Papers/AI & Machine Learning': {
    folders: [],
    files: [
      { id: 19, name: 'Transformer Architecture.pdf', size: '4.1 MB', modified: '1 week ago' },
      { id: 20, name: 'GPT Models Explained.pdf', size: '3.5 MB', modified: '2 weeks ago' },
      { id: 21, name: 'Attention Mechanisms.pdf', size: '2.8 MB', modified: '3 weeks ago' },
      { id: 22, name: 'BERT and Beyond.pdf', size: '3.2 MB', modified: '1 month ago' },
      { id: 23, name: 'Computer Vision with CNNs.pdf', size: '4.8 MB', modified: '1 month ago' }
    ]
  },
  '/Presentations': {
    folders: [
      { id: 17, name: 'Client Meetings', itemCount: 5, path: '/Presentations/Client Meetings' },
      { id: 18, name: 'Team Updates', itemCount: 7, path: '/Presentations/Team Updates' }
    ],
    files: [
      { id: 24, name: 'Company Overview.pdf', size: '8.1 MB', modified: '3 days ago' },
      { id: 25, name: 'Product Demo.pdf', size: '12.3 MB', modified: '1 week ago' },
      { id: 26, name: 'Sales Pitch.pdf', size: '6.7 MB', modified: '2 weeks ago' }
    ]
  },
  '/Archive': {
    folders: [
      { id: 19, name: '2023', itemCount: 15, path: '/Archive/2023' },
      { id: 20, name: '2022', itemCount: 18, path: '/Archive/2022' },
      { id: 21, name: '2021', itemCount: 12, path: '/Archive/2021' }
    ],
    files: [
      { id: 27, name: 'Legacy System Docs.pdf', size: '15.2 MB', modified: '6 months ago' },
      { id: 28, name: 'Old Contracts.pdf', size: '8.9 MB', modified: '8 months ago' }
    ]
  },
  '/Personal': {
    folders: [
      { id: 22, name: 'Certificates', itemCount: 3, path: '/Personal/Certificates' },
      { id: 23, name: 'Travel', itemCount: 5, path: '/Personal/Travel' }
    ],
    files: [
      { id: 29, name: 'Resume.pdf', size: '1.1 MB', modified: '1 month ago' },
      { id: 30, name: 'Portfolio.pdf', size: '8.5 MB', modified: '2 months ago' }
    ]
  },
  '/Work Projects': {
    folders: [
      { id: 24, name: 'Project Alpha', itemCount: 8, path: '/Work Projects/Project Alpha' },
      { id: 25, name: 'Project Beta', itemCount: 12, path: '/Work Projects/Project Beta' },
      { id: 26, name: 'Project Gamma', itemCount: 6, path: '/Work Projects/Project Gamma' }
    ],
    files: [
      { id: 31, name: 'Project Guidelines.pdf', size: '2.3 MB', modified: '1 week ago' },
      { id: 32, name: 'Team Structure.pdf', size: '1.8 MB', modified: '2 weeks ago' }
    ]
  }
}

export default function FileManager() {
  const [activeView, setActiveView] = useState('home')
  const [currentPath, setCurrentPath] = useState('/')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [uploadCode, setUploadCode] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [userPoints, setUserPoints] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'signup'
  const [user, setUser] = useState(null)
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  })

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

  // Check for saved authentication on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  // Get current folder data
  const getCurrentFolderData = () => {
    return mockFileSystem[currentPath] || { folders: [], files: [] }
  }

  // Navigate to folder
  const navigateToFolder = (folderPath) => {
    setCurrentPath(folderPath)
  }

  // Navigate back
  const navigateBack = () => {
    if (currentPath === '/') return
    const pathParts = currentPath.split('/').filter(Boolean)
    pathParts.pop()
    const newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/')
    setCurrentPath(newPath)
  }

  // Get breadcrumb items
  const getBreadcrumbs = () => {
    if (currentPath === '/') return [{ name: 'Home', path: '/' }]
    
    const pathParts = currentPath.split('/').filter(Boolean)
    const breadcrumbs = [{ name: 'Home', path: '/' }]
    
    let currentBreadcrumbPath = ''
    pathParts.forEach((part) => {
      currentBreadcrumbPath += '/' + part
      breadcrumbs.push({ name: part, path: currentBreadcrumbPath })
    })
    
    return breadcrumbs
  }

  const handleUpload = () => {
    if (uploadCode === 'UPLOAD123') {
      if (selectedFile) {
        setUserPoints(prev => prev + 10)
        toast.success('File uploaded successfully! +10 points added.')
        setUploadCode('')
        setSelectedFile(null)
      } else {
        toast.error('Please select a file to upload.')
      }
    } else {
      toast.error('Invalid upload code. Please try again.')
    }
  }

  const handleDownload = (fileName) => {
    if (userPoints >= 5) {
      setUserPoints(prev => prev - 5)
      toast.success(`Downloaded ${fileName}. -5 points deducted.`)
    } else {
      toast.error('Insufficient points. Buy more points or contribute files.')
    }
  }

  const handleBuyPoints = () => {
    setUserPoints(prev => prev + 20)
    toast.success('Successfully purchased 20 points for ₹10!')
  }

  const handleAuth = (e) => {
    e.preventDefault()
    
    if (authMode === 'signup') {
      // Simulate signup
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
      // Simulate signin
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
    // Simulate Google authentication
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

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user')
    setCurrentPath('/')
    setActiveView('home')
    toast.success('Logged out successfully!')
  }

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white">PDF Library</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'pdfs', label: 'My PDFs', icon: FileText },
            { id: 'contribute', label: 'Contribute', icon: Upload },
            { id: 'credits', label: 'Credits', icon: CreditCard },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id)
                if (item.id === 'home' || item.id === 'pdfs') {
                  setCurrentPath('/')
                }
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeView === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
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

  const Breadcrumb = () => {
    const breadcrumbs = getBreadcrumbs()
    
    return (
      <div className="flex items-center space-x-1 text-sm text-gray-400 mb-4">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <button
              onClick={() => navigateToFolder(crumb.path)}
              className={`hover:text-blue-400 transition-colors ${
                index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-blue-400'
              }`}
              disabled={index === breadcrumbs.length - 1}
            >
              {crumb.name}
            </button>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const FileGrid = () => {
    const { folders, files } = getCurrentFolderData()
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Folders */}
        {folders.map((folder) => (
          <Card 
            key={folder.id} 
            className="cursor-pointer hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700"
            onClick={() => navigateToFolder(folder.path)}
          >
            <CardContent className="p-4 text-center">
              <Folder className="w-12 h-12 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium text-white truncate">{folder.name}</p>
              <p className="text-xs text-gray-400">{folder.itemCount} items</p>
            </CardContent>
          </Card>
        ))}
        
        {/* PDF Files */}
        {files.map((file) => (
          <Card 
            key={file.id} 
            className="cursor-pointer hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700"
            onClick={() => setSelectedPdf(file)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-red-900 rounded flex items-center justify-center">
                <FileText className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-sm font-medium text-white truncate">{file.name}</p>
              <p className="text-xs text-gray-400">{file.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const FileList = () => {
    const { folders, files } = getCurrentFolderData()
    
    return (
      <div className="space-y-2">
        {/* Folders */}
        {folders.map((folder) => (
          <div 
            key={folder.id} 
            className="flex items-center p-3 hover:bg-gray-800 rounded-lg cursor-pointer"
            onClick={() => navigateToFolder(folder.path)}
          >
            <Folder className="w-6 h-6 text-blue-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{folder.name}</p>
              <p className="text-xs text-gray-400">{folder.itemCount} items</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
        ))}
        
        {/* PDF Files */}
        {files.map((file) => (
          <div 
            key={file.id} 
            className="flex items-center p-3 hover:bg-gray-800 rounded-lg cursor-pointer"
            onClick={() => setSelectedPdf(file)}
          >
            <div className="w-6 h-6 bg-red-900 rounded flex items-center justify-center mr-3">
              <FileText className="w-4 h-4 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-gray-400">{file.size} • {file.modified}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const HomeView = () => {
    const { folders, files } = getCurrentFolderData()
    const totalItems = folders.length + files.length
    
    return (
      <div className="p-6">
        {/* Auth Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            {currentPath !== '/' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={navigateBack}
                className="flex items-center text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {currentPath === '/' ? 'Home' : currentPath.split('/').pop()}
              </h2>
              <p className="text-gray-400">{totalItems} items</p>
            </div>
          </div>
          
          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
            >
              <List className="w-4 h-4" />
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <img
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-blue-500"
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
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        <Breadcrumb />

        {totalItems === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-500">This folder is empty</p>
          </div>
        ) : (
          viewMode === 'grid' ? <FileGrid /> : <FileList />
        )}
      </div>
    )
  }

  const ContributeView = () => (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-semibold text-white mb-2">Contribute Files</h2>
          <p className="text-gray-400">Upload PDFs and earn 10 points per file</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Code
              </label>
              <Input
                placeholder="Enter upload code"
                value={uploadCode}
                onChange={(e) => setUploadCode(e.target.value)}
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use code: UPLOAD123 (demo)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select PDF File
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Plus className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                  <p className="text-sm text-gray-400">
                    {selectedFile ? selectedFile.name : 'Click to select PDF file'}
                  </p>
                </label>
              </div>
            </div>

            <Button onClick={handleUpload} className="w-full bg-blue-600 hover:bg-blue-700">
              Upload File (+10 points)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const CreditsView = () => (
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
  )

  const SettingsView = () => (
    <div className="p-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Settings</h2>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Default view mode</p>
                      <p className="text-sm text-gray-400">Choose how files are displayed</p>
                    </div>
                    <select 
                      className="bg-gray-900 border border-gray-600 rounded-md px-3 py-1 text-sm text-white"
                      value={viewMode}
                      onChange={(e) => setViewMode(e.target.value)}
                    >
                      <option value="grid">Grid</option>
                      <option value="list">List</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Storage Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total folders:</span>
                    <span className="font-medium text-white">{Object.keys(mockFileSystem).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total files:</span>
                    <span className="font-medium text-white">
                      {Object.values(mockFileSystem).reduce((acc, folder) => acc + folder.files.length, 0)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">About</h3>
                <p className="text-sm text-gray-400">
                  PDF Library v1.0.0 - A modern file management system for PDFs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

const AuthModal = () => (
  <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
    <DialogContent className="max-w-sm sm:max-w-md p-0 bg-transparent border-none overflow-hidden">
      <div className="relative bg-gradient-to-br from-red-950/20 via-red-900/30 to-black/40 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-red-500/20 shadow-2xl">
        {/* Floating Elements - Reduced for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-3 h-3 sm:w-5 sm:h-5 bg-red-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-[60%] right-[15%] w-2 h-2 sm:w-4 sm:h-4 bg-red-400/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-[20%] left-[20%] w-2 h-2 sm:w-3 sm:h-3 bg-red-600/25 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Top Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent"></div>

        <div className="relative z-10 p-6 sm:p-8">
          {/* Logo Section - Compact */}
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

          {/* Google Sign In Button - Compact */}
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

          {/* Divider - Compact */}
          <div className="relative flex items-center my-4 sm:my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <span className="px-3 sm:px-4 text-gray-400 text-xs sm:text-sm font-medium bg-transparent">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Auth Form - Compact */}
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
          
          {/* Toggle Auth Mode - Compact */}
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

          {/* Footer - Compact */}
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

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto bg-gray-900">
        {(activeView === 'home' || activeView === 'pdfs') && <HomeView />}
        {activeView === 'contribute' && <ContributeView />}
        {activeView === 'credits' && <CreditsView />}
        {activeView === 'settings' && <SettingsView />}
      </main>

      {/* Auth Modal */}
      <AuthModal />

      {/* PDF Preview Modal */}
      <Dialog open={!!selectedPdf} onOpenChange={() => setSelectedPdf(null)}>
        <DialogContent className="max-w-2xl bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-white">
              <span>{selectedPdf?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPdf(null)}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-8 text-center">
              <FileText className="w-24 h-24 mx-auto mb-4 text-red-400" />
              <p className="text-gray-300">PDF Preview</p>
              <p className="text-sm text-gray-500 mt-2">
                {selectedPdf?.size} • {selectedPdf?.modified}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={() => {
                  handleDownload(selectedPdf?.name)
                  setSelectedPdf(null)
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={userPoints < 5}
              >
                <Download className="w-4 h-4 mr-2" />
                {userPoints >= 5 ? 'Download (5 points)' : 'Insufficient Points'}
              </Button>
              {userPoints < 5 && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleBuyPoints()
                    setSelectedPdf(null)
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Buy for ₹10
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster position="top-right" />
    </div>
  )
}
