import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleDetect = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://localhost:5001/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Connection failed. Please ensure backend and ML service are running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Job Scam Detector</h1>

      <div className="input-group">
        <textarea
          placeholder="Paste job description, email content, or URL here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <button
        onClick={handleDetect}
        disabled={loading || !inputText.trim()}
      >
        {loading ? 'Analyzing...' : 'Scan for Scams'}
      </button>

      {error && <div className="result-card spam">{error}</div>}

      {result && (
        <div className={`result-card ${result.label.toLowerCase()}`}>
          <div className="result-header">
            <span className="label">
              {result.label === 'Ham' ? '✅ Safe (Legitimate)' : '🚨 Scam (Fraud)'}
            </span>
            <span className="score">
              Trust Score: {(result.probability * 100).toFixed(1)}%
            </span>
          </div>
          <p className="reason"><strong>Analysis:</strong> {result.reason}</p>
        </div>
      )}

      <footer>
        College Group Project | Fake Job & Scam Detection System
      </footer>
    </div>
  )
}

export default App
