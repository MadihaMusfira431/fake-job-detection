import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import '../styles/components/Navbar.scss'

const Navbar = ({ scannerId }) => {
    const [isOpen, setIsOpen] = useState(false)

    const scrollToElement = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            setIsOpen(false)
        }
    }

    const navLinks = [
        { label: 'Protocol', id: 'features' },
        { label: 'Archive', id: 'history' }
    ]

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ScamGuard_AI
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <span
                            key={link.id}
                            onClick={() => scrollToElement(link.id)}
                            className="nav-link"
                        >
                            {link.label}
                        </span>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToElement(scannerId)}
                        className="btn-primary nav-btn"
                    >
                        Launch Scanner
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="mobile-menu"
                        >
                            {navLinks.map((link) => (
                                <span
                                    key={link.id}
                                    onClick={() => scrollToElement(link.id)}
                                    className="nav-link"
                                >
                                    {link.label}
                                </span>
                            ))}
                            <button
                                onClick={() => scrollToElement(scannerId)}
                                className="btn-primary"
                            >
                                Launch Scanner
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
