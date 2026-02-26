import Header from '../components/landing/Header'
import Hero from '../components/landing/Hero'
import About from '../components/landing/About'
import Features from '../components/landing/Features'
import RoutesSection from '../components/landing/Routes'
import Portals from '../components/landing/Portals'
import HowItWorks from '../components/landing/HowItWorks'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <RoutesSection />
        <Portals />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
