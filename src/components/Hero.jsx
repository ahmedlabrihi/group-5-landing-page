import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { ArrowRight, Wrench, ShieldCheck, Clock } from 'lucide-react'
import gsap from 'gsap'
import Beams from './Beams'
import LogoLoop from './LogoLoop'

// Laptop brand logos as simple text nodes (works without external icons)
const brandLogos = [
    { node: <span className="font-bold tracking-tight">Dell</span>, title: "Dell" },
    { node: <span className="font-bold tracking-tight">HP</span>, title: "HP" },
    { node: <span className="font-bold tracking-tight">Lenovo</span>, title: "Lenovo" },
    { node: <span className="font-bold tracking-tight">ASUS</span>, title: "ASUS" },
    { node: <span className="font-bold tracking-tight">Acer</span>, title: "Acer" },
    { node: <span className="font-bold tracking-tight">Apple</span>, title: "Apple" },
    { node: <span className="font-bold tracking-tight">MSI</span>, title: "MSI" },
    { node: <span className="font-bold tracking-tight">Razer</span>, title: "Razer" },
    { node: <span className="font-bold tracking-tight">Samsung</span>, title: "Samsung" },
    { node: <span className="font-bold tracking-tight">Microsoft</span>, title: "Microsoft" },
]

export default function Hero() {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const buttonsRef = useRef(null)
    const statsRef = useRef(null)
    const logosRef = useRef(null)

    // Delay for Hero animations to start after ShapeOverlay completes
    const overlayDuration = 1.5 // Match ShapeOverlay total duration

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered text reveal for Headline
            const titleChars = titleRef.current.querySelectorAll('.char')

            gsap.fromTo(titleChars,
                { opacity: 0, y: 100, rotateX: -90 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.02,
                    duration: 1,
                    delay: overlayDuration,
                    ease: 'back.out(1.7)',
                }
            )

            gsap.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: overlayDuration + 0.5,
                ease: 'power3.out',
            })

            gsap.to(buttonsRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: overlayDuration + 0.7,
                stagger: 0.1,
                ease: 'power3.out',
            })

            gsap.to(statsRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: overlayDuration + 1,
                stagger: 0.1,
                ease: 'power3.out',
            })

            gsap.to(logosRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: overlayDuration + 1.3,
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
                    <span key={charIndex} className="char inline-block opacity-0">
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
                    {splitText("Expert Laptop Repair")}
                </h1>

                {/* Subheading - starts hidden */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-5"
                >
                    Fast, reliable diagnostics and repair for all major brands.
                    Your device restored to peak performance.
                </p>

                {/* CTA Buttons - Glassy Style */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    {/* Primary Button - Glassy Orange */}
                    <Button
                        size="lg"
                        className="h-14 px-8 text-base rounded-full 
                            bg-orange-500/10 backdrop-blur-md border border-orange-500/50
                            text-white font-semibold
                            shadow-[0_0_30px_rgba(255,135,9,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]
                            hover:bg-orange-500/20 hover:border-orange-400 hover:shadow-[0_0_40px_rgba(255,135,9,0.4)]
                            hover:scale-105 transition-all duration-300
                            opacity-0 translate-y-5"
                    >
                        Get a Free Quote
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    {/* Secondary Button - Glassy Transparent */}
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-8 text-base rounded-full
                            bg-white/5 backdrop-blur-md border border-white/20
                            text-white font-semibold
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                            hover:bg-white/10 hover:border-white/40
                            hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
                            hover:scale-105 transition-all duration-300
                            opacity-0 translate-y-5"
                    >
                        Our Services
                    </Button>
                </div>

                {/* Stats / Features Grid - starts hidden */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                    {[
                        { icon: Wrench, label: "Hardware Repair", value: "Expert Level" },
                        { icon: ShieldCheck, label: "Success Rate", value: "99.9%" },
                        { icon: Clock, label: "Rapid Response", value: "24/7 Support" }
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl 
                                bg-white/5 backdrop-blur-md 
                                border border-white/10
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                                hover:border-orange-500/30 hover:bg-white/10
                                transition-all duration-300 group
                                opacity-0 translate-y-5"
                        >
                            <stat.icon className="w-8 h-8 text-gray-500 mb-4 group-hover:text-orange-400 transition-colors mx-auto" />
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Brand Logos Loop */}
                <div ref={logosRef} className="opacity-0 translate-y-5">
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest">We Service All Major Brands</p>
                    <LogoLoop
                        logos={brandLogos}
                        speed={60}
                        direction="left"
                        logoHeight={24}
                        gap={64}
                        fadeOut
                        fadeOutColor="#000000"
                        pauseOnHover
                        ariaLabel="Supported laptop brands"
                    />
                </div>
            </div>
        </section>
    )
}
