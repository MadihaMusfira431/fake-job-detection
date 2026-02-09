import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Cpu, Shield } from 'lucide-react'
import '../styles/components/Hero.scss'

const Hero = ({ scannerId }) => {
    const scrollToScanner = () => {
        const el = document.getElementById(scannerId)
        if (el) el.scrollIntoView() // Lenis handles the smoothness
    }

    const stats = [
        { label: 'Neural Accuracy', value: '98.4%', icon: <Zap size={20} /> },
        { label: 'System Latency', value: '<2.1s', icon: <Cpu size={20} /> },
        { label: 'Verified Queries', value: '1.2M+', icon: <Shield size={20} /> }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
            }
        }
    }

    const titleVariants = {
        hidden: { y: '100%' },
        visible: {
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    return (
        <section className="hero">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="hero-main"
                >
                    <div className="overflow-hidden">
                        <motion.span variants={titleVariants} className="section-label">
                            Automated Fraud Neutralization
                        </motion.span>
                    </div>

                    <motion.h1 className="section-title">
                        {['Neutralize', 'Fake Job', 'Threats.'].map((word, i) => (
                            <div key={i} className="overflow-hidden">
                                <motion.span
                                    variants={titleVariants}
                                    style={{ display: 'inline-block' }}
                                    className={word === 'Fake Job' ? 'highlight' : ''}
                                >
                                    {word}{' '}
                                </motion.span>
                            </div>
                        ))}
                    </motion.h1>

                    <motion.p variants={itemVariants} className="hero-description">
                        The world's first Neo-Brutalist Scam Detection module. Utilizing advanced NLP to verify
                        job listings, emails, and URLs in real-time.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToScanner}
                            className="btn-primary hero-btn"
                        >
                            Access Terminal <ArrowRight />
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-stats"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="stat-item"
                        >
                            <motion.div
                                className="stat-icon"
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                            >
                                {stat.icon}
                            </motion.div>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
