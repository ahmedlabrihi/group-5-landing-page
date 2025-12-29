import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { ArrowRight, Laptop } from 'lucide-react'
import gsap from 'gsap'

export default function Hero() {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from(subtitleRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out',
            })

            gsap.from(buttonsRef.current.children, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.4,
                stagger: 0.1,
                ease: 'power3.out',
            })
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-background to-gray-900/20" />

            {/* Floating orbs for visual interest */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl glass-effect">
                        <Laptop className="w-12 h-12 text-orange-400" />
                    </div>
                </div>

                {/* Main heading */}
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    Expert Laptop Repair &{' '}
                    <span className="text-gradient">Maintenance</span>
                </h1>

                {/* Subheading */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
                >
                    From diagnosis to resolution - our EMS service provides comprehensive
                    hardware and software support with emergency prioritization for your
                    critical needs.
                </p>

                {/* CTA Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="text-lg px-8 py-6 group">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                        Learn More
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gradient mb-2">500+</div>
                        <div className="text-sm text-muted-foreground">Repairs Done</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
                        <div className="text-sm text-muted-foreground">Support Available</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gradient mb-2">98%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
