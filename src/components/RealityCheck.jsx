import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { User, ChevronDown, ArrowRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: "THE LEAKAGE" — HYBRID: People Icons + Ghost Patients to Competitor
// Philosophy: Lost patients visually "walk away" to competitor
// Visual: Premium timeline with emotional impact
// ═══════════════════════════════════════════════════════════════════════════════

const cinematicEase = [0.22, 1, 0.36, 1]
const springTransition = { type: "spring", stiffness: 100, damping: 15 }

// ═══════════════════════════════════════════════════════════════════════════════
// HYBRID PEOPLE ROW — Lost patients "walk away" to competitor
// ═══════════════════════════════════════════════════════════════════════════════
const HybridPeopleRow = ({ lostCount, delay, isInView, showCompetitorLabel = false, stage = 1 }) => {
    const remaining = 10 - lostCount
    const [animationTriggered, setAnimationTriggered] = useState(false)

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setAnimationTriggered(true), delay * 1000 + 500)
            return () => clearTimeout(timer)
        }
    }, [isInView, delay])

    return (
        <div className="relative">
            {/* Main People Row */}
            <div className="flex gap-1.5 sm:gap-2 justify-center items-center">
                {Array.from({ length: 10 }).map((_, i) => {
                    const isLost = i >= remaining
                    const lostIndex = i - remaining // 0, 1, 2... for lost persons

                    return (
                        <motion.div
                            key={i}
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? {
                                opacity: 1,
                                scale: 1,
                            } : {}}
                            transition={{
                                delay: delay + i * 0.05,
                                duration: 0.4,
                                ease: cinematicEase
                            }}
                        >
                            {/* Active Person - Gold with Glow */}
                            {!isLost && (
                                <motion.div
                                    className="relative"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <User
                                        size={26}
                                        className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                                        strokeWidth={2.5}
                                    />
                                    {/* Subtle pulse glow for active */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        animate={{
                                            boxShadow: [
                                                '0 0 0 0 rgba(251, 191, 36, 0)',
                                                '0 0 8px 2px rgba(251, 191, 36, 0.3)',
                                                '0 0 0 0 rgba(251, 191, 36, 0)'
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                    />
                                </motion.div>
                            )}

                            {/* Lost Person - Ghost Walking Away */}
                            {isLost && (
                                <motion.div
                                    className="relative"
                                    initial={{ x: 0, opacity: 1 }}
                                    animate={animationTriggered ? {
                                        x: [0, 4, 8],
                                        opacity: [1, 0.6, 0.35]
                                    } : {}}
                                    transition={{
                                        delay: lostIndex * 0.15,
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}
                                >
                                    <User
                                        size={26}
                                        className="text-zinc-600"
                                        strokeWidth={1.5}
                                    />
                                    {/* Red X overlay */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={animationTriggered ? {
                                            opacity: 1,
                                            scale: 1
                                        } : {}}
                                        transition={{
                                            delay: lostIndex * 0.15 + 0.3,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                    >
                                        <div className="w-4 h-0.5 bg-red-500/80 rotate-45 absolute" />
                                        <div className="w-4 h-0.5 bg-red-500/80 -rotate-45 absolute" />
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}

                {/* "→ KOMPETITOR" Label - appears after lost patients */}
                {showCompetitorLabel && lostCount > 0 && (
                    <motion.div
                        className="flex items-center gap-1 ml-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={animationTriggered ? {
                            opacity: 1,
                            x: 0
                        } : {}}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight size={14} className="text-red-400" />
                        </motion.div>
                        <span className="text-[10px] sm:text-xs text-red-400/80 font-medium tracking-wide whitespace-nowrap">
                            KOMPETITOR
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Ghost trail effect for walking away */}
            {lostCount > 0 && animationTriggered && (
                <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(lostCount, 3) }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: [0, 20, 40],
                                    opacity: [0.2, 0.1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3
                                }}
                            >
                                <User size={16} className="text-zinc-700" strokeWidth={1} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENHANCED ARROW CONNECTOR - With Warning Badge
// ═══════════════════════════════════════════════════════════════════════════════
const ArrowConnector = ({ delay, isInView, leakPercent, severity = 'warning' }) => {
    const colors = {
        warning: {
            line: 'from-amber-500/50 to-amber-600/30',
            badge: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
            glow: 'rgba(245, 158, 11, 0.3)'
        },
        danger: {
            line: 'from-red-500/50 to-red-600/30',
            badge: 'bg-red-500/20 border-red-500/40 text-red-400',
            glow: 'rgba(239, 68, 68, 0.3)'
        }
    }

    const color = colors[severity]

    return (
        <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ delay, duration: 0.5, ease: cinematicEase }}
            className="flex flex-col items-center py-4 origin-top"
        >
            {/* Upper line */}
            <div className={`w-px h-4 bg-gradient-to-b ${color.line}`} />

            {/* Leak percentage badge */}
            {leakPercent && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
                    className={`
                        px-3 py-1.5 rounded-full border text-xs font-bold
                        ${color.badge}
                        flex items-center gap-1.5
                    `}
                    style={{ boxShadow: `0 0 20px ${color.glow}` }}
                >
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ⚠️
                    </motion.span>
                    <span>-{leakPercent}%</span>
                    <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >
                        <ArrowRight size={12} />
                    </motion.div>
                </motion.div>
            )}

            {/* Lower line */}
            <div className={`w-px h-4 bg-gradient-to-b ${color.line}`} />

            {/* Animated chevron */}
            <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown size={18} className="text-zinc-500 -mt-1" />
            </motion.div>
        </motion.div>
    )
}

const RealityCheck = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 bg-[#030303] overflow-hidden"
        >
            {/* Premium Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(197, 160, 89, 0.04) 0%, transparent 60%)'
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-xl mx-auto px-6">

                {/* HEADLINE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    className="text-center mb-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#C5A059]/40" />
                        <span className="text-[#C5A059] text-[9px] font-bold tracking-[0.5em] uppercase">
                            The Leakage
                        </span>
                        <div className="h-px w-8 bg-[#C5A059]/40" />
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight tracking-tight">
                        ANDA SEDANG <span className="text-[#D14900] italic">MEMBIAYAI</span> KOMPETITOR
                        <br />
                        <span className="text-zinc-400 text-lg md:text-xl font-normal">secara bertahun-tahun tanpa sadar</span>
                    </h2>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* ENTRY — All 10 People                                           */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: cinematicEase }}
                >
                    <div
                        className="p-5 rounded-2xl text-center border border-[#C5A059]/20"
                        style={{
                            background: 'linear-gradient(180deg, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.02) 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(197, 160, 89, 0.15)'
                        }}
                    >
                        {/* Stage Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/30 flex items-center justify-center">
                                <span className="text-[#C5A059] text-sm font-bold">1</span>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#C5A059]/30 to-transparent" />
                            <span className="text-[#C5A059]/60 text-[10px] font-semibold tracking-widest uppercase">DISCOVERY</span>
                        </div>

                        {/* Quote Box with highlighted keywords */}
                        <div className="bg-[#C5A059]/5 border border-[#C5A059]/10 rounded-lg p-3 mb-4">
                            <p className="text-zinc-300 text-sm italic leading-relaxed">
                                "Pasien menemukan klinik Anda melalui <span className='text-[#C5A059] font-medium not-italic'>rekomendasi</span> atau pencarian. <span className='text-[#C5A059] font-medium not-italic'>Ekspektasi tinggi</span> terbentuk."
                            </p>
                        </div>

                        <HybridPeopleRow lostCount={0} delay={0.3} isInView={isInView} stage={1} />

                        <p className="text-[#C5A059]/70 text-xs mt-3 font-medium">
                            10 dari 10 pasien tertarik
                        </p>
                    </div>
                </motion.div>

                {/* Arrow with leak indicator */}
                <ArrowConnector delay={0.5} isInView={isInView} leakPercent={40} severity="warning" />

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* CHECKPOINT 1 — Cek Website (40% lost)                           */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6, ease: cinematicEase }}
                >
                    <div
                        className="p-5 rounded-xl border border-orange-900/30"
                        style={{
                            background: 'linear-gradient(180deg, rgba(234, 88, 12, 0.06) 0%, rgba(234, 88, 12, 0.02) 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(234, 88, 12, 0.1)'
                        }}
                    >
                        {/* ENHANCED Stage Header - More Prominent */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/25 border border-orange-500/40 flex items-center justify-center">
                                <span className="text-orange-400 text-base font-bold">2</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-orange-400 text-sm md:text-base font-bold tracking-wide uppercase">
                                    WEBSITE CHECK
                                </h3>
                            </div>
                        </div>

                        {/* Quote Box with highlighted keywords (RED) */}
                        <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg p-3 mb-4">
                            <p className="text-zinc-300 text-sm italic leading-relaxed">
                                "Tampilan <span className='text-orange-400 font-medium not-italic'>tidak match</span> dengan ekspektasi. Pasien mulai <span className='text-orange-400 font-medium not-italic'>meragukan kredibilitas</span>."
                            </p>
                        </div>

                        <HybridPeopleRow lostCount={4} delay={0.8} isInView={isInView} showCompetitorLabel={true} stage={2} />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.3 }}
                            className="text-orange-400 text-sm font-semibold text-center mt-3"
                        >
                            4 dari 10 mulai ragu
                        </motion.p>
                    </div>
                </motion.div>

                {/* Arrow with leak indicator */}
                <ArrowConnector delay={0.9} isInView={isInView} leakPercent={35} severity="danger" />

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* CHECKPOINT 2 — Tanya Admin (35% more lost = 75% total)          */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0, duration: 0.6, ease: cinematicEase }}
                >
                    <div
                        className="p-5 rounded-xl border border-red-900/40"
                        style={{
                            background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.06) 0%, rgba(220, 38, 38, 0.02) 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(220, 38, 38, 0.1)'
                        }}
                    >
                        {/* ENHANCED Stage Header - More Prominent */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-red-500/25 border border-red-500/40 flex items-center justify-center">
                                <span className="text-red-400 text-base font-bold">3</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-red-400 text-sm md:text-base font-bold tracking-wide uppercase">
                                    ADMIN CONTACT
                                </h3>
                            </div>
                        </div>

                        {/* Quote Box with highlighted keywords (RED) */}
                        <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 mb-4">
                            <p className="text-zinc-300 text-sm italic leading-relaxed">
                                "Respons admin <span className='text-red-400 font-medium not-italic'>tidak bisa menghilangkan</span> keraguan. Pasien <span className='text-red-400 font-medium not-italic'>mencari alternatif</span>."
                            </p>
                        </div>

                        <HybridPeopleRow lostCount={7} delay={1.2} isInView={isInView} showCompetitorLabel={true} stage={3} />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.7 }}
                            className="text-red-400 text-sm font-semibold text-center mt-3"
                        >
                            Hanya 3 orang tersisa
                        </motion.p>
                    </div>
                </motion.div>

                {/* Arrow to final */}
                <ArrowConnector delay={1.3} isInView={isInView} />

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* FINAL CARD — Enhanced with Ghost Patients to Competitor         */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4, duration: 0.6, ease: cinematicEase }}
                >
                    <div
                        className="relative p-6 rounded-2xl text-center overflow-hidden"
                        style={{
                            background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.18) 0%, rgba(80, 0, 0, 0.10) 100%)',
                            boxShadow: '0 0 60px rgba(139, 0, 0, 0.2), inset 0 1px 0 rgba(255, 100, 100, 0.15), inset 0 0 20px rgba(139, 0, 0, 0.1)',
                            border: '1px solid rgba(180, 0, 0, 0.4)'
                        }}
                    >
                        {/* Animated background pulse */}
                        <motion.div
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-2xl"
                            style={{
                                background: 'radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.12), transparent 70%)'
                            }}
                        />

                        <div className="relative z-10">
                            {/* Big Impact Number */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
                                className="mb-4"
                            >
                                <span className="text-5xl md:text-6xl font-bold text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                                    75%
                                </span>
                            </motion.div>

                            <h3 className="font-serif text-lg md:text-xl text-white leading-snug mb-2">
                                Potensi Pasien <span className="text-red-400 italic">Hilang</span>
                            </h3>

                            <p className="text-zinc-500 text-xs mb-5">
                                Setiap hari. Setiap minggu. Bertahun-tahun.
                            </p>

                            {/* Visual: Clear comparison ANDA vs KOMPETITOR */}
                            <div className="relative py-4 mb-4">
                                <div className="flex items-center justify-center gap-4">

                                    {/* YOUR SIDE - 3 remaining patients */}
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-[10px] text-amber-400/70 font-semibold tracking-wider">ANDA</span>
                                        <div className="flex gap-1.5 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={`stay-${i}`}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                    transition={{ delay: 1.8 + i * 0.1 }}
                                                >
                                                    <User size={20} className="text-amber-400" strokeWidth={2.5} />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <span className="text-amber-400/60 text-xs font-medium">3 orang</span>
                                    </div>

                                    {/* FLOW ARROWS */}
                                    <div className="flex flex-col items-center gap-1">
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="flex gap-0.5"
                                        >
                                            <ArrowRight size={16} className="text-red-400" />
                                            <ArrowRight size={16} className="text-red-400/60" />
                                        </motion.div>
                                        <span className="text-[9px] text-red-400/50">pindah</span>
                                    </div>

                                    {/* COMPETITOR SIDE - 7 lost patients */}
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-[10px] text-red-400/70 font-semibold tracking-wider">KOMPETITOR</span>
                                        <div className="flex gap-1 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                                            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                                                <motion.div
                                                    key={`lost-${i}`}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{
                                                        delay: 2 + i * 0.08,
                                                        type: "spring",
                                                        stiffness: 150
                                                    }}
                                                >
                                                    <User size={18} className="text-red-400/80" strokeWidth={1.5} />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <span className="text-red-400/60 text-xs font-medium">7 orang</span>
                                    </div>
                                </div>
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 2.2 }}
                                className="text-zinc-100 text-xs font-bold uppercase tracking-[0.2em]"
                            >
                                Tanpa Anda Sadari
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                {/* HOPE TEASER with gold separator */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.8, duration: 0.6, ease: cinematicEase }}
                    className="mt-12 text-center"
                >
                    {/* Gold separator line */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/60" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]/50" />
                    </div>

                    <p className="text-[#C5A059] text-lg md:text-xl font-serif italic">
                        "Bagaimana jika <span className="text-white font-bold not-italic">75%</span> menjadi milik Anda?"
                    </p>
                </motion.div>

            </div>
        </section>
    )
}

export default RealityCheck
