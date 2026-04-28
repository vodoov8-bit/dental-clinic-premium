import Header from '@/components/header'
import Hero from '@/components/sections/hero'
import Services from '@/components/sections/services'
import Pricing from '@/components/sections/pricing'
import Testimonials from '@/components/sections/testimonials'
import FAQ from '@/components/sections/faq'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
