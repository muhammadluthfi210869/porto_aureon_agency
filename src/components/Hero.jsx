import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { heroConfig } from '../config/hero.config'
import { useRef, useState } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// WORLD-CLASS HERO SECTION — "The Cinematic Fade"
// Philosophy: Understated elegance. Minimal movement, maximum impact.
// Inspired by: Apple, Porsche, Aesop
// ═══════════════════════════════════════════════════════════════════════════════

// Premium easing curve - smooth deceleration
const cinematicEase = [0.22, 1, 0.36, 1]

// Magnetic button wrapper - cursor following effect
const MagneticButton = ({ children }) => {
    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const handleMouseMove = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        x.set((e.clientX - centerX) * 0.25)
        y.set((e.clientY - centerY) * 0.25)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
        >
            {children}
        </motion.div>
    )
}

const Hero = () => {
    const sectionRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    // Parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })

    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

    // ═══════════════════════════════════════════════════════════════════════════
    // CINEMATIC TIMING — Slow, deliberate, confident
    // ═══════════════════════════════════════════════════════════════════════════
    const timing = {
        image: 0,
        tagline: 0.3,
        headlineMain: 0.6,
        headlineAccent: 0.9,
        subtext: 1.3,
        cta: 1.7,
        scrollIndicator: 2.2
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden font-sans"
        >

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* BACKGROUND IMAGE — Ken Burns + Parallax                             */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 z-0"
            >
                {/* Blur placeholder for progressive loading */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: imageLoaded ? 0 : 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-[#050505]"
                    style={{
                        backgroundImage: `url(${heroConfig.image.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: '65% center',
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                    }}
                />

                {/* Main image with slow Ken Burns */}
                <motion.img
                    src={heroConfig.image.src}
                    alt={heroConfig.image.alt}
                    onLoad={() => setImageLoaded(true)}
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: imageLoaded ? 0.9 : 0
                    }}
                    transition={{
                        duration: 2.5,
                        ease: cinematicEase
                    }}
                    className="w-full h-full object-cover object-[65%_center] md:object-center"
                />
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CINEMATIC GRADIENT OVERLAY                                          */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 via-35% to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-transparent" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CONTENT — The Cinematic Fade Choreography                           */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="absolute bottom-0 left-0 z-20 w-full px-6 pb-14 md:pb-20"
            >
                <div className="max-w-3xl">

                    {/* ─────────────────────────────────────────────────────────── */}
                    {/* TAGLINE — Gentle fade with expanding line                    */}
                    {/* ─────────────────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: timing.tagline,
                            duration: 1,
                            ease: cinematicEase
                        }}
                        className="flex items-center gap-3 mb-5"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 32 }}
                            transition={{
                                delay: timing.tagline + 0.3,
                                duration: 0.8,
                                ease: cinematicEase
                            }}
                            className="h-[1px] bg-[#C5A059]"
                        />
                        <span className="text-[#C5A059] text-[11px] font-semibold tracking-[0.35em] uppercase">
                            {heroConfig.tagline}
                        </span>
                    </motion.div>

                    {/* ─────────────────────────────────────────────────────────── */}
                    {/* HEADLINE — Slow, confident fade                              */}
                    {/* ─────────────────────────────────────────────────────────── */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-[0.95]">
                        {/* Primary headline */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: timing.headlineMain,
                                duration: 1.2,
                                ease: cinematicEase
                            }}
                            className="block"
                        >
                            {heroConfig.headline.line1}
                        </motion.span>

                        {/* Accent headline — GOLD for authority */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: timing.headlineAccent,
                                duration: 1.2,
                                ease: cinematicEase
                            }}
                            className="block italic font-light text-[#C5A059]"
                        >
                            {heroConfig.headline.line2}
                        </motion.span>
                    </h1>

                    {/* ─────────────────────────────────────────────────────────── */}
                    {/* SUBTEXT — Slide in with border reveal                        */}
                    {/* ─────────────────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: timing.subtext,
                            duration: 1,
                            ease: cinematicEase
                        }}
                        className="mt-6 border-l-2 border-[#C5A059]/60 pl-4"
                    >
                        <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                            {heroConfig.subheadline}
                        </p>
                    </motion.div>

                    {/* ─────────────────────────────────────────────────────────── */}
                    {/* MAGNETIC CTA — Glass Pill with Ambient Glow                  */}
                    {/* ─────────────────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 25, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: timing.cta,
                            duration: 1,
                            ease: cinematicEase
                        }}
                        className="mt-10"
                    >
                        <MagneticButton>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="group relative px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:ring-offset-2 focus:ring-offset-[#050505]"
                            >
                                {/* Ambient glow pulse */}
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            '0 0 20px rgba(197, 160, 89, 0)',
                                            '0 0 35px rgba(197, 160, 89, 0.12)',
                                            '0 0 20px rgba(197, 160, 89, 0)'
                                        ]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 rounded-full"
                                />

                                {/* Hover fill effect */}
                                <div className="absolute inset-0 w-full h-full bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                                {/* Hover glow enhancement */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(197,160,89,0.25)] rounded-full" />

                                <div className="relative flex items-center gap-4">
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white group-hover:text-black transition-colors duration-300">
                                        {heroConfig.ctaText}
                                    </span>

                                    {/* Arrow slide animation */}
                                    <div className="relative w-4 h-4 overflow-hidden">
                                        <ArrowRight
                                            size={16}
                                            className="absolute inset-0 text-[#C5A059] transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:text-black"
                                        />
                                        <ArrowRight
                                            size={16}
                                            className="absolute inset-0 -translate-x-5 text-black transition-all duration-300 ease-out group-hover:translate-x-0"
                                        />
                                    </div>
                                </div>
                            </motion.button>
                        </MagneticButton>
                    </motion.div>

                </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* SCROLL INDICATOR — Minimal & Elegant                                */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: timing.scrollIndicator, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <motion.span
                    className="text-[9px] tracking-[0.3em] uppercase text-white/40"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    Scroll
                </motion.span>

                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="flex flex-col items-center"
                >
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[#C5A059]/80 to-transparent" />
                    <ChevronDown size={12} className="text-[#C5A059]/50 -mt-1" />
                </motion.div>
            </motion.div>

        </section>
    )
}

export default Hero
