import Hero from './components/Hero'
import Workflow from './components/Workflow'
import Features from './components/Features'
import Team from './components/Team'
import Footer from './components/Footer'
import ShapeOverlay from './components/ShapeOverlay'
import FlipGallery from './components/FlipGallery'
import TextReveal from './components/TextReveal'

function App() {
  return (
    <div className="min-h-screen relative">
      <ShapeOverlay />
      <Hero />
      <FlipGallery />
      <TextReveal
        text="EMS provides comprehensive laptop maintenance solutions with expert hardware and software support, ensuring your devices operate at peak performance."
        className="my-32"
      />
      <Workflow />
      <Features />

      {/* Extended scroll section for commitment text */}
      <section className="py-32 px-4 relative bg-gradient-to-b from-transparent via-orange-950/5 to-transparent">
        <div className="max-w-4xl mx-auto space-y-64">

          {/* Spacer with decorative element */}
          <div className="text-center">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent mx-auto" />
          </div>

          <TextReveal
            text="Our commitment to excellence ensures every laptop receives thorough diagnostics, professional repairs, and quality assurance testing before return to service."
            className=""
          />

          {/* Additional commitment points */}
          <TextReveal
            text="From hardware failures to software corruption, our certified technicians diagnose and resolve issues with precision and care."
            className=""
          />

          <TextReveal
            text="We believe in transparent communication, keeping you informed at every step of the repair process."
            className=""
          />

          <TextReveal
            text="Quality is not just a goal — it's our standard. Every device undergoes rigorous testing before leaving our facility."
            className=""
          />

          {/* Spacer with decorative element */}
          <div className="text-center">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent mx-auto" />
          </div>

        </div>
      </section>

      <Team />
      <Footer />
    </div>
  )
}

export default App
