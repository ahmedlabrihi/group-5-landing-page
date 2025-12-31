import { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Inbox, Zap, Wrench, PackageCheck, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const workflowSteps = [
    {
        id: 1,
        icon: Inbox,
        title: 'Drop Off or Mail In',
        description: 'Bring your laptop to our center or ship it to us — we handle it from there.',
        color: 'from-orange-600 to-orange-400',
    },
    {
        id: 2,
        icon: Zap,
        title: 'Instant Diagnosis',
        description: 'Our experts quickly identify the issue and provide you with a repair estimate.',
        color: 'from-orange-500 to-orange-300',
        badge: 'Fast Turnaround',
    },
    {
        id: 3,
        icon: Wrench,
        title: 'Expert Repair',
        description: 'Certified technicians fix your device using quality parts and proven methods.',
        color: 'from-gray-600 to-gray-400',
    },
    {
        id: 4,
        icon: PackageCheck,
        title: 'Quality Check & Pickup',
        description: 'We test everything thoroughly. Then you pick up or we ship it back — good as new.',
        color: 'from-orange-400 to-orange-200',
    },
]

export default function Workflow() {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate cards on scroll
            cardsRef.current.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-4 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-950/10 to-background" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <Badge className="mb-4">How It Works</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Simple & Efficient <span className="text-gradient">Workflow</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Our streamlined 4-step process ensures your laptop gets the care it needs
                    </p>
                </div>

                {/* Workflow steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {workflowSteps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={step.id}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="relative"
                            >
                                {/* Connector arrow (hidden on mobile, shown on larger screens) */}
                                {index < workflowSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 z-20 transform -translate-y-1/2">
                                        <ArrowRight className="w-6 h-6 text-orange-400" />
                                    </div>
                                )}

                                <Card className="glass-effect border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 h-full group hover:scale-105">
                                    <CardHeader>
                                        {/* Step number */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-lg bg-gradient-to-br ${step.color} bg-opacity-20`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-5xl font-bold text-muted-foreground/20 group-hover:text-muted-foreground/30 transition-colors">
                                                {step.id}
                                            </div>
                                        </div>

                                        <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                                        {step.badge && (
                                            <Badge variant="secondary" className="w-fit mb-2">
                                                {step.badge}
                                            </Badge>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {step.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>

                {/* Additional info */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">
                        <span className="text-orange-400 font-semibold">Average turnaround time:</span> 24-48 hours for most issues
                    </p>
                </div>
            </div>
        </section>
    )
}
