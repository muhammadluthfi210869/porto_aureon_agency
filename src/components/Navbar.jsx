import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { name: 'Methodology', href: '#methodology' },
    { name: 'The Blueprint', href: '#blueprint' },
    { name: 'The Neural Engine', href: '#neural-engine' },
    { name: 'The Architect', href: '#architect' },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            {/* Main Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#C5A059]/10 py-4 shadow-lg shadow-black/50'
                    : 'bg-transparent border-b border-transparent py-8'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo - 150% Clear Space enforced by py/px */}
                        <a
                            href="#"
                            className="font-display text-gold tracking-[0.4em] text-lg md:text-xl font-medium hover:text-white transition-all duration-500"
                        >
                            AUREON
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-gold transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* CTA Button - Desktop */}
                            <button className="btn-outline !py-2.5 !px-6 !text-[10px]">
                                REQUEST DIAGNOSIS
                            </button>
                        </div>

                        {/* Mobile Menu Button - Elegant Thin Lines */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden relative z-50 w-8 h-8 flex flex-col items-end justify-center gap-1.5 group"
                            aria-label="Toggle menu"
                        >
                            <span className={`h-[1px] bg-gold transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`} />
                            <span className={`h-[1px] bg-gold transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6'}`} />
                            <span className={`h-[1px] bg-gold transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop - Midnight Obsidian */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="relative h-full flex flex-col items-center justify-center p-12"
                        >
                            {/* Logo in Mobile Menu */}
                            <div className="mb-16">
                                <span className="font-display text-gold tracking-[0.5em] text-2xl">AUREON</span>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex flex-col items-center gap-10 mb-16">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        onClick={() => setIsOpen(false)}
                                        className="font-display text-xl text-porcelain hover:text-gold transition-colors duration-300 uppercase tracking-widest"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* CTA Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="btn-primary w-full max-w-xs"
                                onClick={() => setIsOpen(false)}
                            >
                                REQUEST DIAGNOSIS
                            </motion.button>

                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="mt-16 w-16 h-px bg-gold/30"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
