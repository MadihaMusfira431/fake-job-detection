import React from 'react'
import { motion } from 'framer-motion'
import '../styles/components/GameLink.scss'

const GAME_URL = 'https://snake-game-8nzq.vercel.app/'

const GameLink = () => {
  return (
    <section className="game-link-section" id="game-link">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="game-link-card"
        >
          <span className="section-label">Take a Break</span>
          <h2 className="section-title">Play Snake</h2>
          <p>Need a quick reset before checking your recent scans? Launch your Snake game in a new tab.</p>
          <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open Snake Game
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default GameLink