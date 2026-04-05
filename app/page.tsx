import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { MarqueeTrustBar } from '@/components/home/MarqueeTrustBar'
import { Calculator } from '@/components/home/Calculator'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { TrustMetrics } from '@/components/home/TrustMetrics'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { ResultsCards } from '@/components/home/ResultsCards'
import { Testimonials } from '@/components/home/Testimonials'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeTrustBar />
      <Calculator />
      <ServicesGrid />
      <TrustMetrics />
      <ProcessTimeline />
      <ResultsCards />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  )
}
