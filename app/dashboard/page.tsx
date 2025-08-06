'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Grid3X3, List, Search, Folder, ChevronRight, Home, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText } from 'lucide-react'
import Layout from '@/components/layout'
import { mockFileSystem } from '@/lib/mock-data'
import PdfPurchaseModal from '@/components/pdf-purchase-modal'

export default function DashboardPage() {
  const [currentPath, setCurrentPath] = useState('/')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [userPoints, setUserPoints] = useState(0)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

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

  const Breadcrumb = () => {
    const breadcrumbs = getBreadcrumbs()
    
    return (
      <div className="flex items-center space-x-3 text-lg font-semibold text-slate-500 mb-6">
        <Home className="w-5 h-5 text-blue-500" />
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <button
              onClick={() => navigateToFolder(crumb.path)}
              className={`hover:text-blue-400 transition-colors ${
                index === breadcrumbs.length - 1 ? 'text-slate-200 font-semibold' : 'text-blue-400'
              }`}
              disabled={index === breadcrumbs.length - 1}
            >
              {crumb.name}
            </button>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="w-4 h-4 text-slate-600" />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const PremiumFileGrid = () => {
  const { folders, files } = getCurrentFolderData()
  
  if (viewMode === 'list') {
    return (
      <div className="premium-file-list">
        {/* Folders */}
        {folders.map((folder, index) => (
          <div 
            key={folder.id} 
            className="premium-list-item group"
            style={{ animationDelay: `${(index + 1) * 0.05}s` }}
            onClick={() => navigateToFolder(folder.path)}
          >
            <div className="list-item-icon">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div className="list-item-content">
              <div className="list-item-name">{folder.name}</div>
              <div className="list-item-meta">Folder • {folder.itemCount} items</div>
            </div>
            <div className="list-item-actions">
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        ))}
        
        {/* PDF Files */}
        {files.map((file, index) => (
          <div 
            key={file.id} 
            className="premium-list-item group"
            style={{ animationDelay: `${(folders.length + index + 1) * 0.05}s` }}
            onClick={() => {
              setSelectedPdf(file)
              setShowPurchaseModal(true)
            }}
          >
            <div className="list-item-icon pdf-icon">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="list-item-content">
              <div className="list-item-name">{file.name}</div>
              <div className="list-item-meta">{file.modified} • {file.size}</div>
            </div>
            <div className="list-item-size">
              <span className="size-badge">{file.size}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Grid view (existing code)
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 mb-8">
      {/* Folders */}
      {folders.map((folder, index) => (
        <div 
          key={folder.id} 
          className="premium-file-card group"
          style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          onClick={() => navigateToFolder(folder.path)}
        >
          <div>
            <div className="file-icon-container folder-icon">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div className="file-title">{folder.name}</div>
          </div>
          <div className="file-meta">
            <span>{folder.itemCount} items</span>
            <span className="file-size">Folder</span>
          </div>
        </div>
      ))}
      
      {/* PDF Files */}
      {files.map((file, index) => (
        <div 
          key={file.id} 
          className="premium-file-card group"
          style={{ animationDelay: `${(folders.length + index + 1) * 0.1}s` }}
          onClick={() => {
            setSelectedPdf(file)
            setShowPurchaseModal(true)
          }}
        >
          <div>
            <div className="file-icon-container pdf-icon">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="file-title">{file.name}</div>
          </div>
          <div className="file-meta">
            <span>{file.modified}</span>
            <span className="file-size">{file.size}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

  const ViewControls = () => (
    <div className="flex gap-3 items-center mb-6">
      <button
        onClick={() => setViewMode('grid')}
        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
      >
        <Grid3X3 className="w-4 h-4" />
        Grid
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
      >
        <List className="w-4 h-4" />
        List
      </button>
      <div className="ml-auto">
        <button className="sort-btn">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
          </svg>
          Sort by Name
        </button>
      </div>
    </div>
  )

  const { folders, files } = getCurrentFolderData()
  const totalItems = folders.length + files.length

  return (
    <Layout>
      <div className="premium-dashboard">
        {/* Header with Search */}
        <div className="dashboard-header">
          <Breadcrumb />
          <div className="search-container">
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Search className="search-icon" />
          </div>
        </div>

        {/* View Controls */}
        <ViewControls />

        {/* Back Button */}
        {currentPath !== '/' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={navigateBack}
            className="flex items-center text-slate-300 hover:text-white hover:bg-slate-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}

        {/* File Grid */}
        {totalItems === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-500">This folder is empty</p>
          </div>
        ) : (
          <PremiumFileGrid />
        )}
      </div>

      {/* PDF Purchase Modal */}
      <PdfPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => {
          setShowPurchaseModal(false)
          setSelectedPdf(null)
        }}
        pdfFile={selectedPdf}
        userPoints={userPoints}
        onPointsUpdate={setUserPoints}
      />

      <style jsx>{`
        .premium-dashboard {
          background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
          padding: 20px;
          line-height: 1.6;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          gap: 20px;
        }

        .search-container {
          position: relative;
          max-width: 300px;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 48px 12px 16px !important;
          background: rgba(51, 65, 85, 0.8) !important;
          border: 1px solid rgba(100, 116, 139, 0.3) !important;
          border-radius: 12px !important;
          color: #e2e8f0 !important;
          font-size: 14px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
          background: rgba(51, 65, 85, 0.95) !important;
        }

        .search-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #64748b;
          pointer-events: none;
        }

        .premium-file-card {
          background: rgba(51, 65, 85, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(100, 116, 139, 0.2);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 0.6s ease forwards;
        }

        .premium-file-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .premium-file-card:hover::before {
          left: 100%;
        }

        .premium-file-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
                      0 0 0 1px rgba(59, 130, 246, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .file-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          margin-bottom: 12px;
          position: relative;
        }

        .folder-icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .pdf-icon {
          background: linear-gradient(135deg, #dc2626, #991b1b);
        }

        .file-title {
          font-size: 14px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .file-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #94a3b8;
        }

        .file-size {
          background: rgba(100, 116, 139, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 10px;
        }

        .view-btn {
          padding: 8px 12px;
          background: rgba(51, 65, 85, 0.6);
          border: 1px solid rgba(100, 116, 139, 0.2);
          border-radius: 8px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .view-btn.active,
        .view-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
          color: #3b82f6;
        }

        .sort-btn {
          padding: 8px 12px;
          background: rgba(51, 65, 85, 0.6);
          border: 1px solid rgba(100, 116, 139, 0.2);
          border-radius: 8px;
          color: #94a3b8;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .sort-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
          color: #3b82f6;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .premium-file-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 32px;
        }

        .premium-list-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: rgba(51, 65, 85, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(100, 116, 139, 0.1);
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-20px);
          animation: slideInLeft 0.4s ease forwards;
          margin-bottom: 1px;
        }

        .premium-list-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
          transition: left 0.5s ease;
        }

        .premium-list-item:hover::before {
          left: 100%;
        }

        .premium-list-item:hover {
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
                      0 0 0 1px rgba(59, 130, 246, 0.1);
        }

        .list-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          margin-right: 12px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          flex-shrink: 0;
        }

        .list-item-icon.pdf-icon {
          background: linear-gradient(135deg, #dc2626, #991b1b);
        }

        .list-item-content {
          flex: 1;
          min-width: 0;
        }

        .list-item-name {
          font-size: 14px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .list-item-meta {
          font-size: 12px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .list-item-actions {
          display: flex;
          align-items: center;
          margin-left: 12px;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .premium-list-item:hover .list-item-actions {
          opacity: 1;
        }

        .list-item-size {
          margin-left: 12px;
          flex-shrink: 0;
        }

        .size-badge {
          background: rgba(100, 116, 139, 0.3);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          color: #cbd5e1;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive adjustments for list view */
        @media (max-width: 768px) {
          .premium-list-item {
            padding: 10px 12px;
          }
          
          .list-item-icon {
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }
          
          .list-item-name {
            font-size: 13px;
          }
          
          .list-item-meta {
            font-size: 11px;
          }
          
          .size-badge {
            font-size: 10px;
            padding: 3px 6px;
          }
        }

        @media (max-width: 480px) {
          .list-item-size {
            display: none;
          }
          
          .list-item-actions {
            margin-left: 8px;
          }
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .premium-dashboard {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 14px;
          }
        }

        @media (max-width: 768px) {
          .premium-dashboard {
            padding: 16px;
          }
          
          .dashboard-header {
            flex-direction: column;
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .search-container {
            max-width: 100%;
          }
          
          .premium-file-card {
            padding: 12px;
            min-height: 100px;
            border-radius: 10px;
          }
          
          .file-icon-container {
            width: 32px;
            height: 32px;
            margin-bottom: 8px;
          }
          
          .file-title {
            font-size: 12px;
            margin-bottom: 6px;
          }
          
          .file-meta {
            font-size: 10px;
          }
          
          .file-size {
            font-size: 9px;
            padding: 1px 4px;
          }
        }

        @media (max-width: 480px) {
          .premium-dashboard {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 10px;
          }
          
          .premium-file-card {
            padding: 10px;
            min-height: 90px;
          }
          
          .file-icon-container {
            width: 28px;
            height: 28px;
            margin-bottom: 6px;
          }
          
          .file-title {
            font-size: 11px;
            margin-bottom: 4px;
          }
          
          .view-btn, .sort-btn {
            padding: 6px 10px;
            font-size: 12px;
          }
        }
      `}</style>
    </Layout>
  )
}
