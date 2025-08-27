import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <BookingForm />
      <Footer />
    </main>
  )
}

export const metadata = {
  title: 'Guide The Tide - Premier Fishing Charters in South Florida',
  description: 'Experience the best fishing charters in South Florida with Captain Anthony Fernandez. Freshwater, saltwater, spearfishing, and video packages available.',
  keywords: 'fishing charter, South Florida fishing, spearfishing, boat fishing, Anthony Fernandez, Guide The Tide',
}