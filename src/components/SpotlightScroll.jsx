import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

// PHASE 2: DATA MODEL (Externalized, Non-Hardcoded)
const SPOTLIGHT_DATA = [
    {
        id: 'spotlight-01',
        content: 'Aureon tidak hanya membuat website—mereka memahami psikologi pasien kami. Setiap elemen dirancang untuk memvalidasi keputusan mereka bahkan sebelum konsultasi pertama.',
        author: 'Dr. Sarah Wijaya',
        role: 'Medical Director, Acasha Clinic',
        mediaUrl: null
    },
    {
        id: 'spotlight-02',
        content: 'ROI kami meningkat 340% dalam 3 bulan pertama. Bukan karena traffic—tapi karena kualitas lead yang masuk sudah pre-qualified oleh website.',
        author: 'Michael Chen',
        role: 'CEO, Lumine Aesthetics',
        mediaUrl: null
    },
    {
        id: 'spotlight-03',
        content: 'Mereka tidak bertanya "Mau warna apa?" Mereka bertanya "Siapa pasien ideal Anda?" Ini bukan web design. Ini strategic positioning.',
        author: 'Dr. Amelia Tanaka',
        role: 'Founder, Aura Medical',
        mediaUrl: null
    },
    {
        id: 'spotlight-04',
        content: 'AI chatbot mereka menangani 73% pertanyaan pasien di malam hari. Booking langsung naik tanpa saya harus hire staff tambahan.',
        author: 'Dr. Reza Pratama',
        role: 'Owner, Elite Dermatology',
        mediaUrl: null
    }
]

// PHASE 2: SUB-COMPONENT WITH SCROLL SPOTLIGHT LOGIC
const SpotlightCard = ({ item, index }) => {
    const cardRef = useRef(null)

    // useScroll targeting this specific card
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    // PHASE 2: INTERPOLATION LOGIC
    // Map scroll progress [0, 0.5, 1] to visual properties
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.85, 1.1, 0.85]
    )

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.3, 1.0, 0.3]
    )

    const blur = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [4, 0, 4]
    )

    // Mobile-adjusted scale (max 1.05 instead of 1.1)
    const responsiveScale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.9, 1.05, 0.9]
    )

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale: typeof window !== 'undefined' && window.innerWidth < 768 ? responsiveScale : scale,
                opacity,
                filter: useTransform(blur, (value) => `blur(${value}px)`),
                willChange: 'transform' // PHASE 4: Performance optimization
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
            }}
            className="h-[60vh] flex items-center justify-center scroll-snap-align-center px-6"
        >
            <div className="relative max-w-4xl w-full">
                {/* Card Container */}
                <motion.div
                    className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                    style={{
                        boxShadow: useTransform(
                            scrollYProgress,
                            [0, 0.5, 1],
                            [
                                '0 0 0 rgba(197,160,89,0)',
                                '0 20px 60px -10px rgba(197,160,89,0.3)',
                                '0 0 0 rgba(197,160,89,0)'
                            ]
                        )
                    }}
                >
                    {/* Animated Background Glow */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 via-transparent to-transparent pointer-events-none"
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0])
                        }}
                    />

                    {/* Quote Icon */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]),
                            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
                        }}
                        className="mb-8"
                    >
                        <Quote className="w-12 h-12 md:w-16 md:h-16 text-[#C5A059]/40" />
                    </motion.div>

                    {/* Content */}
                    <motion.blockquote
                        style={{
                            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.5, 1, 0.5])
                        }}
                        className="relative z-10 mb-8"
                    >
                        <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight font-light">
                            "{item.content}"
                        </p>
                    </motion.blockquote>

                    {/* Author Info */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.4, 1, 0.4])
                        }}
                        className="relative z-10 flex items-center gap-4"
                    >
                        <div className="flex-1">
                            <p className="text-lg md:text-xl text-[#C5A059] font-medium mb-1">
                                {item.author}
                            </p>
                            <p className="text-sm md:text-base text-slate-400">
                                {item.role}
                            </p>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-4 h-4 text-[#C5A059] fill-[#C5A059]"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/30" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/30" />
                </motion.div>

                {/* Index Indicator */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2])
                    }}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block"
                >
                    <span className="font-mono text-6xl text-white/5 font-bold">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    )
}

// PHASE 1 & 3: MAIN CONTAINER WITH SCROLL SNAP
const SpotlightScroll = () => {
    return (
        <section className="relative bg-[#0A0A0A] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/5 to-transparent pointer-events-none" />

            {/* Section Header */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] mb-6 font-medium">
                        Client Testimonials
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-8">
                        VALIDATED BY EXCELLENCE
                    </h2>
                    <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Suara dari mereka yang telah membuktikan—transformasi bukan sekadar janji, tapi realitas terukur.
                    </p>
                </motion.div>
            </div>

            {/* PHASE 3: SCROLL SNAP CONTAINER */}
            <div
                className="relative h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
                style={{
                    scrollSnapType: 'y mandatory'
                }}
            >
                {SPOTLIGHT_DATA.map((item, index) => (
                    <SpotlightCard key={item.id} item={item} index={index} />
                ))}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-20" />
        </section>
    )
}

export default SpotlightScroll
