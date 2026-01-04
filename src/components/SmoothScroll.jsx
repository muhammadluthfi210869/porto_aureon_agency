import { useEffect } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1, // Damping factor 0.1 for "Silk Feel"
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Cleanup
        return () => {
            lenis.destroy()
        }
    }, [])

    return children
}

export default SmoothScroll
