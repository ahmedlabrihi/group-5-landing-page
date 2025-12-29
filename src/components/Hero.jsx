import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { ArrowRight, Wrench, ShieldCheck, Clock } from 'lucide-react'
import gsap from 'gsap'
import Beams from './Beams'

export default function Hero() {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonsRef = useRef(null)
    const statsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered text reveal for Headline
            const titleChars = titleRef.current.querySelectorAll('.char')

            gsap.from(titleChars, {
                opacity: 0,
                y: 100,
                rotateX: -90,
                stagger: 0.02,
                duration: 1,
                ease: 'back.out(1.7)',
            })

            gsap.from(subtitleRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.5,
                ease: 'power3.out',
            })

            gsap.from(buttonsRef.current.children, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
            })

            gsap.from(statsRef.current.children, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 1,
                stagger: 0.1,
                ease: 'power3.out',
            })

        }, heroRef)

        return () => ctx.revert()
    }, [])

    // Helper to split text for animation (words -> chars)
    const splitText = (text) => {
        return text.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mr-2 sm:mr-4">
                {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="char inline-block">
                        {char}
                    </span>
                ))}
            </span>
        ))
    }

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 bg-black"
        >
            {/* Beams Background */}
            <div className="absolute inset-0 w-full h-full">
                <Beams
                    beamWidth={2}
                    beamHeight={15}
                    beamNumber={12}
                    lightColor="#ffffff"
                    speed={2}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={30}
                />
            </div>

            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto text-center">


                {/* Main heading */}
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight overflow-hidden text-white"
                >
                    {splitText("Reviving Tech Excellence")}
                </h1>

                {/* Subheading */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Precision diagnostics and expert repair for your critical devices.
                    We bring enterprise-grade maintenance to your workspace.
                </p>

                {/* CTA Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                    <Button size="lg" className="h-14 px-8 text-base bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                        Initialize Repair
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-105">
                        View Service Logs
                    </Button>
                </div>

                {/* Stats / Features Grid */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { icon: Wrench, label: "Hardware Repair", value: "Expert Level" },
                        { icon: ShieldCheck, label: "Success Rate", value: "99.9%" },
                        { icon: Clock, label: "Rapid Response", value: "24/7 Support" }
                    ].map((stat, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-orange-500/30 transition-colors group">
                            <stat.icon className="w-8 h-8 text-gray-500 mb-4 group-hover:text-orange-400 transition-colors mx-auto" />
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
