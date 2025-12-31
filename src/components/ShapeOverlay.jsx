import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function ShapeOverlay() {
    const overlayRef = useRef(null)
    const pathRefs = useRef([])
    const [isHidden, setIsHidden] = useState(false)

    // Enhanced configuration for a more premium feel
    const numPoints = 12 // More points = smoother curves
    const numPaths = 4   // More layers = more depth
    const duration = 1.2 // Slightly slower for elegance
    const staggerPath = 0.15 // Delay between each layer

    const allPointsRef = useRef([])
    const tlRef = useRef(null)
    const isInitializedRef = useRef(false)

    // 4-tone gradient palette: Deep to Light
    const gradients = [
        { id: 'grad1', from: '#0a0a0a', to: '#1a1a1a' },     // Deep black to dark gray
        { id: 'grad2', from: '#1a1a1a', to: '#2d2d2d' },     // Dark gray to charcoal
        { id: 'grad3', from: '#2d2d2d', to: '#ff8709' },     // Charcoal to brand orange
        { id: 'grad4', from: '#ff8709', to: '#ffd9b0' },     // Brand orange to light peach
    ]

    // Use useLayoutEffect for synchronous initialization before paint
    useLayoutEffect(() => {
        // Prevent double initialization in StrictMode
        if (isInitializedRef.current) return
        isInitializedRef.current = true

        // Initialize points arrays for each path
        allPointsRef.current = []
        for (let i = 0; i < numPaths; i++) {
            const points = []
            for (let j = 0; j < numPoints; j++) {
                points.push(100) // Start fully covering (100%)
            }
            allPointsRef.current.push(points)
        }

        // Create GSAP timeline
        tlRef.current = gsap.timeline({
            onUpdate: render,
            onComplete: () => {
                // Hide overlay after animation completes
                setIsHidden(true)
            },
            defaults: {
                ease: 'power3.inOut', // Smoother easing
                duration: duration,
            },
        })

        // Animate each path with staggered timing
        for (let i = 0; i < numPaths; i++) {
            const points = allPointsRef.current[i]
            const pathDelay = i * staggerPath

            // Wave effect: animate points with slight delay based on position
            for (let j = 0; j < numPoints; j++) {
                // Create wave pattern: center points move first
                const centerOffset = Math.abs(j - numPoints / 2) / (numPoints / 2)
                const waveDelay = centerOffset * 0.1

                tlRef.current.to(points, {
                    [j]: 0, // Animate to 0 (fully revealed)
                    duration: duration,
                    ease: 'power3.inOut',
                }, pathDelay + waveDelay)
            }
        }

        return () => {
            // Robust cleanup
            if (tlRef.current) {
                tlRef.current.kill()
            }
            // Kill any lingering tweens on the points
            allPointsRef.current.forEach(points => {
                gsap.killTweensOf(points)
            })
            isInitializedRef.current = false
        }
    }, [])

    const render = () => {
        for (let i = 0; i < numPaths; i++) {
            const path = pathRefs.current[i]
            const points = allPointsRef.current[i]

            if (!path || !points) continue

            // Build SVG path with smooth bezier curves
            let d = `M 0 ${points[0]} C`

            for (let j = 0; j < numPoints - 1; j++) {
                const p = ((j + 1) / (numPoints - 1)) * 100
                const cp = p - (1 / (numPoints - 1) * 100) / 2
                d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`
            }

            d += ` V 0 H 0`
            path.setAttribute('d', d)
        }
    }

    // Hide component completely after animation
    if (isHidden) {
        return null
    }

    return (
        <svg
            ref={overlayRef}
            className="shape-overlays fixed w-full h-full top-0 left-0 pointer-events-none z-50"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                {gradients.map((g, idx) => (
                    <linearGradient key={g.id} id={g.id} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={g.from} />
                        <stop offset="100%" stopColor={g.to} />
                    </linearGradient>
                ))}
            </defs>
            {gradients.map((g, idx) => (
                <path
                    key={idx}
                    ref={(el) => (pathRefs.current[idx] = el)}
                    className="shape-overlays__path"
                    fill={`url(#${g.id})`}
                />
            ))}
        </svg>
    )
}
