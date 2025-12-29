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
      <TextReveal
        text="Our commitment to excellence ensures every laptop receives thorough diagnostics, professional repairs, and quality assurance testing before return to service."
        className="my-32"
      />
      <Team />
      <Footer />
    </div>
  )
}

export default App
