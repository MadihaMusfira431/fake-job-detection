import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Search, AlertTriangle } from 'lucide-react'
import '../styles/components/Scanner.scss'

const Scanner = ({ onScanComplete }) => {
    const [inputText, setInputText] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [logs, setLogs] = useState([])

    const logMessages = [
        "> Initializing Neural Engine...",
        "> Loading NLTK Preprocessing...",
        "> Tokenizing input stream...",
        "> Removing stopword noise...",
        "> Cross-referencing scam patterns...",
        "> Calculating probability variance...",
        "> Finalizing classification..."
    ]

    useEffect(() => {
        if (loading) {
            let i = 0
            setLogs([])
            const interval = setInterval(() => {
                if (i < logMessages.length) {
                    setLogs(prev => [...prev, logMessages[i]])
                    i++
                } else {
                    clearInterval(interval)
                }
            }, 400)
            return () => clearInterval(interval)
        }
    }, [loading])

    const handleDetect = async () => {
        if (!inputText.trim()) return
        setLoading(true)
        setError('')
        setResult(null)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/detect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText }),
            })
            const data = await response.json()
            if (data.success) {
                setResult(data.data)
                if (onScanComplete) onScanComplete()
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch (err) {
            setError('Connection failed. Please ensure backend and ML service are running.')
        } finally {
            setTimeout(() => setLoading(false), 3000)
        }
    }

    return (
        <section className="scanner-section" id="scanner-tool">
            <div className="container">
                <motion.div
                    className="scanner-card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="scanner-title">
                        <Terminal size={24} className="accent-icon" />
                        Neural Analysis Portal
                    </div>

                    <div className="input-container">
                        <textarea
                            placeholder="Paste content for system verification..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <motion.button
                        onClick={handleDetect}
                        disabled={loading || !inputText.trim()}
                        className="btn-primary scan-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? 'Analyzing Neural Pathways...' : <>Initialize Deep Scan <Search size={20} /></>}
                    </motion.button>

                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="terminal-loader"
                            >
                                {logs.map((log, i) => (
                                    <span key={i} className="terminal-line">{log}</span>
                                ))}
                                <span className="terminal-cursor" />
                            </motion.div>
                        )}

                        {result && !loading && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="results-overlay"
                            >
                                <div className="result-header">
                                    <div className="header-left">
                                        <span className={`status-badge ${result.label.toLowerCase()}`}>
                                            {result.label === 'Ham' ? 'Verified: Legitimate' : 'Warning: Fraudulent'}
                                        </span>
                                        <h2 className="result-label">Result: {result.label}</h2>
                                    </div>
                                    <div className="score-container">
                                        <div className="stat-label">Precision Matrix</div>
                                        <div className="score-value">
                                            {(result.probability * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                </div>

                                <div className="score-meter">
                                    <motion.div
                                        className="score-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.probability * 100}%` }}
                                        transition={{ duration: 1.5 }}
                                        style={{ background: result.label === 'Spam' ? '#ff3c50' : '#00ffaa' }}
                                    />
                                </div>

                                <div className="analysis-details">
                                    <h3>Analysis Explanation</h3>
                                    <p className="analysis-text">{result.reason}</p>
                                </div>
                            </motion.div>
                        )}

                        {error && !loading && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="error-card"
                            >
                                <AlertTriangle /> {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

export default Scanner
