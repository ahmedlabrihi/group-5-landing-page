import { useEffect, useRef } from 'react'
import { Badge } from './ui/badge'
import { CheckCircle, Cpu, MessageSquare, Shield } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const commitments = [
    {
        icon: Cpu,
        title: 'Thorough Diagnostics',
        description: 'Every laptop receives comprehensive hardware and software analysis before repair begins.',
    },
    {
        icon: CheckCircle,
        title: 'Expert Technicians',
        description: 'Certified professionals diagnose and resolve issues with precision and care.',
    },
    {
        icon: MessageSquare,
        title: 'Transparent Updates',
        description: 'We keep you informed at every step of the repair process.',
    },
    {
        icon: Shield,
        title: 'Quality Guaranteed',
        description: 'Rigorous testing on every device before it leaves our facility.',
    },
]

export default function WhyChooseUs() {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return

                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power3.out',
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-4 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <Badge className="mb-4">Our Commitment</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Why Choose <span className="text-gradient">EMS</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Quality is not just a goal — it's our standard
                    </p>
                </div>

                {/* Commitment Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {commitments.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={index}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="p-6 rounded-2xl glass-effect border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group hover:scale-105"
                            >
                                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
