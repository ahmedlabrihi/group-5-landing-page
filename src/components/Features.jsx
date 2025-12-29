import { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import {
    Wrench,
    Code,
    Zap,
    CheckCircle2,
    Clock,
    Users
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        icon: Wrench,
        title: 'Hardware Diagnostics',
        description: 'Expert diagnosis and repair of physical components, motherboards, screens, and more',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Code,
        title: 'Software Solutions',
        description: 'OS troubleshooting, virus removal, driver updates, and software optimization',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: Zap,
        title: 'Emergency Priority',
        description: 'Critical issues get fast-tracked with our emergency prioritization system',
        color: 'from-orange-500 to-red-500',
        badge: 'Priority',
    },
    {
        icon: CheckCircle2,
        title: 'Complete Inspection',
        description: 'Thorough laptop check covering all components and systems before return',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: Clock,
        title: 'Fast Turnaround',
        description: '24-48 hour service for most repairs with real-time status updates',
        color: 'from-yellow-500 to-orange-500',
    },
    {
        icon: Users,
        title: 'Expert Technicians',
        description: 'Certified professionals with years of experience in laptop maintenance',
        color: 'from-indigo-500 to-purple-500',
    },
]

export default function Features() {
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
                        end: 'top 60%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    delay: (index % 3) * 0.1,
                    ease: 'power3.out',
                })
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

                {/* Features grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card
                                key={index}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="glass-effect border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover:scale-105"
                            >
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-full h-full text-white" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                        {feature.badge && (
                                            <Badge variant="secondary" className="text-xs">
                                                {feature.badge}
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
