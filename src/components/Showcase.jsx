import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, CheckCircle, Zap, Lock } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: "THE ELEVATED SHOWCASE" — Premium Video Presentation
// Philosophy: Blur-to-sharp transitions, progress awareness, refined hierarchy
// Score Target: 78% → 95%
// ═══════════════════════════════════════════════════════════════════════════════

// Premium easing
const cinematicEase = [0.22, 1, 0.36, 1]

const PROTOCOL_DATA = [
    {
        id: 'authority',
        tabLabel: 'Visual Authority',
        icon: Layout,
        videoSrc: '/Video_UiUx.mp4',
        headline: 'VISUAL AUTHORITY',
        subHeadline: 'Website Anda Adalah Konsultasi Pertama.',
        body: 'Jangan biarkan visual standar mendegradasi reputasi klinis Anda. Kami merekayasa estetika yang mencerminkan standar premium, memvalidasi kompetensi Anda bahkan sebelum pasien melangkah masuk ke klinik.',
        statLabel: 'Avg. Hook Retention',
        statValue: '3.5s',
        statSuffix: null
    },
    {
        id: 'smart-booking',
        tabLabel: 'AI Smart Booking',
        icon: CheckCircle,
        videoSrc: '/video booking.mp4',
        headline: 'AI SMART BOOKING',
        subHeadline: 'Konversi Instan dengan Kecerdasan Buatan.',
        body: 'AI Concierge yang cerdas menjawab pertanyaan medis 24/7 dan mengunci komitmen pasien dengan sistem booking otomatis. Mengubah "Nanti Saya Kabari" menjadi "Pembayaran Berhasil" dalam hitungan detik.',
        statLabel: 'Show-up Rate',
        statValue: '98.5%',
        statSuffix: 'LOCKED',
        statIcon: Lock
    }
]

const Showcase = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [videoProgress, setVideoProgress] = useState(0)
    const videoRef = useRef(null)
    const activeData = PROTOCOL_DATA[activeTab]

    // Video progress tracking
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            if (video.duration) {
                setVideoProgress((video.currentTime / video.duration) * 100)
            }
        }

        video.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [activeTab])

    // Reset progress on tab change
    useEffect(() => {
        setVideoProgress(0)
    }, [activeTab])

    return (
        <section className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden bg-[#FAFAF9]">

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* AMBIENT BACKGROUND — Light Mode                                     */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A08040]/5 rounded-full blur-[150px]" />
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(#d6d3d1 1px, transparent 1px), linear-gradient(90deg, #d6d3d1 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* SECTION TAG — Light Mode                                        */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    className="flex items-center justify-center gap-4 mb-6"
                >
                    <div className="h-[1px] w-8 bg-[#A08040]/50" />
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-[#A08040]" fill="#A08040" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#A08040] font-bold">
                            Protocol in Action
                        </span>
                    </div>
                    <div className="h-[1px] w-8 bg-[#A08040]/50" />
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* DYNAMIC HEADER — Light Mode                                      */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <div className="text-center mb-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                            transition={{ duration: 0.5, ease: cinematicEase }}
                            className="max-w-3xl mx-auto"
                        >
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C1917] mb-4 tracking-tight">
                                {activeData.headline}
                            </h2>
                            <p className="text-lg md:text-xl text-[#A08040] italic mb-4 font-serif">
                                {activeData.subHeadline}
                            </p>
                            <p className="text-[#57534E] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                                {activeData.body}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* REFINED TAB CONTROLLER — Light Mode                             */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <div className="flex justify-center mb-10">
                    <div className="bg-white/80 p-1.5 rounded-full border border-stone-200 backdrop-blur-sm inline-flex relative shadow-lg shadow-black/5">
                        {PROTOCOL_DATA.map((tab, index) => {
                            const isActive = activeTab === index
                            const Icon = tab.icon

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`
                                        relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none
                                        ${isActive ? 'text-white' : 'text-stone-500 hover:text-stone-800'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBlob"
                                            className="absolute inset-0 bg-[#1C1917] rounded-full"
                                            style={{
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                                            }}
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon size={16} />
                                        {tab.tabLabel}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* THE TITANIUM FRAME — Enhanced with Premium Transitions          */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    className="relative w-full max-w-5xl mx-auto"
                >
                    {/* Video Container with Aspect Ratio */}
                    <div
                        className="relative aspect-video rounded-2xl overflow-hidden bg-[#080808] group"
                        style={{
                            boxShadow: '0 50px 100px -30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                        }}
                    >
                        {/* Glass Frame Border */}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none z-50">
                            <div className="absolute inset-0 rounded-2xl border border-white/10" />
                            {/* Top highlight */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            {/* Side vignette */}
                            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
                        </div>

                        {/* Glass Reflection */}
                        <div
                            className="absolute inset-0 z-40 pointer-events-none opacity-30 mix-blend-overlay"
                            style={{
                                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 35%, transparent 40%)'
                            }}
                        />

                        {/* Video with Blur-to-Sharp Transition */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 1.02, filter: 'blur(20px)' }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'blur(0px)'
                                }}
                                exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                transition={{ duration: 0.7, ease: cinematicEase }}
                                className="absolute inset-0"
                            >
                                <video
                                    ref={videoRef}
                                    src={activeData.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                            </motion.div>
                        </AnimatePresence>

                        {/* SYSTEM ACTIVE INDICATOR (Top Right) */}
                        <div className="absolute top-4 right-4 z-50">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-lg"
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            '0 0 4px #10b981',
                                            '0 0 12px #10b981',
                                            '0 0 4px #10b981'
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                                />
                                <span className="text-[10px] uppercase tracking-widest text-white/70 font-medium">
                                    System Active
                                </span>
                            </motion.div>
                        </div>

                        {/* HUD OVERLAY (Bottom Left) */}
                        <div className="absolute bottom-4 left-4 z-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab + 'hud'}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.4, ease: cinematicEase }}
                                    className="px-4 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex flex-col shadow-xl min-w-[140px]"
                                >
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 mb-1">
                                        {activeData.statLabel}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {activeData.statIcon && (
                                            <activeData.statIcon size={14} className="text-[#C5A059]" />
                                        )}
                                        <span className="font-mono font-bold text-lg text-white">
                                            {activeData.statValue}
                                            {activeData.statSuffix && (
                                                <span className="text-[#C5A059] ml-1.5 text-xs tracking-wider">
                                                    {activeData.statSuffix}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ─────────────────────────────────────────────────────────── */}
                    {/* VIDEO PROGRESS BAR — Loop Position Indicator                */}
                    {/* ─────────────────────────────────────────────────────────── */}
                    <div className="mt-4 flex items-center gap-4 max-w-5xl mx-auto px-2">
                        <div className="flex-1 h-[2px] bg-stone-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#A08040] rounded-full"
                                style={{ width: `${videoProgress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A08040] animate-pulse" />
                            <span className="text-[10px] text-stone-500 uppercase tracking-widest">
                                Loop
                            </span>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}

export default Showcase
