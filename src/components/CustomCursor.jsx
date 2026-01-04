import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        // Track hovering over interactive elements
        const handleElementHover = () => {
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]')

            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', () => setIsHovering(true))
                el.addEventListener('mouseleave', () => setIsHovering(false))
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)
        document.body.addEventListener('mouseenter', handleMouseEnter)

        // Initial setup and re-run on DOM changes
        handleElementHover()
        const observer = new MutationObserver(handleElementHover)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
            document.body.removeEventListener('mouseenter', handleMouseEnter)
            observer.disconnect()
        }
    }, [])

    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - (isHovering ? 24 : 6),
                    y: mousePosition.y - (isHovering ? 24 : 6),
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <motion.div
                    className="rounded-full bg-gold"
                    animate={{
                        width: isHovering ? 48 : 12,
                        height: isHovering ? 48 : 12,
                        backgroundColor: isHovering ? 'transparent' : '#C5A059',
                        borderWidth: isHovering ? 2 : 0,
                        borderColor: '#C5A059',
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                    }}
                    style={{
                        borderStyle: 'solid',
                    }}
                />
            </motion.div>

            {/* Hide default cursor globally */}
            <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
        </>
    )
}

export default CustomCursor
