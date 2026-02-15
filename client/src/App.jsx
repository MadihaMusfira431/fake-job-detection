import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Scanner from './components/Scanner'
import History from './components/History'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AuthModal from './components/AuthModal'
import './styles/components/CustomCursor.scss'

function App() {
  const [historyKey, setHistoryKey] = useState(0)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [guestTimerExpired, setGuestTimerExpired] = useState(false)
  const scannerId = 'scanner-tool'

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Guest Timer: 5 minutes = 300,000 ms
    let timer;
    if (!user) {
      timer = setTimeout(() => {
        setGuestTimerExpired(true)
        setIsAuthModalOpen(true)
      }, 300000);
    }

    return () => {
      lenis.destroy()
      if (timer) clearTimeout(timer)
    }
  }, [user])

  const refreshHistory = () => {
    setHistoryKey(prev => prev + 1)
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setGuestTimerExpired(false)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar
        scannerId={scannerId}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setIsAuthModalOpen(true)}
      />

      <main className={guestTimerExpired && !user ? 'content-locked' : ''}>
        <Hero scannerId={scannerId} />

        <div className="marquee">
          <div className="marquee-content">
            SECURE PROTOCOL ACTIVE // AI SCANNING ENABLED // ZERO TRUST POLICY // VERIFY EVERYTHING // FAKE JOB DETECTION // PHISHING PROTECTION //
            SECURE PROTOCOL ACTIVE // AI SCANNING ENABLED // ZERO TRUST POLICY // VERIFY EVERYTHING // FAKE JOB DETECTION // PHISHING PROTECTION //
          </div>
        </div>

        <Features />
        <Scanner onScanComplete={refreshHistory} />
        <History refreshKey={historyKey} />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => !guestTimerExpired && setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {guestTimerExpired && !user && (
        <div className="guest-expired-overlay">
          <div className="expired-content">
            <h2>Session Expired</h2>
            <p>Your 5-minute guest access has ended. Please login or register to continue using the Fake Job Detector.</p>
            <button onClick={() => setIsAuthModalOpen(true)}>Login / Register</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
