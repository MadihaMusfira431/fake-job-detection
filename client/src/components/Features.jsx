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
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section className="features" id="features">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Detection Protocol</span>
                    <h2 className="section-title">How ScamGuard Works</h2>
                </motion.div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {featureList.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="feature-card"
                        >
                            <motion.div
                                className="feature-icon"
                                whileHover={{ rotate: 10, scale: 1.1 }}
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
