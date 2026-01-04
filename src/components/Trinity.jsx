import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { User, ChevronDown, Check, X, Sparkles, ArrowRight, Shield } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: "THE SOLUTION" — Mirror of Section 2 with GOLD/SUCCESS theme
// Philosophy: Show how Aureon SEALS the leaks, people STAY instead of leaving
// Visual: Option C hierarchy style with GOLD colors (matching Aureon brand)
// ═══════════════════════════════════════════════════════════════════════════════

const cinematicEase = [0.22, 1, 0.36, 1]
const goldColor = '#C5A059'

const successPoints = [
    {
        id: 1,
        stage: 'CEK WEBSITE',
        // Keywords highlighted: otoritas, profesionalisme, yakin
        solutionParts: [
            { text: 'Website Anda memancarkan ', highlight: false },
            { text: 'otoritas', highlight: true },
            { text: ' dan ', highlight: false },
            { text: 'profesionalisme', highlight: true },
            { text: '. Sebagian besar langsung ', highlight: false },
            { text: 'yakin', highlight: true },
            { text: ', sisanya masih mempertimbangkan.', highlight: false },
        ],
        peopleStay: 8,
        peopleLost: 2,
        statusText: '8 orang langsung yakin',
    },
    {
        id: 2,
        stage: 'TANYA AI',
        // Keywords highlighted: empati, tidak pergi, menahan
        solutionParts: [
            { text: 'AI menjawab pertanyaan dengan ', highlight: false },
            { text: 'empati', highlight: true },
            { text: '. Beberapa masih ragu, tapi ', highlight: false },
            { text: 'tidak pergi', highlight: true },
            { text: ' — sistem ', highlight: false },
            { text: 'menahan', highlight: true },
            { text: ' mereka.', highlight: false },
        ],
        peopleStay: 5,
        peopleLost: 5,
        statusText: '5 orang siap booking',
        showHesitant: true,
    },
    {
        id: 3,
        stage: 'FOLLOW UP',
        // Keywords highlighted: kembali, tidak membiarkan, lolos
        solutionParts: [
            { text: 'Follow-up otomatis ', highlight: false },
            { text: 'membawa kembali', highlight: true },
            { text: ' yang ragu. Sistem ', highlight: false },
            { text: 'tidak membiarkan', highlight: true },
            { text: ' siapapun ', highlight: false },
            { text: 'lolos', highlight: true },
            { text: '.', highlight: false },
        ],
        peopleStay: 9,
        peopleLost: 1,
        recovered: 4,
        statusText: '4 orang kembali! Total 9 booking',
        showRecovery: true,
    }
]

// ═══════════════════════════════════════════════════════════════════════════════
// DYNAMIC PEOPLE ROW — Shows stay, hesitant, and recovered states (GOLD THEME)
// ═══════════════════════════════════════════════════════════════════════════════
const DynamicPeopleRow = ({ stayCount, hesitantCount = 0, recoveredCount = 0, showRecovery = false, isInView, delay }) => {
    const [animationTriggered, setAnimationTriggered] = useState(false)
    const [showRecoveryAnim, setShowRecoveryAnim] = useState(false)
    const totalShown = stayCount + hesitantCount
    const lostToCompetitor = 10 - stayCount - (showRecovery ? 0 : hesitantCount)

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setAnimationTriggered(true), delay * 1000)
            const recoveryTimer = setTimeout(() => setShowRecoveryAnim(true), (delay + 0.8) * 1000)
            return () => {
                clearTimeout(timer)
                clearTimeout(recoveryTimer)
            }
        }
    }, [isInView, delay])

    return (
        <div className="relative">
            <div className="flex gap-1.5 sm:gap-2 justify-center items-center flex-wrap">
                {/* People who are CONFIRMED - GOLD */}
                {Array.from({ length: stayCount }).map((_, i) => {
                    const isRecovered = showRecovery && i >= (stayCount - recoveredCount)
                    return (
                        <motion.div
                            key={`stay-${i}`}
                            initial={{ opacity: 0, scale: 0.8, x: isRecovered ? 20 : 0 }}
                            animate={animationTriggered ? {
                                opacity: 1,
                                scale: 1,
                                x: 0,
                            } : {}}
                            transition={{
                                delay: isRecovered ? 0.6 + (i - (stayCount - recoveredCount)) * 0.1 : i * 0.05,
                                duration: 0.4,
                                ease: cinematicEase
                            }}
                        >
                            <User
                                size={24}
                                className={isRecovered
                                    ? "text-[#C5A059] drop-shadow-[0_0_12px_rgba(197,160,89,0.6)]"
                                    : "text-[#C5A059] drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]"
                                }
                                strokeWidth={2.5}
                            />
                        </motion.div>
                    )
                })}

                {/* Hesitant people - Amber (only show if not recovery stage) */}
                {hesitantCount > 0 && !showRecovery && Array.from({ length: hesitantCount }).map((_, i) => (
                    <motion.div
                        key={`hesitant-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={animationTriggered ? {
                            opacity: 0.6,
                            scale: 1,
                        } : {}}
                        transition={{
                            delay: stayCount * 0.05 + i * 0.05,
                            duration: 0.4,
                        }}
                    >
                        <User
                            size={24}
                            className="text-[#C5A059]/50"
                            strokeWidth={1.5}
                        />
                    </motion.div>
                ))}

                {/* Lost to competitor - Gray (minimal) */}
                {lostToCompetitor > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={animationTriggered ? { opacity: 0.3 } : {}}
                        transition={{ delay: totalShown * 0.05 + 0.2 }}
                        className="flex gap-1"
                    >
                        {Array.from({ length: Math.min(lostToCompetitor, 2) }).map((_, i) => (
                            <User key={i} size={22} className="text-zinc-700" strokeWidth={1} />
                        ))}
                    </motion.div>
                )}

                {/* BLOCKED Competitor label */}
                <motion.div
                    className="flex items-center gap-1.5 ml-2 px-2 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={animationTriggered ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <X size={12} className="text-red-500" />
                    <span className="text-[9px] text-zinc-500 font-medium tracking-wide line-through">
                        KOMPETITOR
                    </span>
                </motion.div>
            </div>
        </div>
    )
}


// ═══════════════════════════════════════════════════════════════════════════════
// ARROW CONNECTOR — Light Mode Gold theme
// ═══════════════════════════════════════════════════════════════════════════════
const ArrowConnector = ({ delay, isInView, showSealBadge = false }) => (
    <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ delay, duration: 0.5, ease: cinematicEase }}
        className="flex flex-col items-center py-4 origin-top"
    >
        <div className="w-px h-4 bg-gradient-to-b from-[#A08040]/60 to-[#A08040]/40" />

        {showSealBadge && (
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
                className="px-3 py-1.5 rounded-full border bg-white/90 border-[#A08040]/30 text-[#A08040] flex items-center gap-1.5"
                style={{ boxShadow: '0 4px 16px rgba(160, 128, 64, 0.15)' }}
            >
                <Check size={12} />
                <span className="text-xs font-bold">SEALED</span>
            </motion.div>
        )}

        <div className="w-px h-4 bg-gradient-to-b from-[#A08040]/60 to-[#A08040]/40" />

        <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
            <ChevronDown size={18} className="text-[#A08040]/60 -mt-1" />
        </motion.div>
    </motion.div>
)

const Trinity = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-16 px-6"
            style={{
                background: 'linear-gradient(180deg, #050505 0%, #1a1917 8%, #78716c 20%, #d6d3d1 35%, #FAFAF9 50%, #FAFAF9 100%)'
            }}
        >
            {/* Premium Light Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle warm radial for depth */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(197, 160, 89, 0.06) 0%, transparent 60%)'
                    }}
                />
                {/* Subtle noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")'
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-xl mx-auto">

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* HEADER — Light Mode Colors                                      */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    className="text-center mb-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#A08040]/40" />
                        <span className="text-[#A08040] text-[9px] font-bold tracking-[0.5em] uppercase">
                            The Solution
                        </span>
                        <div className="h-px w-8 bg-[#A08040]/40" />
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl text-[#1C1917] leading-tight tracking-tight mb-3">
                        Bagaimana Jika <span className="text-[#A08040] italic text-4xl md:text-5xl font-bold">90%</span>
                        <br />Menjadi Milik Anda?
                    </h2>
                    <p className="text-[#57534E] text-sm">
                        Dengan sistem yang tepat, kebocoran bisa ditutup.
                    </p>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* ENTRY CARD — Light Mode Premium Card                            */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: cinematicEase }}
                >
                    <div
                        className="p-5 rounded-2xl text-center border border-[#A08040]/20"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        {/* Stage Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-[#A08040]/15 border border-[#A08040]/25 flex items-center justify-center">
                                <Sparkles size={14} className="text-[#A08040]" />
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#A08040]/30 to-transparent" />
                            <span className="text-[#A08040]/80 text-[10px] font-semibold tracking-widest uppercase">START</span>
                        </div>

                        {/* Quote Box */}
                        <div className="bg-[#A08040]/5 border border-[#A08040]/10 rounded-lg p-3 mb-4">
                            <p className="text-[#44403C] text-sm italic leading-relaxed">
                                "10 pasien <span className="text-[#A08040] font-medium not-italic">tertarik</span> dengan klinik Anda. Inilah awal perjalanan mereka."
                            </p>
                        </div>

                        <div className="flex gap-1.5 justify-center mb-3">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                                >
                                    <User size={26} className="text-[#A08040] drop-shadow-[0_0_8px_rgba(160,128,64,0.3)]" strokeWidth={2.5} />
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-[#A08040]/80 text-xs font-medium">
                            10 dari 10 pasien tertarik
                        </p>
                    </div>
                </motion.div>

                {/* Arrow with SEALED badge */}
                <ArrowConnector delay={0.5} isInView={isInView} showSealBadge={true} />

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* SUCCESS CHECKPOINT CARDS — GOLD Theme with Enhanced Hierarchy   */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                {successPoints.map((point, index) => (
                    <div key={point.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 + index * 0.3, duration: 0.6, ease: cinematicEase }}
                        >
                            <div
                                className="p-5 rounded-2xl border border-[#A08040]/20"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                                }}
                            >
                                {/* ENHANCED Stage Header - Light Mode */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#A08040]/15 border border-[#A08040]/30 flex items-center justify-center">
                                        <span className="text-[#A08040] text-base font-bold">{point.id}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[#1C1917] text-sm md:text-base font-bold tracking-wide uppercase">
                                            {point.stage}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A08040]/15 border border-[#A08040]/25">
                                        <Shield size={12} className="text-[#A08040]" />
                                        <span className="text-[#A08040] text-[9px] font-bold">SEALED</span>
                                    </div>
                                </div>

                                {/* Quote Box with Highlighted Keywords - Light Mode */}
                                <div className="bg-[#A08040]/5 border border-[#A08040]/10 rounded-lg p-3 mb-4">
                                    <p className="text-[#44403C] text-sm italic leading-relaxed">
                                        "{point.solutionParts.map((part, i) => (
                                            part.highlight ? (
                                                <span key={i} className="text-[#A08040] font-semibold not-italic">{part.text}</span>
                                            ) : (
                                                <span key={i}>{part.text}</span>
                                            )
                                        ))}"
                                    </p>
                                </div>

                                {/* Dynamic People Row */}
                                <DynamicPeopleRow
                                    stayCount={point.peopleStay}
                                    hesitantCount={point.showHesitant ? 10 - point.peopleStay : 0}
                                    recoveredCount={point.recovered || 0}
                                    showRecovery={point.showRecovery || false}
                                    isInView={isInView}
                                    delay={0.9 + index * 0.3}
                                />

                                {/* Success Label */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 1.1 + index * 0.3, duration: 0.4 }}
                                    className="mt-3 text-center"
                                >
                                    <span className="text-[#A08040] text-sm font-medium">
                                        {point.showRecovery ? '↩ ' : '✓ '}{point.statusText}
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Arrow Connector */}
                        {index < successPoints.length - 1 && (
                            <ArrowConnector delay={1.2 + index * 0.3} isInView={isInView} />
                        )}
                    </div>
                ))}

                {/* Arrow to Result */}
                <ArrowConnector delay={2} isInView={isInView} />

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* FINAL RESULT — Side-by-Side Comparison (GOLD Theme)             */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2.2, duration: 0.6, ease: cinematicEase }}
                >
                    <p className="text-center text-[#57534E] text-xs mb-4 uppercase tracking-widest">
                        Hasil Dengan Aureon
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {/* YOUR CLINIC — WINNER (GOLD on Light) */}
                        <div
                            className="p-5 rounded-2xl text-center border border-[#A08040]/30"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
                                boxShadow: '0 8px 32px rgba(160, 128, 64, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                            }}
                        >
                            <div className="flex items-center justify-center gap-1.5 mb-4">
                                <Check size={14} className="text-[#A08040]" />
                                <span className="text-[#A08040] text-[10px] font-bold uppercase tracking-widest">
                                    Klinik Anda
                                </span>
                            </div>

                            <div className="flex justify-center gap-1 flex-wrap mb-4">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 2.4 + i * 0.05, duration: 0.4 }}
                                    >
                                        <User size={20} className="text-[#A08040]" strokeWidth={2} />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.p
                                initial={{ scale: 0.8 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 2.6, type: "spring", stiffness: 200 }}
                                className="text-[#1C1917] text-3xl font-bold mb-2"
                            >
                                9 orang
                            </motion.p>
                            <p className="text-[#A08040]/80 text-[11px] leading-snug">
                                Yakin — langsung<br />booking dengan percaya diri
                            </p>
                        </div>

                        {/* COMPETITOR — BLOCKED (Muted on Light) */}
                        <div
                            className="p-5 rounded-2xl text-center border border-stone-300/60"
                            style={{
                                background: 'linear-gradient(180deg, rgba(245, 245, 244, 0.9) 0%, rgba(231, 229, 228, 0.7) 100%)'
                            }}
                        >
                            <div className="flex items-center justify-center gap-1.5 mb-4">
                                <X size={14} className="text-red-400/70" />
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest line-through">
                                    Kompetitor
                                </span>
                            </div>

                            <div className="flex justify-center gap-1 mb-4 h-[28px] items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
                                    transition={{ delay: 2.7, duration: 0.4 }}
                                >
                                    <User size={20} className="text-stone-400" strokeWidth={1.5} />
                                </motion.div>
                            </div>

                            <p className="text-stone-400 text-3xl font-bold mb-2">1 orang</p>
                            <p className="text-stone-400 text-[11px] leading-snug">
                                Tidak dapat apa-apa<br />dari usaha Anda
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* FINAL COPY — Light Mode                                         */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 2.8, duration: 0.6 }}
                    className="mt-8 text-center"
                >
                    <p className="text-[#57534E] text-sm md:text-base leading-relaxed">
                        Pasien yang <span className="text-[#1C1917] font-medium">Anda tarik dengan usaha Anda</span>,<br />
                        menjadi <span className="text-[#A08040] font-medium">omset Anda</span>. Bukan orang lain.
                    </p>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* CTA TRANSITION — Light Mode with Gold Accent                    */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 3.2, duration: 0.6, ease: cinematicEase }}
                    className="mt-10 text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#A08040]/15 to-[#A08040]/10 border border-[#A08040]/25 cursor-pointer group"
                        whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(160, 128, 64, 0.15)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Sparkles size={16} className="text-[#A08040]" />
                        <span className="text-[#A08040] text-sm font-medium">
                            Lihat bagaimana sistemnya bekerja
                        </span>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowRight size={16} className="text-[#A08040]" />
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}

export default Trinity
