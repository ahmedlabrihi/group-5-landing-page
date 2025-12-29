import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)

// Tech-themed images for EMS
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
        title: 'Tech Solutions',
        subtitle: 'Modern workspace'
    },
    {
        src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
        title: 'Laptop Repair',
        subtitle: 'Professional service'
    },
    {
        src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
        title: 'Hardware',
        subtitle: 'Expert diagnostics'
    },
    {
        src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
        title: 'Components',
        subtitle: 'Quality parts'
    },
    {
        src: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop',
        title: 'Workstation',
        subtitle: 'Precision tools'
    },
    {
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        title: 'Software',
        subtitle: 'System optimization'
    },
    {
        src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
        title: 'Code',
        subtitle: 'Software solutions'
    },
    {
        src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
        title: 'Development',
        subtitle: 'Custom fixes'
    },
]

export default function FlipGallery() {
    const galleryRef = useRef(null)
    const wrapperRef = useRef(null)
    const flipCtx = useRef(null)

    const createTween = () => {
        const galleryElement = galleryRef.current
        const galleryItems = galleryElement.querySelectorAll('.gallery__item')

        // Cleanup previous context
        if (flipCtx.current) {
            flipCtx.current.revert()
        }

        galleryElement.classList.remove('gallery--final')

        flipCtx.current = gsap.context(() => {
            // Temporarily add final class to capture the final state
            galleryElement.classList.add('gallery--final')
            const flipState = Flip.getState(galleryItems)
            galleryElement.classList.remove('gallery--final')

            const flip = Flip.to(flipState, {
                scale: true,
                absolute: true,
                ease: 'none',
                stagger: 0.02,
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: '+=150%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            })

            // Add entrance animation
            tl.fromTo(galleryItems,
                { opacity: 0.7 },
                { opacity: 1, duration: 0.2, stagger: 0.02 },
                0
            )

            tl.add(flip, 0.1)

            // Add overlay fade on expand
            tl.to('.gallery__overlay', {
                opacity: 1,
                duration: 0.5,
            }, '<0.3')

            return () => gsap.set(galleryItems, { clearProps: 'all' })
        })
    }

    useEffect(() => {
        // Delay to ensure images are loaded
        const timer = setTimeout(() => {
            createTween()
        }, 100)

        const handleResize = () => {
            createTween()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', handleResize)
            if (flipCtx.current) {
                flipCtx.current.revert()
            }
        }
    }, [])

    return (
        <>
            <div
                ref={wrapperRef}
                className="gallery-wrap relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
            >
                {/* Section Title */}
                <div className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none">
                    <p className="text-orange-400/80 text-sm uppercase tracking-widest mb-2">Our Gallery</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white/90">
                        Precision in Every Detail
                    </h2>
                </div>

                {/* Gallery Grid */}
                <div
                    ref={galleryRef}
                    className="gallery gallery--bento relative"
                    style={{
                        display: 'grid',
                        gap: '0.5rem',
                        gridTemplateColumns: 'repeat(3, 30vw)',
                        gridTemplateRows: 'repeat(4, 20vh)',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    {galleryImages.map((item, index) => (
                        <div
                            key={index}
                            className="gallery__item relative overflow-hidden rounded-lg group"
                            style={{
                                gridArea: index === 0 ? '1 / 1 / 3 / 2' :
                                    index === 1 ? '1 / 2 / 2 / 3' :
                                        index === 2 ? '2 / 2 / 4 / 3' :
                                            index === 3 ? '1 / 3 / 3 / 3' :
                                                index === 4 ? '3 / 1 / 3 / 2' :
                                                    index === 5 ? '3 / 3 / 5 / 4' :
                                                        index === 6 ? '4 / 1 / 5 / 2' :
                                                            '4 / 2 / 5 / 3',
                            }}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="gallery__overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                                <p className="text-white/70 text-sm">{item.subtitle}</p>
                            </div>
                            {/* Border glow effect */}
                            <div className="absolute inset-0 rounded-lg border border-orange-500/0 group-hover:border-orange-500/50 transition-colors duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            <style>{`
                .gallery--final {
                    grid-template-columns: repeat(3, 95vw) !important;
                    grid-template-rows: repeat(4, 45vh) !important;
                    gap: 1rem !important;
                }
                
                .gallery--final .gallery__item {
                    border-radius: 1rem;
                }
                
                .gallery--final .gallery__overlay {
                    opacity: 1 !important;
                }
            `}</style>
        </>
    )
}
