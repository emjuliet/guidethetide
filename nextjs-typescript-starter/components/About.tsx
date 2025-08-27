'use client'

import { Fish, Waves, Target, BookOpen, Camera, MessageCircle, Users } from 'lucide-react'
import { useState } from 'react'

export default function About() {
  const [imageError, setImageError] = useState(false)

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Hey, I'm Anthony!
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
            </div>

            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                I've been completely hooked on fishing since I was 5 years old! At 22, I've turned my 
                lifelong obsession into sharing South Florida's incredible fishing with others. 
                There's nothing I love more than being on the water.
              </p>
              
              <p>
                What makes my trips different? I'm not just about catching fish - I'm about creating 
                <strong className="text-slate-900"> unforgettable experiences</strong>! Whether you're 
                brand new to fishing or already experienced, I'll make sure you have an epic time and 
                learn something new.
              </p>
              
              <p>
                I'm building an amazing team of talented guides who share my passion for fishing and 
                showing people the best South Florida waters have to offer. Together, we're creating 
                something special - authentic adventures that you'll never forget!
              </p>
            </div>

            {/* Expertise Areas */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-100">
                <div className="text-2xl mb-2">
                  <Fish className="w-8 h-8 text-cyan-600" />
                </div>
                <div className="font-semibold text-slate-900">Freshwater Master</div>
                <div className="text-sm text-slate-600">Peacock bass, tarpon, snakehead</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-100">
                <div className="text-2xl mb-2">
                  <Waves className="w-8 h-8 text-blue-600" />
                </div>
                <div className="font-semibold text-slate-900">Saltwater Pro</div>
                <div className="text-sm text-slate-600">Snapper, snook, grouper</div>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border-2 border-teal-100">
                <div className="text-2xl mb-2">
                  <Target className="w-8 h-8 text-teal-600" />
                </div>
                <div className="font-semibold text-slate-900">Spearfishing</div>
                <div className="text-sm text-slate-600">Free diving & underwater hunting</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-100">
                <div className="text-2xl mb-2">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="font-semibold text-slate-900">Teaching & Mentoring</div>
                <div className="text-sm text-slate-600">Fish laws & techniques</div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-semibold">Follow the Adventure!</div>
                  <div className="text-cyan-100">@guidethetidefishing</div>
                </div>
              </div>
              <p className="text-cyan-100 text-sm">
                See the daily catches, epic moments, and behind-the-scenes fun from our South Florida fishing adventures!
              </p>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div className="space-y-8">
            
            {/* Main Image/Avatar */}
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-3xl h-96 flex items-center justify-center text-white shadow-2xl border-4 border-cyan-200 overflow-hidden">
                {!imageError ? (
                  <img 
                    src="/anthony-photo.jpg" 
                    alt="Anthony Fernandez - Fishing Guide" 
                    className="w-full h-full object-cover object-center rounded-2xl"
                    style={{ objectPosition: 'center top' }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <Fish className="w-24 h-24" />
                )}
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border-4 border-cyan-400">
                <div className="text-3xl font-bold text-cyan-600">17</div>
                <div className="text-sm text-slate-600 font-semibold">Years</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-cyan-50 rounded-xl p-6 border-2 border-cyan-100">
                <div className="text-3xl font-bold text-cyan-600 mb-2">22</div>
                <div className="text-sm text-slate-600 font-medium">Years Young</div>
              </div>
              <div className="text-center bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  <Users className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-sm text-slate-600 font-medium">Growing Team</div>
              </div>
              <div className="text-center bg-teal-50 rounded-xl p-6 border-2 border-teal-100">
                <div className="text-3xl font-bold text-teal-600 mb-2">365</div>
                <div className="text-sm text-slate-600 font-medium">Days Thinking Fish</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border-l-4 border-cyan-400">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">
                  <MessageCircle className="w-8 h-8 text-cyan-600" />
                </div>
                <div>
                  <p className="text-slate-600 italic mb-2">
                    "Anthony's energy is contagious! He made our first spearfishing trip so much fun and 
                    we actually caught fish. Dude knows his spots and keeps it real. Can't wait to book again!"
                  </p>
                  <div className="text-sm font-semibold text-slate-900">- Jake & Sarah</div>
                  <div className="text-xs text-slate-500">Recent Trip</div>
                </div>
              </div>
            </div>

            {/* Certifications/Skills */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-emerald-50 rounded-lg p-3">
                <div className="text-emerald-600">✓</div>
                <div className="text-sm font-medium text-emerald-800">Florida Licensed</div>
              </div>
              <div className="flex items-center space-x-3 bg-emerald-50 rounded-lg p-3">
                <div className="text-emerald-600">✓</div>
                <div className="text-sm font-medium text-emerald-800">Safety Certified</div>
              </div>
              <div className="flex items-center space-x-3 bg-emerald-50 rounded-lg p-3">
                <div className="text-emerald-600">✓</div>
                <div className="text-sm font-medium text-emerald-800">First Aid Trained</div>
              </div>
              <div className="flex items-center space-x-3 bg-emerald-50 rounded-lg p-3">
                <div className="text-emerald-600">✓</div>
                <div className="text-sm font-medium text-emerald-800">Insured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Wave pattern background */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 20">
                <path d="M0,10 Q25,0 50,10 T100,10 V20 H0 Z" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready for an Epic Fishing Adventure?
              </h3>
              <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                Let's make some waves together! Whether you're new to fishing or ready to level up your game, 
                I'll show you the best spots and help you catch some awesome fish. My growing team and I are 
                here to create unforgettable experiences on the water.
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('booking')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-1 shadow-lg"
              >
                Let's Go Fishing!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}