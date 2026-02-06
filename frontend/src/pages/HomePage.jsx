import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import CTASection from '../components/CTASection.jsx'
import StatsCounter from '../components/StatsCounter.jsx'
import Footer from '../components/Footer.jsx'
import LoginModal from '../components/LoginModal.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const features = [
    {title: 'Easy Discovery', desc: 'Find the perfect space by location, price, capacity, and amenities'},
    {title: 'Secure Booking', desc: 'Book with confidence with our secure payment and confirmation system'},
    {title: 'Flexible Duration', desc: 'Book by the hour or by the day - choose what works best for you'},
  ]

  const spaceTypes = [
    'Coworking Spaces','Private Offices','Meeting Rooms','Conference Centers','Creative Studios','Commercial Kitchens'
  ]

  const handleGetStarted = () => {
    setShowLoginModal(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={handleGetStarted} />
      <main className="flex-1">
        <section id="home">
          <Hero onGetStartedClick={handleGetStarted} />
        </section>

        <section id="about" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Spacer?</h2>
          <p className="text-gray-600 mb-8">Trusted by businesses and individuals across Kenya</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} />
            ))}
          </div>
        </section>

        <section id="spaces" className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-semibold mb-4">Browse by Space Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {spaceTypes.map((s) => (
                <div key={s} className="p-4 bg-white rounded shadow-sm text-center">{s}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-4xl font-bold mb-2">1</div>
              <div className="font-semibold">Search</div>
              <p className="text-gray-500">Browse spaces by location, type, and price</p>
            </div>
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-4xl font-bold mb-2">2</div>
              <div className="font-semibold">Select</div>
              <p className="text-gray-500">Choose the perfect space for your needs</p>
            </div>
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="font-semibold">Book</div>
              <p className="text-gray-500">Secure your booking with instant confirmation</p>
            </div>
            <div className="p-6 bg-white rounded shadow text-center">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="font-semibold">Enjoy</div>
              <p className="text-gray-500">Show up and make great things happen</p>
            </div>
          </div>
        </section>

        <StatsCounter />

        <CTASection onGetStartedClick={handleGetStarted} />
      </main>

      <Footer />
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
