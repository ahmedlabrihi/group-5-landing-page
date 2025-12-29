import { useEffect, useRef } from 'react'
import { Badge } from './ui/badge'
import Avatar from 'boring-avatars'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const team = [
    { name: 'Sarah Chen', role: 'Hardware Specialist', id: 'sarah-chen' },
    { name: 'Michael Torres', role: 'Software Engineer', id: 'michael-torres' },
    { name: 'Emily Rodriguez', role: 'Diagnostics Expert', id: 'emily-rodriguez' },
    { name: 'David Kim', role: 'Senior Technician', id: 'david-kim' },
    { name: 'Jessica Walsh', role: 'Quality Assurance', id: 'jessica-walsh' },
    { name: 'Ahmed Hassan', role: 'Hardware Specialist', id: 'ahmed-hassan' },
]

const colors = ['#ff8709', '#ffd9b0', '#404040', '#c0c0c0', '#1a1a1a', '#f7bdf8']

export default function Team() {
    const sectionRef = useRef(null)
    const avatarsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            avatarsRef.current.forEach((avatar, index) => {
                if (!avatar) return

                gsap.from(avatar, {
                    scrollTrigger: {
                        trigger: avatar,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)',
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 via-background to-background" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <Badge className="mb-4">Our Team</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Meet Our <span className="text-gradient">Experts</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Certified technicians dedicated to solving your laptop issues
                    </p>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={member.id}
                            ref={(el) => (avatarsRef.current[index] = el)}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-4 rounded-full p-1 bg-gradient-to-br from-orange-500 to-orange-300 group-hover:scale-110 transition-transform duration-300">
                                <div className="rounded-full overflow-hidden bg-background p-1">
                                    <Avatar
                                        size={100}
                                        name={member.id}
                                        variant="beam"
                                        colors={colors}
                                    />
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>

                {/* Testimonial or CTA */}
                <div className="mt-20 text-center glass-effect rounded-2xl p-8 max-w-3xl mx-auto">
                    <p className="text-xl italic text-muted-foreground mb-4">
                        "Our team has successfully serviced over 500 laptops with a 98% customer satisfaction rate"
                    </p>
                    <p className="text-orange-400 font-semibold">EMS Quality Guarantee</p>
                </div>
            </div>
        </section>
    )
}
