import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Cloud, Palette, Cpu, ShieldCheck, X, CheckCircle2 } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: "THE AUTHORITY ARCHIVE" — Museum Spotlight Layout (SMOOTH VERSION)
// Philosophy: Certificates as precious artifacts, spotlight reverence, proud display
// Animation: Smooth cinematic easing, no jitter
// ═══════════════════════════════════════════════════════════════════════════════

// Premium easing - very smooth
const cinematicEase = [0.22, 1, 0.36, 1]

// DATA
const certifications = [
    {
        id: 'GCP-001',
        icon: Cloud,
        issuer: 'Google Cloud',
        title: 'GENERATIVE AI LEADER',
        credential: 'Professional Certificate',
        year: '2024',
        color: '#4285F4',
        image: '/Google Certificate.png',
    },
    {
        id: 'IXD-042',
        icon: Palette,
        issuer: 'IxDF',
        title: 'AI-POWERED UX DESIGN',
        credential: 'Specialist Certification',
        year: '2024',
        color: '#00BFA5',
        image: '/IxDF Certificate.png',
    },
    {
        id: 'TF-DEV-88',
        icon: Cpu,
        issuer: 'TensorFlow',
        title: 'DEVELOPER CERTIFICATE',
        credential: 'Professional Developer',
        year: '2024',
        color: '#FF6F00',
        image: '/TensorFlow Certificate.png',
    },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MUSEUM CARD COMPONENT — Smooth Spotlight Effect (No Jitter)
// ═══════════════════════════════════════════════════════════════════════════════
const MuseumCard = ({ cert, onClick, index }) => {
    const cardRef = useRef(null)

    // Smooth glow position (no spring, just CSS transitions)
    const glowX = useMotionValue(50)
    const glowY = useMotionValue(50)

    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        glowX.set(x)
        glowY.set(y)
    }

    // Transform glow position to gradient
    const glowBackground = useTransform(
        [glowX, glowY],
        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(197, 160, 89, 0.15) 0%, transparent 50%)`
    )

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.15,
                duration: 1,
                ease: cinematicEase
            }}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            className="group relative cursor-pointer"
        >
            {/* Spotlight Glow (Above Card) - Smooth CSS transition */}
            <div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-[180%] h-32 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center bottom, rgba(160, 128, 64, 0.08) 0%, transparent 70%)',
                    transition: 'opacity 0.6s ease-out'
                }}
            />

            {/* Card Container - Light Mode Premium Card */}
            <motion.div
                className="relative bg-white rounded-2xl border border-stone-200 overflow-hidden"
                style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease-out'
                }}
                whileHover={{
                    y: -12,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(160, 128, 64, 0.06)'
                }}
                transition={{ duration: 0.5, ease: cinematicEase }}
            >
                {/* Dynamic Glow Following Cursor - Smooth */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-0 rounded-2xl"
                    style={{
                        background: glowBackground,
                        transition: 'opacity 0.4s ease-out'
                    }}
                />

                <div
                    className="absolute inset-0 rounded-2xl border border-stone-200 pointer-events-none z-20"
                    style={{
                        transition: 'border-color 0.5s ease-out'
                    }}
                />
                <div
                    className="absolute inset-0 rounded-2xl border border-[#A08040]/0 group-hover:border-[#A08040]/30 pointer-events-none z-20"
                    style={{ transition: 'border-color 0.5s ease-out' }}
                />
                <div
                    className="absolute inset-x-0 top-0 h-px bg-stone-200 group-hover:bg-[#A08040]/40"
                    style={{ transition: 'background-color 0.5s ease-out' }}
                />

                {/* Certificate Image — Light Mode */}
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                    {/* Frame Effect */}
                    <div className="absolute inset-4 rounded-lg border border-stone-200/50 overflow-hidden shadow-inner">
                        <img
                            src={cert.image}
                            alt={`${cert.issuer} Certificate`}
                            className="w-full h-full object-cover object-top group-hover:scale-105"
                            style={{ transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }}
                        />
                        {/* Glass Reflection */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
                            }}
                        />
                    </div>

                    {/* Issuer Badge - Light Mode */}
                    <div className="absolute top-2 left-2 z-10">
                        <div
                            className="p-2 rounded-lg bg-white/90 backdrop-blur-md border border-stone-200"
                            style={{ boxShadow: `0 2px 8px ${cert.color}15` }}
                        >
                            <cert.icon size={18} style={{ color: cert.color }} />
                        </div>
                    </div>

                    {/* Verified Shield - Light Mode */}
                    <div className="absolute top-2 right-2 z-10">
                        <div className="p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A08040]/30 group-hover:border-[#A08040]/50"
                            style={{ transition: 'border-color 0.5s ease-out, box-shadow 0.5s ease-out' }}
                        >
                            <ShieldCheck size={14} className="text-[#A08040]" />
                        </div>
                    </div>
                </div>

                {/* Content Section - Light Mode */}
                <div className="p-6 relative z-10">
                    {/* Issuer */}
                    <p className="text-[10px] text-stone-500 uppercase tracking-[0.25em] mb-2">
                        {cert.issuer}
                    </p>

                    {/* Title - Light Mode */}
                    <h3
                        className="text-lg md:text-xl font-serif text-[#1C1917] group-hover:text-[#A08040] mb-3 leading-tight"
                        style={{ transition: 'color 0.4s ease-out' }}
                    >
                        {cert.title}
                    </h3>

                    {/* Footer - Light Mode */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:shadow-[0_0_8px_#10b981]"
                                style={{ transition: 'box-shadow 0.4s ease-out' }}
                            />
                            <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                                Verified
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-500">
                            {cert.year}
                        </span>
                    </div>
                </div>

                {/* Bottom Accent Bar - Light Mode */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#A08040] origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
                />
            </motion.div>
        </motion.div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CEREMONIAL MODAL — Smooth Entry
// ═══════════════════════════════════════════════════════════════════════════════
const CeremonialModal = ({ cert, onClose }) => {
    if (!cert) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: cinematicEase }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ backdropFilter: 'blur(0px)' }}
                animate={{ backdropFilter: 'blur(20px)' }}
                exit={{ backdropFilter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-black/90"
            />

            {/* Modal Content - Smooth spring */}
            <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{
                    duration: 0.6,
                    ease: cinematicEase,
                    delay: 0.1
                }}
                className="relative max-w-5xl w-full bg-gradient-to-b from-[#0A0A0A] to-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                    style={{ transition: 'background-color 0.3s ease-out, transform 0.3s ease-out' }}
                >
                    <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                </button>

                <div className="grid lg:grid-cols-5">
                    {/* Left: Certificate Image */}
                    <div className="lg:col-span-3 relative bg-[#080808] p-8 lg:p-12 flex items-center justify-center">
                        {/* Spotlight */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.05) 0%, transparent 70%)'
                            }}
                        />

                        {/* Certificate Frame */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: cinematicEase }}
                            className="relative"
                        >
                            {/* Frame Border */}
                            <div className="absolute -inset-4 rounded-lg border border-[#C5A059]/20 bg-gradient-to-b from-[#C5A059]/5 to-transparent" />

                            <img
                                src={cert.image}
                                alt={`${cert.issuer} Certificate`}
                                className="relative w-full h-auto rounded-lg shadow-2xl"
                                style={{
                                    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                                }}
                            />

                            {/* Glass Reflection */}
                            <div
                                className="absolute inset-0 rounded-lg pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%)'
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5">

                        {/* Verified Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: cinematicEase }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 mb-6 w-fit"
                        >
                            <CheckCircle2 size={14} className="text-[#C5A059]" />
                            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                                Officially Verified
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5, ease: cinematicEase }}
                        >
                            <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                                {cert.title}
                            </h2>
                            <p className="text-zinc-500 text-sm uppercase tracking-widest">
                                {cert.issuer} Authority
                            </p>
                        </motion.div>

                        {/* Details Table */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="space-y-4 pt-8 mt-8 border-t border-white/5"
                        >
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-zinc-500">Credential Type</span>
                                <span className="text-sm text-white font-medium">{cert.credential}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-t border-white/5">
                                <span className="text-sm text-zinc-500">Reference ID</span>
                                <span className="text-sm text-white font-mono">{cert.id}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-t border-white/5">
                                <span className="text-sm text-zinc-500">Issue Year</span>
                                <span className="text-sm text-white font-mono">{cert.year}</span>
                            </div>
                        </motion.div>

                        {/* Quote */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-xs text-zinc-600 leading-relaxed italic mt-8 border-l-2 border-[#C5A059]/30 pl-4"
                        >
                            "Certification verified through official channels. Validated for high-level technical implementation and architectural authority."
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const AuthorityArchive = () => {
    const [selectedCert, setSelectedCert] = useState(null)

    return (
        <section
            className="relative z-10 w-full min-h-screen py-24 md:py-32 overflow-hidden"
            style={{
                // Built-in gradient transition: Light → Dark (like Trinity but reversed)
                background: 'linear-gradient(180deg, #FAFAF9 0%, #FAFAF9 60%, #d6d3d1 75%, #78716c 85%, #1a1917 95%, #050505 100%)'
            }}
        >

            {/* Ambient Background — Light Mode */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#FAFAF9] via-[#FAFAF9] to-transparent" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A08040]/3 rounded-full blur-[200px]" />
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(#d6d3d1 1px, transparent 1px), linear-gradient(90deg, #d6d3d1 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20 md:mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: cinematicEase }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-[#A08040]/50" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#A08040] font-bold">
                            Verification Chamber
                        </span>
                        <div className="h-[1px] w-12 bg-[#A08040]/50" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8, ease: cinematicEase }}
                        className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#1C1917] mb-4"
                    >
                        THE AUTHORITY
                        <br />
                        <span className="text-[#A08040] italic font-light">Archive</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-[#57534E] text-sm max-w-md mx-auto"
                    >
                        Institutional endorsements from global technology leaders,
                        each validating expertise in modern digital architecture.
                    </motion.p>
                </div>

                {/* Museum Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <MuseumCard
                            key={cert.id}
                            cert={cert}
                            index={index}
                            onClick={() => setSelectedCert(cert)}
                        />
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-20 flex items-center justify-center gap-4"
                >
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#A08040]/30" />
                    <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                        All credentials verified
                    </span>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#A08040]/30" />
                </motion.div>

            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <CeremonialModal
                        cert={selectedCert}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export default AuthorityArchive
