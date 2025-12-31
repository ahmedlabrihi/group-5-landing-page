import Hero from './components/Hero'
import Workflow from './components/Workflow'
import Features from './components/Features'
import Team from './components/Team'
import Footer from './components/Footer'
import ShapeOverlay from './components/ShapeOverlay'
import FlipGallery from './components/FlipGallery'
import TextReveal from './components/TextReveal'
import WhyChooseUs from './components/WhyChooseUs'
import FAQ from './components/FAQ'

function App() {
  return (
    <div className="min-h-screen relative">
      <ShapeOverlay />
      <Hero />
      <FlipGallery />
      <TextReveal
        text="EMS provides comprehensive laptop maintenance solutions with expert hardware and software support, ensuring your devices operate at peak performance."
        className="my-24"
      />
      <Workflow />
      <Features />
      <Team />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
