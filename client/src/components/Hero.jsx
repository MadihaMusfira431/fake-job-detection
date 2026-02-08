import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Cpu, Shield } from 'lucide-react'
import '../styles/components/Hero.scss'

const Hero = ({ scannerId }) => {
    const scrollToScanner = () => {
        const el = document.getElementById(scannerId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    const stats = [
        { label: 'Neural Accuracy', value: '98.4%', icon: <Zap size={20} /> },
        { label: 'System Latency', value: '<2.1s', icon: <Cpu size={20} /> },
        { label: 'Verified Queries', value: '1.2M+', icon: <Shield size={20} /> }
    ]

    return (
        <section className="hero">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-main"
                >
                    <span className="section-label">Automated Fraud Neutralization</span>
                    <h1 className="section-title">
                        Neutralize <span className="highlight">Fake Job</span> Threats.
                    </h1>
                    <p className="hero-description">
                        The world's first Neo-Brutalist Scam Detection module. Utilizing advanced NLP to verify
                        job listings, emails, and URLs in real-time.
                    </p>

                    <motion.button
                        whileHover={{ x: 10 }}
                        onClick={scrollToScanner}
                        className="btn-primary hero-btn"
                    >
                        Access Terminal <ArrowRight />
                    </motion.button>
                </motion.div>

                <div className="hero-stats">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="stat-item"
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
