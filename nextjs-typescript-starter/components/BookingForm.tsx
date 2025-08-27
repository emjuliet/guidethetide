'use client'

import { useState, useEffect } from 'react'

interface BookingData {
  service: string
  people: number
  date: string
  time: string
  name: string
  phone: string
  email: string
  notes: string
  addons: {
    foodDrink: boolean
    videoClips: boolean
    highlightVideo: boolean
    cameraman: boolean
  }
}

interface PricingBreakdown {
  basePrice: number
  addonCosts: number
  bookingFee: number
  total: number
}

const services = {
  '': { name: '-', price: 0 },
  'freshwater': { name: 'Freshwater Fishing', price: 150 },
  'saltwater': { name: 'Saltwater Fishing', price: 150 },
  'beach-diving': { name: 'Beach Diving', price: 150 },
  'boat-fishing': { name: 'Boat Fishing', price: 150 },
  'boat-spearfishing': { name: 'Boat Spearfishing', price: 150 }
}

export default function BookingForm() {
  const [bookingData, setBookingData] = useState<BookingData>({
    service: '',
    people: 1,
    date: '',
    time: '6am',
    name: '',
    phone: '',
    email: '',
    notes: '',
    addons: {
      foodDrink: false,
      videoClips: false,
      highlightVideo: false,
      cameraman: false
    }
  })

  const [pricing, setPricing] = useState<PricingBreakdown>({
    basePrice: 0,
    addonCosts: 0,
    bookingFee: 50,
    total: 50
  })

  const [isLoading, setIsLoading] = useState(false)

  // Calculate pricing whenever booking data changes
  useEffect(() => {
    calculatePricing()
  }, [bookingData])

  const calculatePricing = () => {
    let basePrice = 0
    
    if (bookingData.service && services[bookingData.service as keyof typeof services]) {
      basePrice = services[bookingData.service as keyof typeof services].price
      
      // Add extra person cost ($50 each additional person)
      if (bookingData.people > 1) {
        basePrice += (bookingData.people - 1) * 50
      }
    }

    // Calculate addon costs
    let addonCosts = 0
    if (bookingData.addons.foodDrink) addonCosts += 25 * bookingData.people
    if (bookingData.addons.videoClips) addonCosts += 50 * bookingData.people
    if (bookingData.addons.highlightVideo) addonCosts += 100
    if (bookingData.addons.cameraman) addonCosts += 200 * bookingData.people

    const total = basePrice + addonCosts + 50 // +50 booking fee

    setPricing({
      basePrice,
      addonCosts,
      bookingFee: 50,
      total
    })
  }

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddonChange = (addon: keyof BookingData['addons']) => {
    setBookingData(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addon]: !prev.addons[addon]
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would integrate with Square Web Payments SDK
      // For now, we'll show a placeholder
      
      console.log('Booking Data:', bookingData)
      console.log('Pricing:', pricing)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert(`Booking submitted successfully!\n\nService: ${services[bookingData.service as keyof typeof services]?.name}\nTotal: $${pricing.total}\n\nIn production, this would process payment via Square and save to Supabase.`)
      
      // Reset form
      setBookingData({
        service: '',
        people: 1,
        date: '',
        time: '6am',
        name: '',
        phone: '',
        email: '',
        notes: '',
        addons: {
          foodDrink: false,
          videoClips: false,
          highlightVideo: false,
          cameraman: false
        }
      })
      
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an error processing your booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Wave animation background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(34, 211, 238, 0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(59, 130, 246, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(99, 102, 241, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(139, 92, 246, 0.1)" />
          </g>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Hooked?
          </h2>
          <p className="text-xl text-cyan-100">
            Let's book your epic fishing adventure! Can't wait to get out there with you
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Service Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-semibold mb-2">
                  Service Type *
                </label>
                <select
                  id="service"
                  value={bookingData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-white/10 border-2 border-cyan-300/30 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="freshwater">Freshwater Fishing - $150</option>
                  <option value="saltwater">Saltwater Fishing - $150</option>
                  <option value="beach-diving">Beach Diving - $150</option>
                  <option value="boat-fishing">Boat Fishing - $150</option>
                  <option value="boat-spearfishing">Boat Spearfishing - $150</option>
                </select>
              </div>

              <div>
                <label htmlFor="people" className="block text-sm font-semibold mb-2">
                  Number of People *
                </label>
                <select
                  id="people"
                  value={bookingData.people}
                  onChange={(e) => handleInputChange('people', parseInt(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 People</option>
                  <option value={3}>3 People</option>
                  <option value={4}>4 People</option>
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={today}
                  required
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-semibold mb-2">
                  Preferred Time *
                </label>
                <select
                  id="time"
                  value={bookingData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="6am">6:00 AM</option>
                  <option value="9am">9:00 AM</option>
                  <option value="12pm">12:00 PM</option>
                  <option value="3pm">3:00 PM</option>
                </select>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-sm font-semibold mb-4">Add-Ons</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.foodDrink}
                    onChange={() => handleAddonChange('foodDrink')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Food & Drink Package (+$25 per person)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.videoClips}
                    onChange={() => handleAddonChange('videoClips')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Video Clips (+$50 per person)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.highlightVideo}
                    onChange={() => handleAddonChange('highlightVideo')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Highlight Video (+$100)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.cameraman}
                    onChange={() => handleAddonChange('cameraman')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Cameraman Package (+$200 per person)</span>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold mb-2">
                Special Requests / Notes
              </label>
              <textarea
                id="notes"
                value={bookingData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special requests, experience level, or questions..."
                rows={3}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{services[bookingData.service as keyof typeof services]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>People:</span>
                  <span>{bookingData.people}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-ons:</span>
                  <span>${pricing.addonCosts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fee:</span>
                  <span>${pricing.bookingFee}</span>
                </div>
                <div className="border-t border-white/20 pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${pricing.total}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-4">
                *$50 deposit required for booking. Remaining balance due upon arrival.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 hover:shadow-2xl hover:transform hover:-translate-y-1'
              }`}
            >
              {isLoading ? 'Processing...' : `Let's Go! Pay ${pricing.bookingFee} & Reserve 🎣`}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}