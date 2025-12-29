import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)

// Sample images (using placeholders)
const galleryImages = [
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
]

export default function FlipGallery() {
    const galleryRef = useRef(null)
    const wrapperRef = useRef(null)
    let flipCtx = useRef(null)

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
                simple: true,
                ease: 'expoScale(1, 5)',
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryElement,
                    start: 'center center',
                    end: '+=100%',
                    scrub: true,
                    pin: wrapperRef.current,
                },
            })

            tl.add(flip)

            return () => gsap.set(galleryItems, { clearProps: 'all' })
        })
    }

    useEffect(() => {
        createTween()

        const handleResize = () => {
            createTween()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (flipCtx.current) {
                flipCtx.current.revert()
            }
        }
    }, [])

    return (
        <>
            <div ref={wrapperRef} className="gallery-wrap relative w-full h-screen flex items-center justify-center overflow-hidden">
                <div
                    ref={galleryRef}
                    className="gallery gallery--bento"
                    style={{
                        display: 'grid',
                        gap: '1vh',
                        gridTemplateColumns: 'repeat(3, 32.5vw)',
                        gridTemplateRows: 'repeat(4, 23vh)',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    {galleryImages.map((src, index) => (
                        <div
                            key={index}
                            className="gallery__item relative"
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
                                src={src}
                                alt={`Tech workspace ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .gallery--final {
          grid-template-columns: repeat(3, 100vw) !important;
          grid-template-rows: repeat(4, 49.5vh) !important;
          gap: 1vh !important;
        }
      `}</style>
        </>
    )
}
