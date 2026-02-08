import React from 'react'
import '../styles/components/Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-links">
                    <div>
                        <h4 className="footer-heading">Stack</h4>
                        <div className="footer-subtext">MERN + Python Flask</div>
                    </div>
                    <div>
                        <h4 className="footer-heading">Model</h4>
                        <div className="footer-subtext">NLP / Rule-Based</div>
                    </div>
                </div>
                <div className="footer-credits">
                    College Group Project / Fake Job & Scam Detection
                </div>
                <div className="footer-copy">
                    &copy; {new Date().getFullYear()} SCAMGUARD_AI SYSTEM PORTOCOL
                </div>
            </div>
        </footer>
    )
}

export default Footer
