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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎣</span>
              <span className="text-xl font-bold">GUIDE THE TIDE</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Premier fishing charters in South Florida with Captain Anthony Fernandez. 
              Experience the best freshwater, saltwater, and spearfishing adventures.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/guidethetidefishing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-cyan-600 p-3 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a
                href="tel:+1555FISHING"
                className="bg-slate-800 hover:bg-emerald-600 p-3 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                aria-label="Call us"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.003 5.884L10.378 8.9a.5.5 0 01.293.407l.01 5.693a.5.5 0 01-.425.496l-7.965 1.23a.5.5 0 01-.574-.463L1.5 6.377a.5.5 0 01.503-.493zm15.745.48l2.25 8.886a.5.5 0 01-.374.61l-7.965-1.23a.5.5 0 01-.426-.496V8.441a.5.5 0 01.293-.407l8.375-3.016a.5.5 0 01.847.346z"/>
                </svg>
              </a>
              
              <a
                href="mailto:info@guidethetide.com"
                className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                aria-label="Email us"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-400">Services</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Freshwater Fishing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Saltwater Fishing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Beach Diving
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Boat Charters
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Video Packages
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-cyan-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-amber-500 mt-1">📧</span>
                <div>
                  <div className="text-slate-300">Email</div>
                  <a 
                    href="mailto:info@guidethetide.com" 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    info@guidethetide.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-amber-500 mt-1">📱</span>
                <div>
                  <div className="text-slate-300">Phone</div>
                  <a 
                    href="tel:+1555FISHING" 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    (555) FISHING
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-amber-500 mt-1">📍</span>
                <div>
                  <div className="text-slate-300">Location</div>
                  <div className="text-slate-400">South Florida</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-amber-500 mt-1">🔗</span>
                <div>
                  <div className="text-slate-300">Instagram</div>
                  <a 
                    href="https://instagram.com/guidethetidefishing" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    @guidethetidefishing
                  </a>
                </div>
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
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Book Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  About Anthony
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  View Services
                </button>
              </li>
              <li>
                <Link 
                  href="/policies" 
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  Policies
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
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
            <span className="flex items-center gap-1">
              <span>⚖️</span> Fishing License Required
            </span>
            <span className="flex items-center gap-1">
              <span>🌤️</span> Weather Dependent
            </span>
            <span className="flex items-center gap-1">
              <span>🛡️</span> Fully Insured
            </span>
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