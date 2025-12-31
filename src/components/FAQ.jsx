import { useEffect, useRef, useState } from 'react'
import { Badge } from './ui/badge'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
    {
        question: 'How long does a typical repair take?',
        answer: 'Most repairs are completed within 24-48 hours. Complex issues like motherboard repairs may take 3-5 business days. We\'ll always give you an estimated timeline upfront.',
    },
    {
        question: 'Do you repair all laptop brands?',
        answer: 'Yes! We service all major brands including Dell, HP, Lenovo, ASUS, Acer, Apple MacBooks, and more. Our technicians are certified across multiple platforms.',
    },
    {
        question: 'Is there a warranty on repairs?',
        answer: 'Absolutely. All our repairs come with a 90-day warranty covering both parts and labor. If the same issue recurs, we\'ll fix it at no extra cost.',
    },
    {
        question: 'Can you recover data from a damaged laptop?',
        answer: 'In most cases, yes. We offer professional data recovery services for failed hard drives and SSDs. We\'ll assess the situation and provide options.',
    },
]

export default function FAQ() {
    const sectionRef = useRef(null)
    const itemsRef = useRef([])
    const [openIndex, setOpenIndex] = useState(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                if (!item) return

                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'power3.out',
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section ref={sectionRef} className="py-24 px-4 relative">
            <div className="max-w-3xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4">FAQ</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Common <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Everything you need to know about our repair services
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            ref={(el) => (itemsRef.current[index] = el)}
                            className="glass-effect rounded-xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-orange-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48 pb-5' : 'max-h-0'
                                    }`}
                            >
                                <p className="px-6 text-muted-foreground">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
