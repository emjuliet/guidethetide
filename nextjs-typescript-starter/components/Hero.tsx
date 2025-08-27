'use client'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white overflow-hidden pt-8 sm:pt-12 md:pt-0"
      >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-600/20 to-transparent">
        <div className="absolute inset-0 opacity-30">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(6, 182, 212, 0.7)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(6, 182, 212, 0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(6, 182, 212, 0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(6, 182, 212, 0.1)" />
            </g>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Just the logo, bigger and more prominent */}
          <div className="mb-1"> {/* reduced spacing under logo */}
        <img 
          src="/guide-the-tide-logo.png" 
          alt="Guide The Tide Logo" 
          className="h-72 w-56 sm:h-80 sm:w-64 md:h-96 md:w-72 lg:h-[28rem] lg:w-[22rem] mx-auto mb-1"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        {/* Text fallback if logo fails to load */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent hidden">
          GUIDE THE TIDE
        </h1>
      </div>

          
          <p className="text-xl md:text-2xl mb-2 text-slate-200 max-w-3xl mx-auto leading-relaxed">
         Guide the Tide offers unforgettable fishing and diving experiences across South Florida. From chasing peacock bass in freshwater canals to offshore boat trips and spearfishing dives, every adventure is 
         tailored to your skill level and goals. We provide the gear, local knowledge, and guidance. You just show up ready for the water!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('booking')}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Book Your Adventure
            </button>
            
            <button
              onClick={() => scrollToSection('services')}
              className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 backdrop-blur-sm"
            >
              View Services
            </button>
          </div>

   
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('services')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .waves {
          position: relative;
          width: 100%;
          height: 15vh;
          margin-bottom: -7px;
          min-height: 100px;
          max-height: 150px;
        }

        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }

        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }

        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }

        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }

        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }

        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% { 
            transform: translate3d(85px,0,0);
          }
        }
      `}</style>
    </section>
  )
}