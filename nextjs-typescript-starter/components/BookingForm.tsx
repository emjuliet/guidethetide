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

// Square Web Payments SDK types
declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => {
        card: () => Promise<any>
        build: () => Promise<any>
      }
    }
  }
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
  const [card, setCard] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [reservationTimer, setReservationTimer] = useState<number>(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  // Load Square Web Payments SDK
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sandbox-web.squarecdn.com/v1/square.js'
    script.async = true
    script.onload = initializeSquare
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const initializeSquare = async () => {
    if (!window.Square) return

    try {
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID || 'sandbox-sq0idb-your-app-id',
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'sandbox-location-id'
      )

      const cardElement = await payments.card()
      await cardElement.attach('#card-container')
      setCard(cardElement)
    } catch (error) {
      console.error('Square initialization error:', error)
    }
  }

  // Calculate pricing whenever booking data changes
  useEffect(() => {
    calculatePricing()
  }, [bookingData])

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval)
    }
  }, [timerInterval])

  const calculatePricing = () => {
    let basePrice = 0
    
    if (bookingData.service && services[bookingData.service as keyof typeof services]) {
      basePrice = services[bookingData.service as keyof typeof services].price
      
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

  const startReservationTimer = () => {
    setReservationTimer(15 * 60) // 15 minutes in seconds
    
    const interval = setInterval(() => {
      setReservationTimer((prev) => {
        if (prev <= 1) {
          // Timer expired
          clearInterval(interval)
          alert('Your reservation has expired. Please start over.')
          setShowPayment(false)
          setReservationId(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    setTimerInterval(interval)
  }

  const clearReservationTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    setReservationTimer(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
    
    if (!showPayment) {
      // First step: Check availability and create reservation
      setIsLoading(true)
      
      try {
        const checkResponse = await fetch('/api/check-availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: bookingData.date,
            time: bookingData.time,
            service: bookingData.service
          })
        })

        const availabilityResult = await checkResponse.json()

        if (checkResponse.ok && availabilityResult.available) {
          // Create 15-minute reservation
          const reserveResponse = await fetch('/api/create-reservation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bookingData,
              pricing
            })
          })

          const reservationResult = await reserveResponse.json()

          if (reserveResponse.ok) {
            // Store reservation ID and show payment form
            setReservationId(reservationResult.reservationId)
            setShowPayment(true)
            
            // Start 15-minute countdown timer
            startReservationTimer()
          } else {
            throw new Error(reservationResult.error || 'Failed to reserve slot')
          }
        } else {
          alert('Sorry, this time slot is no longer available. Please select a different time.')
        }
      } catch (error) {
        console.error('Reservation error:', error)
        alert('Unable to check availability. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Second step: Process payment for existing reservation
    if (!card) {
      alert('Payment system not loaded. Please refresh and try again.')
      return
    }

    setIsLoading(true)

    try {
      // Tokenize card with Square
      const tokenResult = await card.tokenize()
      
      if (tokenResult.status === 'OK') {
        // Convert reservation to confirmed booking with payment
        const response = await fetch('/api/confirm-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservationId,
            paymentToken: tokenResult.token,
            pricing
          })
        })

        const result = await response.json()

        if (response.ok) {
          alert(`Booking confirmed! 
          
Payment processed: ${pricing.bookingFee}
Confirmation details will be sent to ${bookingData.email}
          
Remaining balance: ${pricing.total - pricing.bookingFee} due at trip.`)
          
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
          setShowPayment(false)
          setReservationId(null)
          clearReservationTimer()
        } else {
          throw new Error(result.error || 'Payment failed')
        }
      } else {
        throw new Error('Card tokenization failed: ' + tokenResult.errors?.map((e: any) => e.message).join(', '))
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed: ' + (error as Error).message)
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
                  className="w-full p-3 rounded-xl bg-white/10 border-2 border-cyan-300/30 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="" className="bg-slate-800 text-white">Select a service</option>
                  <option value="freshwater" className="bg-slate-800 text-white">Freshwater Fishing - $150</option>
                  <option value="saltwater" className="bg-slate-800 text-white">Saltwater Fishing - $150</option>
                  <option value="beach-diving" className="bg-slate-800 text-white">Beach Diving - $150</option>
                  <option value="boat-fishing" className="bg-slate-800 text-white">Boat Fishing - $150</option>
                  <option value="boat-spearfishing" className="bg-slate-800 text-white">Boat Spearfishing - $150</option>
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
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value={1} className="bg-slate-800 text-white">1 Person</option>
                  <option value={2} className="bg-slate-800 text-white">2 People</option>
                  <option value={3} className="bg-slate-800 text-white">3 People</option>
                  <option value={4} className="bg-slate-800 text-white">4 People</option>
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
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 [&>option]:bg-slate-800 [&>option]:text-white"
                >
                  <option value="6am" className="bg-slate-800 text-white">6:00 AM</option>
                  <option value="9am" className="bg-slate-800 text-white">9:00 AM</option>
                  <option value="12pm" className="bg-slate-800 text-white">12:00 PM</option>
                  <option value="3pm" className="bg-slate-800 text-white">3:00 PM</option>
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
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Food & Drink Package (+$25 per person)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.videoClips}
                    onChange={() => handleAddonChange('videoClips')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Video Clips (+$50 per person)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.highlightVideo}
                    onChange={() => handleAddonChange('highlightVideo')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Highlight Video (+$100)</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingData.addons.cameraman}
                    onChange={() => handleAddonChange('cameraman')}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
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
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* Reservation Timer - Show when payment form is active */}
            {showPayment && reservationTimer > 0 && (
              <div className="bg-orange-500/20 border border-orange-400 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">
                    Slot reserved for:
                  </span>
                  <span className="text-orange-200 font-bold text-lg">
                    {formatTime(reservationTimer)}
                  </span>
                </div>
                <p className="text-sm text-orange-200 mt-1">
                  Complete payment to secure your booking
                </p>
              </div>
            )}

            {/* Square Payment Form - Only show after reservation is created */}
            {showPayment && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Payment Information</h3>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Card Details
                  </label>
                  <div id="card-container" className="bg-white/10 rounded-xl p-4 border border-white/20">
                    {/* Square card form will be injected here */}
                  </div>
                </div>
                <div className="text-sm text-cyan-100">
                  Secure payment powered by Square
                </div>
              </div>
            )}

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
                *$50 deposit is required for booking. Remaining balance due upon arrival.
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
              {isLoading 
                ? 'Processing...' 
                : showPayment 
                  ? `Pay ${pricing.bookingFee} & Confirm Booking`
                  : 'Check Availability & Reserve'
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}