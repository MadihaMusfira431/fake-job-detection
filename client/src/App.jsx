import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Scanner from './components/Scanner'
import History from './components/History'
import Footer from './components/Footer'

function App() {
  const [historyKey, setHistoryKey] = useState(0)
  const scannerId = 'scanner-tool'

  const refreshHistory = () => {
    setHistoryKey(prev => prev + 1)
  }

  return (
    <div className="app-container">
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
