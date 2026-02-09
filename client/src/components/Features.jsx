import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Search, BarChart } from 'lucide-react'
import '../styles/components/Features.scss'

const Features = () => {
    const featureList = [
        {
            title: 'NLP Preprocessing',
            desc: 'Raw text is cleansed. We remove noise, tokenize inputs, and apply stemming to find core intents.',
            icon: <Layers size={32} />
        },
        {
            title: 'Pattern Matching',
            desc: 'Cross-referencing with a database of known scam linguistics and fraudulent psychological triggers.',
            icon: <Search size={32} />
        },
        {
            title: 'Probability Matrix',
            desc: 'Our engine calculates a Trust Score based on keyword density and sentiment analysis.',
            icon: <BarChart size={32} />
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    }

    return (
        <section className="features" id="features">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Detection Protocol</span>
                    <h2 className="section-title">How ScamGuard Works</h2>
                </motion.div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                >
                    {featureList.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="feature-card"
                        >
                            <motion.div
                                className="feature-icon"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Features
