import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Scanner from './components/Scanner'
import History from './components/History'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import './styles/components/CustomCursor.scss'

function App() {
  const [historyKey, setHistoryKey] = useState(0)
  const scannerId = 'scanner-tool'

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const refreshHistory = () => {
    setHistoryKey(prev => prev + 1)
  }

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar scannerId={scannerId} />

      <main>
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
    </div>
  )
}

export default App
