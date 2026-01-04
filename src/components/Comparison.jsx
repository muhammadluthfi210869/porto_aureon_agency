import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Frown, Smile, HelpCircle, MessageCircle, Calendar, Heart, ArrowRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: "EMOTIONAL COMPARISON" — Patient's Emotional Journey
// Philosophy: Show how patient FEELS at each stage, not technical flow
// Visual: Before/After emotional states, empathy-driven storytelling
// ═══════════════════════════════════════════════════════════════════════════════

const cinematicEase = [0.22, 1, 0.36, 1]

const emotionalJourney = [
    {
        id: 1,
        stage: 'Pertama Kali Melihat Website',
        before: {
            emotion: 'Ragu',
            feeling: '"Kok websitenya kurang meyakinkan ya? Beneran bagus gak nih?"',
            icon: Frown,
            color: 'red'
        },
        after: {
            emotion: 'Percaya',
            feeling: '"Wow, profesional banget. Pasti klinik yang serius."',
            icon: Smile,
            color: 'green'
        }
    },
    {
        id: 2,
        stage: 'Ingin Bertanya Sebelum Booking',
        before: {
            emotion: 'Bingung',
            feeling: '"Mau nanya tapi males kalau dibales lama atau template..."',
            icon: HelpCircle,
            color: 'red'
        },
        after: {
            emotion: 'Terjawab',
            feeling: '"Wah AI-nya ngerti banget concern aku, langsung yakin!"',
            icon: MessageCircle,
            color: 'green'
        }
    },
    {
        id: 3,
        stage: 'Sudah Mau Booking',
        before: {
            emotion: 'Malas',
            feeling: '"Nanti aja deh, ribet booking-nya..."',
            icon: Calendar,
            color: 'red'
        },
        after: {
            emotion: 'Mudah',
            feeling: '"Gampang banget, langsung ada reminder juga!"',
            icon: Calendar,
            color: 'green'
        }
    },
    {
        id: 4,
        stage: 'Setelah Treatment Selesai',
        before: {
            emotion: 'Dilupakan',
            feeling: '"Yaudah selesai, cari klinik lain aja nanti."',
            icon: Frown,
            color: 'red'
        },
        after: {
            emotion: 'Diperhatikan',
            feeling: '"Mereka follow-up, perhatian banget. Aku balik lagi!"',
            icon: Heart,
            color: 'green'
        }
    }
]

const Comparison = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[100vh] flex flex-col items-center justify-center bg-[#030303] overflow-hidden py-16 px-6"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.02) 0%, transparent 30%, transparent 70%, rgba(34, 197, 94, 0.02) 100%)'
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto">

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* HEADER                                                          */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    className="text-center mb-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#C5A059]/40" />
                        <span className="text-[#C5A059] text-[9px] font-bold tracking-[0.5em] uppercase">
                            Patient Journey
                        </span>
                        <div className="h-px w-8 bg-[#C5A059]/40" />
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight tracking-tight mb-3">
                        Apa yang <span className="text-[#C5A059] italic">Pasien Rasakan</span>
                    </h2>
                    <p className="text-zinc-500 text-sm max-w-md mx-auto">
                        Perjalanan emosi pasien Anda — sebelum dan sesudah menggunakan sistem Aureon.
                    </p>
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* COLUMN HEADERS                                                  */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: cinematicEase }}
                    className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-4 mb-6"
                >
                    <div className="text-center p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                        <Frown size={18} className="text-red-400 mx-auto mb-1" />
                        <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider">Tanpa Aureon</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <ArrowRight size={16} className="text-zinc-600" />
                    </div>
                    <div className="text-center p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                        <Smile size={18} className="text-green-400 mx-auto mb-1" />
                        <p className="text-green-400 text-[10px] font-bold uppercase tracking-wider">Dengan Aureon</p>
                    </div>
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* EMOTIONAL JOURNEY ROWS                                          */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <div className="space-y-3">
                    {emotionalJourney.map((journey, index) => (
                        <motion.div
                            key={journey.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: cinematicEase }}
                            className="relative"
                        >
                            {/* Stage Label */}
                            <div className="text-center mb-2">
                                <span className="text-zinc-500 text-[10px] uppercase tracking-widest">
                                    {journey.stage}
                                </span>
                            </div>

                            {/* Comparison Row */}
                            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-4">
                                {/* BEFORE */}
                                <div className="p-4 rounded-xl bg-gradient-to-br from-[#0A0505] to-[#080404] border border-red-900/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <journey.before.icon size={16} className="text-red-400" />
                                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">
                                            {journey.before.emotion}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed italic">
                                        {journey.before.feeling}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                                    >
                                        <ArrowRight size={16} className="text-[#C5A059]" />
                                    </motion.div>
                                </div>

                                {/* AFTER */}
                                <div className="p-4 rounded-xl bg-gradient-to-br from-[#050A05] to-[#040804] border border-green-900/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <journey.after.icon size={16} className="text-green-400" />
                                        <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                                            {journey.after.emotion}
                                        </span>
                                    </div>
                                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic">
                                        {journey.after.feeling}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* FINAL RESULT                                                    */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6, ease: cinematicEase }}
                    className="mt-8"
                >
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-4">
                        {/* BEFORE RESULT */}
                        <div className="p-5 rounded-xl bg-gradient-to-b from-[#0A0404] to-[#080303] border border-red-800/30 text-center">
                            <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                                Hasil Akhir
                            </p>
                            <p className="text-white text-lg font-bold mb-1">Pergi</p>
                            <p className="text-red-400/70 text-[11px]">
                                Cari klinik lain
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center">
                            <ArrowRight size={20} className="text-[#C5A059]" />
                        </div>

                        {/* AFTER RESULT */}
                        <div className="p-5 rounded-xl bg-gradient-to-b from-[#050A05] to-[#040804] border border-green-800/30 text-center">
                            <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                                Hasil Akhir
                            </p>
                            <p className="text-white text-lg font-bold mb-1">Loyal</p>
                            <p className="text-green-400/70 text-[11px]">
                                Kembali terus + referral
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* FINAL COPY                                                      */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-10 text-center"
                >
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                        Pasien tidak hanya <span className="text-white font-medium">datang sekali</span> —
                        mereka menjadi <span className="text-emerald-400 font-medium">pasien loyal</span> yang
                        merasa <span className="text-[#C5A059]">diperhatikan</span> di setiap tahap.
                    </p>
                </motion.div>

            </div>
        </section>
    )
}

export default Comparison
