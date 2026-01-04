import React from 'react';
import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: "THE ARCHITECT" — Luxury Brand Footer Layout (Option C)
// Philosophy: Signature as luxury brand mark, centered, prominent, authoritative
// Inspired by: Tom Ford, Chanel, Rolex founder signatures
// ═══════════════════════════════════════════════════════════════════════════════

// Premium easing
const cinematicEase = [0.22, 1, 0.36, 1];

export default function Architect() {
    return (
        <section
            id="identity"
            className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col justify-end"
        >
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 1. HERO IMAGE                                                        */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: cinematicEase }}
                viewport={{ once: true }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="/professional1.png"
                    alt="The Architect"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'top center' }}
                />
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 2. GRADIENT OVERLAY                                                  */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(to top, 
                            #050505 0%, 
                            rgba(5,5,5,0.97) 20%,
                            rgba(5,5,5,0.75) 40%,
                            rgba(5,5,5,0.3) 55%,
                            transparent 75%
                        )
                    `
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 3. CONTENT — Centered Luxury Layout                                  */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div className="relative z-20 w-full px-6 pb-10 md:pb-14 flex flex-col items-center text-center max-w-2xl mx-auto">

                {/* HEADLINE — Centered */}
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                    viewport={{ once: true }}
                    className="text-[2.2rem] md:text-5xl lg:text-6xl font-serif text-white leading-[1] tracking-tight"
                >
                    TECH LOGIC <br />
                    <span className="text-[#C5A059] italic font-light">MEETS</span> <br />
                    HUMAN DESIRE
                </motion.h2>

                {/* BODY TEXT — Centered */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: cinematicEase }}
                    viewport={{ once: true }}
                    className="mt-5 text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm"
                >
                    Menjembatani presisi mesin dengan intuisi manusia.
                    Solusi ini bukan sekadar efisien—ini personal.
                </motion.p>

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* LUXURY BRAND SIGNATURE BLOCK — Centered, Prominent               */}
                {/* ─────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: cinematicEase }}
                    viewport={{ once: true }}
                    className="mt-10 flex flex-col items-center"
                >
                    {/* SIGNATURE — Large & Centered */}
                    <motion.img
                        src="/signature_luthfi.png"
                        alt="Signature"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 0.9, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6, ease: cinematicEase }}
                        className="w-36 md:w-44 h-auto"
                        style={{
                            filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(15deg) brightness(0.9)'
                        }}
                    />

                    {/* GOLD UNDERLINE */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8, ease: cinematicEase }}
                        className="mt-3 h-[1.5px] w-24 md:w-28 origin-center"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #C5A059, transparent)'
                        }}
                    />

                    {/* THE ARCHITECT — Title */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-4 text-[10px] md:text-[11px] text-[#C5A059]/80 tracking-[0.4em] uppercase font-medium"
                    >
                        The Architect
                    </motion.p>
                </motion.div>

            </div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 4. AMBIENT GLOW                                                      */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none z-5"
                style={{
                    background: 'radial-gradient(ellipse at center bottom, rgba(197, 160, 89, 0.06) 0%, transparent 70%)'
                }}
            />

        </section>
    );
}
