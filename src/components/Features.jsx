import { useEffect, useRef } from 'react'
import { Badge } from './ui/badge'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagicBento from './MagicBento'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
    const sectionRef = useRef(null)
    const bentoRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(bentoRef.current, {
                scrollTrigger: {
                    trigger: bentoRef.current,
                    start: 'top 85%',
                    end: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <Badge className="mb-4">Features</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Comprehensive <span className="text-gradient">Service</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need for complete laptop care and maintenance
                    </p>
                </div>

                {/* MagicBento Grid */}
                <div ref={bentoRef} className="flex justify-center">
                    <MagicBento
                        enableStars={false}
                        spotlightRadius={150}
                    />
                </div>
            </div>
        </section>
    )
}
