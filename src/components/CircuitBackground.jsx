import { useEffect, useRef } from 'react'

export default function CircuitBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height
    let particles = []
    
    // Configuration
    const particleCount = 100 // Reduced for cleaner look
    const connectionDistance = 150
    const mouseDistance = 200
    
    // Mouse state
    const mouse = { x: null, y: null }

    const init = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Update and draw particles
      particles.forEach(p => {
        // Move
        p.x += p.vx
        p.y += p.vy
        
        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        
        // Mouse interaction
        if (mouse.x != null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouseDistance - distance) / mouseDistance
            const directionX = forceDirectionX * force * p.size * 0.5 // Push factor
            const directionY = forceDirectionY * force * p.size * 0.5
            
            p.x -= directionX
            p.y -= directionY
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 135, 9, 0.5)' // Orange
        ctx.fill()
      })
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(255, 135, 9, ${opacity * 0.2})` // Orange trace
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }

    const handleResize = () => init()
    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = e.clientX - rect.left
        mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
        mouse.x = null
        mouse.y = null
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    
    init()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.6 }}
    />
  )
}
