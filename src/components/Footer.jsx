import { motion } from 'framer-motion'
import { Instagram, Linkedin, Twitter } from 'lucide-react'

const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
]

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative border-t border-[#A08040]/10 bg-[#FAFAF9]">
            {/* Gradient overlay - Light Mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F4] to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center md:items-start gap-4"
                    >
                        <a
                            href="#"
                            className="font-display text-[#A08040] tracking-[0.25em] text-sm hover:text-[#8A6E38] transition-colors duration-300"
                        >
                            AUREON
                        </a>
                        <p className="text-xs text-stone-500 tracking-wide">
                            © {currentYear} Aureon Agency. All rights reserved.
                        </p>
                    </motion.div>

                    {/* Decorative Line - Mobile */}
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#A08040]/30 to-transparent md:hidden" />

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-sm text-stone-600 text-center italic font-serif"
                    >
                        Whispered Luxury. Clinical Precision.
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-6"
                    >
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                aria-label={social.name}
                                className="text-stone-500 hover:text-[#A08040] transition-colors duration-300"
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-12 h-px bg-gradient-to-r from-transparent via-[#A08040]/20 to-transparent origin-center"
                />
            </div>
        </footer>
    )
}

export default Footer
