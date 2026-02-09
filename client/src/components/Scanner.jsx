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
                                key="terminal"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="terminal-loader"
                            >
                                {logs.map((log, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="terminal-line"
                                    >
                                        {log}
                                    </motion.span>
                                ))}
                                <span className="terminal-cursor" />
                            </motion.div>
                        )}

                        {result && !loading && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                                className="results-overlay"
                            >
                                <motion.div
                                    className="result-header"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
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
                                </motion.div>

                                <div className="score-meter">
                                    <motion.div
                                        className="score-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.probability * 100}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        style={{ background: result.label === 'Spam' ? '#ff3c50' : '#00ffaa' }}
                                    />
                                </div>

                                <motion.div
                                    className="analysis-details"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <h3>Analysis Explanation</h3>
                                    <p className="analysis-text">{result.reason}</p>
                                </motion.div>
                            </motion.div>
                        )}

                        {error && !loading && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, x: [-10, 10, -10, 10, 0] }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
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
