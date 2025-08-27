'use client'

import { Fish, Waves, Target, Ship, Camera, Utensils, Sparkles, Droplets, Palmtree, Anchor } from 'lucide-react'

interface Service {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  price: string
  features: string[]
  buttonText: string
}

const services: Service[] = [
  {
    id: 'freshwater',
    icon: <Fish className="w-12 h-12" />,
    title: 'Freshwater Fishing',
    description: 'Target peacock bass, tarpon, snakehead and more in South Florida\'s pristine freshwater spots.',
    price: '$150',
    features: [
      'Peacock bass, tarpon, snakehead',
      '$50 per extra person',
      'All equipment included',
      'Expert guidance & teaching'
    ],
    buttonText: 'Book Now'
  },
  {
    id: 'saltwater',
    icon: <Waves className="w-12 h-12" />,
    title: 'Saltwater Fishing',
    description: 'Experience the thrill of saltwater fishing for snapper, tarpon, snook and other prized species.',
    price: '$150',
    features: [
      'Snapper, tarpon, snook',
      '$50 per extra person',
      'Professional equipment',
      'Fish laws & regulations guidance'
    ],
    buttonText: 'Book Now'
  },
  {
    id: 'beach-diving',
    icon: <Palmtree className="w-12 h-12" />,
    title: 'Beach Diving',
    description: 'Spearfishing adventures targeting snapper, hogfish, grouper and more from the beach.',
    price: '$150',
    features: [
      'Snapper, hogfish, grouper',
      '$150 with your gear',
      '$250 with rental gear',
      'Safety-focused approach'
    ],
    buttonText: 'Book Now'
  },
  {
    id: 'boat-fishing',
    icon: <Ship className="w-12 h-12" />,
    title: 'Boat Fishing',
    description: 'Premium boat charters for bottom fishing, trolling, and inshore adventures.',
    price: '$150',
    features: [
      'Bottom fishing & trolling',
      'Max 2 people',
      '$50 per extra person',
      'Inshore specialties'
    ],
    buttonText: 'Book Now'
  },
  {
    id: 'boat-spearfishing',
    icon: <Anchor className="w-12 h-12" />,
    title: 'Boat Spearfishing',
    description: 'Advanced spearfishing trips by boat to access the best underwater hunting spots.',
    price: '$150',
    features: [
      'Deep water spearfishing',
      '$150 with your gear',
      '$250 with rental gear',
      'Expert free diving guidance'
    ],
    buttonText: 'Book Now'
  },
  {
    id: 'video',
    icon: <Camera className="w-12 h-12" />,
    title: 'Video Packages',
    description: 'Capture your fishing adventure with professional video and drone footage.',
    price: '$50+',
    features: [
      'Raw clips: $50 per person',
      'Highlight reel: $100',
      'Full video: $300',
      'Drone footage available'
    ],
    buttonText: 'Add to Trip'
  }
]

export default function Services() {
  const scrollToBooking = (serviceId?: string) => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Pre-select service in booking form if provided
    if (serviceId && typeof window !== 'undefined') {
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement
        if (serviceSelect) {
          serviceSelect.value = serviceId
          // Trigger change event to update pricing
          serviceSelect.dispatchEvent(new Event('change'))
        }
      }, 500)
    }
  }

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Epic Fishing Adventures
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From epic spearfishing dives to freshwater bass hunts - let's make some waves together! 
            Every trip is an adventure waiting to happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-cyan-100 hover:border-cyan-300 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                {/* Icon with wave background */}
                <div className="relative mb-6">
                  <div className="text-cyan-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {service.icon}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Price */}
                <div className="text-3xl font-bold text-cyan-600 mb-4">
                  {service.price}
                  <span className="text-base font-normal text-slate-500 ml-2">
                    /3 hours
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-start text-slate-600"
                    >
                      <span className="text-emerald-500 mr-3 mt-1 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => scrollToBooking(service.id)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  {service.buttonText}
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-8 border-2 border-cyan-100">
          <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Level Up Your Adventure!
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mb-3">
                <Utensils className="w-12 h-12 mx-auto text-cyan-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Snacks & Drinks</h4>
              <p className="text-slate-600 text-sm mb-2">Fuel up for the adventure!</p>
              <div className="text-cyan-600 font-bold">$25/person</div>
            </div>
            
            <div className="text-center">
              <div className="mb-3">
                <Fish className="w-12 h-12 mx-auto text-cyan-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Fish Cleaning</h4>
              <p className="text-slate-600 text-sm mb-2">Fresh cleaned fish ready to cook!</p>
              <div className="text-cyan-600 font-bold">$3-$6/fish</div>
            </div>
            
            <div className="text-center">
              <div className="mb-3">
                <Droplets className="w-12 h-12 mx-auto text-cyan-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Boat Cleaning</h4>
              <p className="text-slate-600 text-sm mb-2">We'll clean up so you can chill</p>
              <div className="text-cyan-600 font-bold">$5/foot</div>
            </div>
            
            <div className="text-center">
              <div className="mb-3">
                <Camera className="w-12 h-12 mx-auto text-cyan-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Epic Videos</h4>
              <p className="text-slate-600 text-sm mb-2">Capture the stoke for the 'gram</p>
              <div className="text-cyan-600 font-bold">$50-$300</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToBooking()}
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-1 shadow-lg"
          >
            Let's Make Some Waves!
          </button>
        </div>
      </div>
    </section>
  )
}