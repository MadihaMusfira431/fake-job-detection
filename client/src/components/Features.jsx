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

    return (
        <section className="features" id="features">
            <div className="container">
                <span className="section-label">Detection Protocol</span>
                <h2 className="section-title">How ScamGuard Works</h2>

                <div className="features-grid">
                    {featureList.map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="feature-card"
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
