import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RealityCheck from './components/RealityCheck'
import Trinity from './components/Trinity'
import Showcase from './components/Showcase'

import AuthorityArchive from './components/AuthorityArchive'
import Architect from './components/Architect'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: Reality Check - The Leak Flow */}
          <RealityCheck />

          {/* Section 3: The Trinity - Protocol */}
          <Trinity />

          {/* Section 4: The Showcase - Protocol Demo */}
          <Showcase />



          {/* Section 6: The Authority Archive (with built-in transition to dark) */}
          <AuthorityArchive />

          {/* Section 7: The Architect (DARK) */}
          <Architect />

          {/* Section 8: Closing CTA (with built-in transition from dark) */}
          <ClosingCTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
