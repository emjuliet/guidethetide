'use client'

import Link from 'next/link'

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <span className="text-xl font-bold">GUIDE THE TIDE</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Premier fishing services in South Florida with Anthony Fernandez. 
              Experience the best freshwater, saltwater, and spearfishing adventures.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://instagram.com/guidethetidefishing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-cyan-600 p-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="tel:+19549089806"
                className="bg-slate-800 hover:bg-emerald-600 p-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="Call us"
              >
                📞
              </a>
              <a
                href="mailto:guidethetide@gmail.com"
                className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="Email us"
              >
                ✉️
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-400">Services</h3>
            <ul className="space-y-3">
              {["Freshwater Fishing", "Saltwater Fishing", "Beach Diving", "Boat Charters", "Video Packages"].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-400">Contact Info</h3>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-amber-500">📧</span>
                <a href="mailto:guidethetide@gmail.com" className="text-slate-400 hover:text-white">
                   guidethetide@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-500">📱</span>
                <a href="tel:+19549089806" className="text-slate-400 hover:text-white">
                  (954) 908-9806
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-500">📍</span>
                <span className="text-slate-400">South Florida</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-500">🔗</span>
                <a 
                  href="https://instagram.com/guidethetidefishing" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white"
                >
                  @guidethetidefishing
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="text-slate-400 hover:text-white"
                >
                  Book Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-400 hover:text-white"
                >
                  About Anthony
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white"
                >
                  View Services
                </button>
              </li>
              <li>
                <Link href="/policies" className="text-slate-400 hover:text-white">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © {currentYear} Guide The Tide. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">⚖️ Fishing License Required</span>
            <span className="flex items-center gap-1">🌤️ Weather Dependent</span>
            <span className="flex items-center gap-1">🛡️ Fully Insured</span>
          </div>
        </div>

        {/* Additional Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl p-6 border border-amber-500/20">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h4 className="font-semibold text-amber-300 mb-2">Important Information</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                All trips are weather dependent and may be rescheduled for safety. 
                Florida fishing license required for all participants over 16. 
                We provide all necessary equipment unless specified otherwise. 
                Gratuity for excellent service is appreciated but not required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
