import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/components/History.scss'

const History = ({ refreshKey }) => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        fetchHistory()
    }, [refreshKey])

    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/history')
            const data = await response.json()
            setHistory(data)
        } catch (err) {
            console.error('Failed to fetch history')
        }
    }

    return (
        <section className="history-section" id="history">
            <div className="container">
                <span className="section-label">Archive Log</span>
                <h2 className="section-title">Recent Detections</h2>

                <div className="history-grid">
                    {history.length > 0 ? history.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className={`history-card ${item.label.toLowerCase()}`}
                        >
                            <span className="history-date">{new Date(item.createdAt).toLocaleString()}</span>
                            <p className="history-text">{item.inputText}</p>
                            <div className="card-footer">
                                <span className="label-text">{item.label}</span>
                                <span className="prob-text">{Math.round(item.probability * 100)}%</span>
                            </div>
                        </motion.div>
                    )) : (
                        <p className="no-logs">No logs found in neural archive.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default History
