import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({ text, className = '' }) {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const linesRef = useRef([])

    useEffect(() => {
        // Custom line splitting function (alternative to SplitText plugin)
        const splitIntoLines = () => {
            if (!textRef.current) return

            const element = textRef.current
            const words = text.split(' ')
            element.innerHTML = ''

            // Temporary container to measure
            const tempContainer = document.createElement('div')
            tempContainer.style.cssText = window.getComputedStyle(element).cssText
            tempContainer.style.position = 'absolute'
            tempContainer.style.visibility = 'hidden'
            tempContainer.style.width = element.offsetWidth + 'px'
            document.body.appendChild(tempContainer)

            const lines = []
            let currentLine = []
            let currentLineWidth = 0
            const containerWidth = element.offsetWidth

            words.forEach((word, index) => {
                const testSpan = document.createElement('span')
                testSpan.textContent = [...currentLine, word].join(' ')
                tempContainer.innerHTML = ''
                tempContainer.appendChild(testSpan)

                const testWidth = testSpan.offsetWidth

                if (testWidth > containerWidth && currentLine.length > 0) {
                    lines.push(currentLine.join(' '))
                    currentLine = [word]
                } else {
                    currentLine.push(word)
                }
            })

            if (currentLine.length > 0) {
                lines.push(currentLine.join(' '))
            }

            document.body.removeChild(tempContainer)

            // Create line elements with masking
            element.innerHTML = ''
            linesRef.current = []

            lines.forEach((lineText, index) => {
                const lineWrapper = document.createElement('div')
                lineWrapper.style.overflow = 'hidden'
                lineWrapper.style.paddingBottom = '0.1em'

                const lineContent = document.createElement('div')
                lineContent.textContent = lineText
                lineContent.style.willChange = 'transform'

                lineWrapper.appendChild(lineContent)
                element.appendChild(lineWrapper)
                linesRef.current.push(lineContent)
            })

            // Create GSAP animation
            gsap.from(linesRef.current, {
                yPercent: 120,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'clamp(top center)',
                    end: 'clamp(bottom center)',
                    scrub: true,
                },
            })
        }

        // Wait for fonts to load
        if (document.fonts) {
            document.fonts.ready.then(splitIntoLines)
        } else {
            splitIntoLines()
        }

        // Resize handling
        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.getAll().forEach(st => st.kill())
                splitIntoLines()
            }, 250)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [text])

    return (
        <div ref={containerRef} className={`container w-90 ${className}`}>
            <h2
                ref={textRef}
                className="text-center text-foreground text-2xl md:text-3xl font-semibold opacity-100"
                style={{ willChange: 'transform' }}
            >
                {text}
            </h2>
        </div>
    )
}
