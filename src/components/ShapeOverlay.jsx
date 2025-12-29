import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function ShapeOverlay() {
    const overlayRef = useRef(null)
    const pathRefs = useRef([])
    const [isOpened, setIsOpened] = useState(false)

    const numPoints = 10
    const numPaths = 2
    const delayPointsMax = 0.3
    const delayPerPath = 0.25
    const duration = 0.9

    const pointsDelayRef = useRef([])
    const allPointsRef = useRef([])
    const tlRef = useRef(null)

    useEffect(() => {
        // Initialize points arrays
        for (let i = 0; i < numPaths; i++) {
            const points = []
            allPointsRef.current.push(points)
            for (let j = 0; j < numPoints; j++) {
                points.push(100)
            }
        }

        // Create GSAP timeline with custom render function
        tlRef.current = gsap.timeline({
            onUpdate: render,
            defaults: {
                ease: 'power2.inOut',
                duration: duration,
            },
        })

        // Initial toggle
        toggle()

        return () => {
            if (tlRef.current) {
                tlRef.current.kill()
            }
        }
    }, [])

    const render = () => {
        for (let i = 0; i < numPaths; i++) {
            const path = pathRefs.current[i]
            const points = allPointsRef.current[i]

            if (!path || !points) continue

            let d = ''
            d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`

            for (let j = 0; j < numPoints - 1; j++) {
                const p = ((j + 1) / (numPoints - 1)) * 100
                const cp = p - (1 / (numPoints - 1) * 100) / 2
                d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`
            }

            d += isOpened ? ` V 100 H 0` : ` V 0 H 0`
            path.setAttribute('d', d)
        }
    }

    const toggle = () => {
        if (tlRef.current) {
            tlRef.current.progress(0).clear()

            // Random delays for organic effect
            for (let i = 0; i < numPoints; i++) {
                pointsDelayRef.current[i] = Math.random() * delayPointsMax
            }

            for (let i = 0; i < numPaths; i++) {
                const points = allPointsRef.current[i]
                const pathDelay = delayPerPath * (isOpened ? i : (numPaths - i - 1))

                for (let j = 0; j < numPoints; j++) {
                    const delay = pointsDelayRef.current[j]
                    tlRef.current.to(points, {
                        [j]: 0,
                    }, delay + pathDelay)
                }
            }
        }
    }

    const handleClick = () => {
        if (tlRef.current && !tlRef.current.isActive()) {
            setIsOpened(!isOpened)
            toggle()
        }
    }

    return (
        <svg
            ref={overlayRef}
            className="shape-overlays fixed w-full h-full top-0 left-0 pointer-events-none z-50"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            onClick={handleClick}
        >
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff8709" />
                    <stop offset="100%" stopColor="#f7bdf8" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffd9b0" />
                    <stop offset="100%" stopColor="#ff8709" />
                </linearGradient>
            </defs>
            <path
                ref={(el) => (pathRefs.current[0] = el)}
                className="shape-overlays__path"
                fill="url(#gradient2)"
            />
            <path
                ref={(el) => (pathRefs.current[1] = el)}
                className="shape-overlays__path"
                fill="url(#gradient1)"
            />
        </svg>
    )
}
