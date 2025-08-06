'use client'

import React, { useState, useEffect } from 'react'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <div className="premium-credits-page">
        <div className="credits-container">
          <div className="credits-header">
            <div className="credits-icon">
              <div className="icon-inner"></div>
            </div>
            <h1 className="credits-title">Your Credits</h1>
            <p className="credits-subtitle">Manage your download credits</p>
          </div>

          <div className="credits-card">
            <div className="credits-amount">{userPoints}</div>
            <div className="credits-label">Available Points</div>
          </div>

          <div className="pricing-card">
            <h2 className="pricing-title">Pricing</h2>
            
            <div className="pricing-row">
              <span className="pricing-label">Per download</span>
              <span className="pricing-value download">-5 points</span>
            </div>
            
            <div className="pricing-row">
              <span className="pricing-label">Per upload</span>
              <span className="pricing-value upload">+10 points</span>
            </div>
            
            <button className="buy-button" onClick={handleBuyPoints}>
              Buy 20 Points for ₹10
            </button>
          </div>
        </div>

        <style jsx>{`
  .premium-credits-page {
    min-height: 100vh;
    background: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .credits-container {
    width: 100%;
    max-width: 320px;
    color: white;
  }

  .credits-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .credits-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 12px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    position: relative;
  }

  .icon-inner::before {
    content: '';
    width: 24px;
    height: 16px;
    background: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon-inner::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 1.5px;
    background: white;
    border-radius: 1px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 5px));
  }

  .credits-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  .credits-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
  }

  .credits-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .credits-amount {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
    line-height: 1;
  }

  .credits-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .pricing-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .pricing-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: white;
  }

  .pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 8px 0;
  }

  .pricing-row:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .pricing-label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  .pricing-value {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 16px;
    color: white;
  }

  .pricing-value.download {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .pricing-value.upload {
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .buy-button {
    width: 100%;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 16px;
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
    transition: all 0.2s ease;
  }

  .buy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5);
  }

  .buy-button:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    .credits-container {
      max-width: 280px;
      padding: 0 16px;
    }
    
    .credits-card, .pricing-card {
      padding: 16px;
    }
    
    .credits-amount {
      font-size: 32px;
    }
    
    .credits-title {
      font-size: 20px;
    }
  }
`}</style>
      </div>
    </Layout>
  )
}
