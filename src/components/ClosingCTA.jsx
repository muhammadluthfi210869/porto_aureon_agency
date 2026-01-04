import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Crown, X, Sparkles, Shield, ArrowRight, Check } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: CLOSING CTA — "Luxury VIP Access Card" (Option C)
// Philosophy: Premium Black Card like AMEX Centurion with Gold Accents
// Texture: Metallic Shimmer effect for luxurious feel
// ═══════════════════════════════════════════════════════════════════════════════

const cinematicEase = [0.22, 1, 0.36, 1]

const ClosingCTA = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })

    // Economy card - STATIC, no scroll animation
    // Card stays visible all the time

    // VIP card reveal
    const cardOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.5, 1])
    const cardScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.9, 0.95, 1])
    const cardY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [60, 30, 0])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[120vh] flex flex-col items-center justify-start pt-20 pb-32 px-6 overflow-hidden"
            style={{
                // Built-in gradient transition: Dark → Light (from Architect)
                background: 'linear-gradient(180deg, #050505 0%, #1a1917 5%, #78716c 15%, #d6d3d1 25%, #FAFAF9 40%, #F5F5F4 70%, #FAFAF9 100%)'
            }}
        >
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* AMBIENT BACKGROUND — Light Mode with Subtle Gold Glow               */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A08040]/5 rounded-full blur-[200px]" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(#d6d3d1 1px, transparent 1px), linear-gradient(90deg, #d6d3d1 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto">

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* HEADER — Light Mode                                             */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    className="text-center mb-10"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles size={14} className="text-[#A08040]" />
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#A08040] font-bold">
                            Exclusive Access
                        </p>
                        <Sparkles size={14} className="text-[#A08040]" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#1C1917] leading-tight">
                        Masa Depan Klinik Anda <br />
                        <span className="text-[#A08040] italic">Dimulai Di Sini</span>
                    </h2>
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* EKONOMI CARD — Broken/Cracked Card (STATIC - no scroll animation) */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: cinematicEase }}
                    className="relative mb-6"
                >
                    <div
                        className="relative p-5 rounded-xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(180deg, #1a1512 0%, #0d0a08 100%)',
                            border: '1px solid rgba(120, 40, 40, 0.4)'
                        }}
                    >
                        {/* Heavy Damaged/Worn texture overlay */}
                        <div
                            className="absolute inset-0 opacity-70 pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                            }}
                        />

                        {/* Multiple scratch marks / damage lines */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {/* Diagonal scratches - more intense */}
                            <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-red-900/30 to-transparent rotate-12 transform origin-top" />
                            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-red-800/25 to-transparent -rotate-6 transform origin-top" />
                            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-600/20 to-transparent rotate-3 transform origin-top" />
                            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-900/20 to-transparent -rotate-12 transform origin-top" />

                            {/* Worn/torn edges - more aggressive */}
                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
                            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent" />
                        </div>

                        {/* Heavy Crack lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-80">
                            <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
                                {/* Major crack from top-left */}
                                <path d="M20,0 L30,20 L15,40 L35,60 L20,80 L30,100 L15,120" stroke="rgba(100,30,30,0.6)" strokeWidth="2" fill="none" />
                                <path d="M30,20 L50,30" stroke="rgba(100,30,30,0.4)" strokeWidth="1" fill="none" />
                                <path d="M35,60 L55,65 L60,80" stroke="rgba(100,30,30,0.4)" strokeWidth="1" fill="none" />

                                {/* Major crack from top-right */}
                                <path d="M180,0 L170,25 L185,50 L165,75 L180,100 L170,120" stroke="rgba(100,30,30,0.5)" strokeWidth="1.5" fill="none" />
                                <path d="M170,25 L150,35" stroke="rgba(100,30,30,0.3)" strokeWidth="1" fill="none" />

                                {/* Center spider crack - larger */}
                                <path d="M100,55 L80,30 M100,55 L125,35 M100,55 L75,70 M100,55 L130,75 M100,55 L95,85 M100,55 L110,20" stroke="rgba(80,30,30,0.5)" strokeWidth="1" fill="none" />

                                {/* Additional cracks */}
                                <path d="M60,0 L65,30 L55,60" stroke="rgba(80,40,40,0.4)" strokeWidth="0.8" fill="none" />
                                <path d="M140,120 L145,90 L135,60" stroke="rgba(80,40,40,0.4)" strokeWidth="0.8" fill="none" />
                            </svg>
                        </div>

                        {/* Burn/wear marks - more visible */}
                        <div className="absolute top-1/4 right-1/5 w-20 h-20 rounded-full bg-gradient-radial from-red-900/20 to-transparent blur-xl" />
                        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-gradient-radial from-black/40 to-transparent blur-xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-radial from-red-950/30 to-transparent blur-2xl" />

                        {/* Torn corner effect */}
                        <div className="absolute top-0 right-0 w-12 h-12">
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-black/70 to-transparent" />
                        </div>

                        <div className="relative z-10">
                            {/* Header - Red forbidden style */}
                            <div className="flex items-center gap-2 mb-3">
                                <X size={18} className="text-red-500" />
                                <span className="text-xs uppercase tracking-[0.2em] text-red-500 font-bold">
                                    TETAP PAKAI INI?
                                </span>
                            </div>

                            {/* Body copy - sarkas */}
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                Tetap percaya website lama yang membuat <span className="text-red-400 font-semibold">75% pasien kabur</span> ke kompetitor?
                                <span className="text-red-400/80"> Omset kompetitor naik</span>, Anda <span className="text-zinc-500">stagnan</span>.
                            </p>

                            {/* Tags - Red forbidden style (no strikethrough) */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                                    <X size={10} className="text-red-500" />
                                    <span className="text-[10px] text-red-400 font-medium">-75% Omset</span>
                                </span>
                                <span className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                                    <X size={10} className="text-red-500" />
                                    <span className="text-[10px] text-red-400 font-medium">+Profit Kompetitor</span>
                                </span>
                                <span className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                                    <X size={10} className="text-red-500" />
                                    <span className="text-[10px] text-red-400 font-medium">Permanen</span>
                                </span>
                            </div>

                            {/* Button - Red forbidden style */}
                            <div
                                className="flex items-center justify-center gap-2 py-3 rounded-lg cursor-not-allowed"
                                style={{
                                    background: 'rgba(127, 29, 29, 0.15)',
                                    border: '1px solid rgba(220, 38, 38, 0.3)'
                                }}
                            >
                                <X size={14} className="text-red-500/70" />
                                <span className="text-red-400/80 text-[11px] uppercase tracking-widest font-medium">
                                    Biarkan Saja & Lanjutkan Kehilangan
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* LUXURY VIP ACCESS CARD — Premium Black Card Style               */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    style={{
                        opacity: cardOpacity,
                        scale: cardScale,
                        y: cardY
                    }}
                    className="relative"
                >
                    {/* Outer glow */}
                    <div
                        className="absolute -inset-6 rounded-3xl pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.2) 0%, transparent 70%)'
                        }}
                    />

                    {/* Card Container with Gold Border */}
                    <div
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #C5A059 0%, #D4AF61 30%, #C5A059 50%, #A08040 70%, #C5A059 100%)',
                            padding: '2px'
                        }}
                    >
                        {/* Metallic Shimmer Effect (Texture Option 2) */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            <motion.div
                                animate={{ x: ['-150%', '250%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                                className="absolute inset-y-0 w-1/2"
                                style={{
                                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 70%)'
                                }}
                            />
                        </div>

                        {/* Inner Card - Premium Black */}
                        <div
                            className="relative rounded-xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #0d0b09 0%, #060504 100%)'
                            }}
                        >
                            {/* Noise texture for premium paper feel */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                                }}
                            />

                            {/* Subtle inner shimmer */}
                            <motion.div
                                animate={{ opacity: [0.02, 0.05, 0.02] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(ellipse at 30% 20%, rgba(197, 160, 89, 0.1) 0%, transparent 50%)'
                                }}
                            />

                            {/* Card Content */}
                            <div className="relative z-10 p-6">

                                {/* Header Badge */}
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C5A059]/30" />
                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10">
                                        <Crown size={14} className="text-[#C5A059]" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                                            VIP Access
                                        </span>
                                    </div>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C5A059]/30" />
                                </div>

                                {/* Main Title */}
                                <div className="text-center mb-6">
                                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-tight tracking-tight">
                                        ANDA TELAH
                                    </h3>
                                    <h3 className="font-serif text-2xl md:text-3xl text-[#C5A059] italic leading-tight">
                                        Terpilih
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-zinc-400 text-sm text-center mb-6 max-w-xs mx-auto leading-relaxed">
                                    Akses eksklusif untuk konsultasi dengan <span className="text-[#C5A059] font-medium">The Architect</span> dan
                                    mendominasi pasar dengan <span className="text-white font-medium">otoritas digital</span>.
                                </p>

                                {/* Elegant Divider */}
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C5A059]/40" />
                                    <Shield size={16} className="text-[#C5A059]/60" />
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C5A059]/40" />
                                </div>

                                {/* Features - Elegant List Style */}
                                <div className="space-y-3 mb-6">
                                    {[
                                        { text: 'UI/UX World Class', desc: 'Desain premium yang membangun kepercayaan' },
                                        { text: 'AI Neural Sales', desc: 'Sistem penjualan cerdas yang memaksimalkan konversi' },
                                        { text: 'Smart Booking System', desc: 'Otomatisasi yang meningkatkan efisiensi' }
                                    ].map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="flex items-start gap-3 px-4 py-2.5 rounded-lg bg-[#C5A059]/5 border border-[#C5A059]/10"
                                        >
                                            <Check size={16} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-white text-sm font-medium">{feature.text}</p>
                                                <p className="text-zinc-500 text-[11px]">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Member ID / Barcode Section */}
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <div>
                                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">Member ID</p>
                                        <p className="text-[11px] text-[#C5A059] font-mono tracking-widest">#AURN-VIP-2024</p>
                                    </div>
                                    <div className="flex items-end gap-[2px] h-6">
                                        {[2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2].map((w, i) => (
                                            <div
                                                key={i}
                                                className="bg-[#C5A059]/50"
                                                style={{ width: `${w}px`, height: `${14 + (i % 3) * 3}px` }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button - Premium Style */}
                                <motion.a
                                    href="https://wa.me/6281234567890?text=Halo%20Aureon%2C%0A%0ASaya%20sudah%20melihat%20sistem%20VIP%20Access%20Anda.%0A%0ASaya%20ingin%20tahu%20bagaimana%20sistem%20ini%20bisa%20diterapkan%20untuk%20klinik%20saya%20dan%20berapa%20investasinya.%0A%0AKapan%20bisa%20kita%20diskusi%3F"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(197, 160, 89, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #C5A059 0%, #D4AF61 50%, #C5A059 100%)'
                                    }}
                                >
                                    {/* Button shimmer */}
                                    <motion.div
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                                        className="absolute inset-y-0 w-1/3 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                                        }}
                                    />
                                    <Crown size={18} className="text-[#050505]" />
                                    <span className="text-[#050505] font-bold text-sm uppercase tracking-widest">
                                        Claim Exclusive Access
                                    </span>
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight size={18} className="text-[#050505]" />
                                    </motion.div>
                                </motion.a>

                                {/* Exclusivity Note */}
                                <div className="mt-4 text-center">
                                    <p className="text-[10px] text-zinc-500 italic">
                                        "Akses terbatas. Hanya untuk yang terpilih."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* TRUST FOOTER                                                    */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-10 flex justify-center items-center gap-4 text-[9px] text-zinc-600 uppercase tracking-[0.2em]"
                >
                    <span>✓ Gratis</span>
                    <span className="text-zinc-700">•</span>
                    <span>✓ Rahasia</span>
                    <span className="text-zinc-700">•</span>
                    <span>✓ Tanpa Komitmen</span>
                </motion.div>

            </div>
        </section>
    )
}

export default ClosingCTA
