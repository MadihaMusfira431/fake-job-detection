import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, ExternalLink } from 'lucide-react';
import '../styles/components/GameLink.scss';

const GameLink = () => {
  return (
    <section className="game-section" id="arcade">
      <div className="container">
        <motion.div 
          className="game-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="game-info">
            <div className="info-header">
              <Gamepad2 className="accent-icon" size={32} />
              <div className="title-group">
                <span className="section-label">Neural Training</span>
                <h2>System Arcade</h2>
              </div>
            </div>
            <p className="game-description">
              Engage in legacy data-stream optimization protocols (Snake Game). 
              Keep the system active while the neural network processes background tasks.
            </p>
            <div className="game-stats">
              <div className="stat">
                <span className="stat-value">v2.0</span>
                <span className="stat-label">Engine</span>
              </div>
              <div className="stat">
                <span className="stat-value">∞</span>
                <span className="stat-label">Levels</span>
              </div>
            </div>
            <a 
              href="https://snake-game-8nzq.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Open in New Decryptor <ExternalLink size={16} />
            </a>
          </div>
          <div className="game-display">
            <div className="iframe-container">
              <iframe
                src="https://snake-game-8nzq.vercel.app/"
                title="Secure Stream Simulation"
                className="arcade-iframe"
                loading="lazy"
                allow="fullscreen"
              />
              <div className="scanline" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameLink;
