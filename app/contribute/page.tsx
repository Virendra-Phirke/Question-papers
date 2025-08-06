'use client'

import React, { useState } from 'react'
import { Upload, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import Layout from '@/components/layout'
import HowItWorksSection from '@/components/how-it-works'

export default function ContributePage() {
  const [uploadCode, setUploadCode] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const handleUpload = () => {
    if (uploadCode === 'UPLOAD123') {
      if (selectedFile) {
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

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h2 className="text-2xl font-semibold text-white mb-2">Contribute Files</h2>
            <p className="text-gray-400">Upload PDFs and earn 10 points per file</p>
          </div>

          {/* How it Works Section - Appears first */}
          <HowItWorksSection />

          {/* Upload Form - Appears after the How it Works section */}
          <Card className="bg-gray-800 border-gray-700 mt-12">
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
    </Layout>
  )
}
