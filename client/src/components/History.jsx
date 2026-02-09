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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/history`)
            const json = await response.json()
            if (json.success) {
                setHistory(json.data)
            }
        } catch (err) {
            console.error('Failed to fetch history')
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    }

    return (
        <section className="history-section" id="history">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Archive Log</span>
                    <h2 className="section-title">Recent Detections</h2>
                </motion.div>

                <motion.div
                    className="history-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {history.length > 0 ? history.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
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
                </motion.div>
            </div>
        </section>
    )
}

export default History
