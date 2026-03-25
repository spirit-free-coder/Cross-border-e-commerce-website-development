import React from 'react';
import { motion } from 'motion/react';
import { Sprout, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Peaceful garden" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWo97kqL5r0S0codt7-WKQCtVQWWO96P0xaSELqm_TYGk-8HuIOQvBjzKHUV1xhIjgXe45XpPRPbYhEVGhI7iiSTa3eu8c9I2K_n7yN5cAtcYlDZBYCVeD9s2KZX4M9Zk3hblgSOpFaMBS9s1eENskC0NeXq5W9E8p-SHjcucrOXpcYWARDETuTjsECEpx9SivWr1gTfjQd-soxhYEUm1M6DkF8hPhwhbKV1dBwh9_Jlpal4AZu1-d1xBgmdX6F8Of9dOpoPQ6f2pD"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-6 block font-bold">The Digital Altar</span>
            <h2 className="text-5xl md:text-7xl font-headline italic leading-[1.1] text-on-surface mb-8">A Beautiful Farewell for Your Companion</h2>
            <p className="text-lg md:text-xl font-body text-on-surface-variant mb-10 leading-relaxed max-w-lg">
              Honor the bond that transcends time. Explore our curated sanctuary of handcrafted memorials designed to celebrate a life of unconditional love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/shop" className="bg-primary hover:bg-primary-dim text-white px-10 py-4 rounded-xl font-label font-medium transition-all duration-300 shadow-sm hover:scale-[1.02] text-center">
                Explore the Sanctuary
              </NavLink>
              <NavLink to="/story" className="bg-secondary-container hover:bg-on-surface hover:text-white text-on-secondary-container px-10 py-4 rounded-xl font-label font-medium transition-all duration-300 hover:scale-[1.02] text-center">
                Create a Memorial
              </NavLink>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl rotate-2">
              <img 
                alt="Memory" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUZPGvox9bqvbSYCOHEpYb9a6WnXn1qTZb_D0af5pQBF1ew5_BhU3WGJ6EwTnz0Y-rQDQZ_fi_utR49ix_2umHMAcIDzoe0MwjWnTiAuNsw-Jm7bOUFIB8Wg7LT_S_lJBLmdmsJzeTrJZpxMeA9Htl24tgb2jxVuAweG53Tq178e_S2mC5hWIgtOQXeMNc80XhyQvgYZtaBgNg1Dnqwm9Rzsyub8LBf1IhBksQLZTsf7J9D9V2Ux9DHq3TfYaZqo5tLjasgvBaP0yD"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-6 container mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-headline italic mb-4">Curated with Reverence</h3>
            <p className="text-on-surface-variant leading-relaxed">Each piece in our collection is chosen for its ability to provide comfort and hold the weight of precious memories.</p>
          </div>
          <NavLink className="font-label text-sm font-bold tracking-widest uppercase border-b border-primary pb-1 hover:text-primary transition-colors" to="/shop">View All Collections</NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          <NavLink to="/shop" className="md:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-high transition-transform duration-500 cursor-pointer">
            <img 
              alt="Urns" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxe4d5t4plFvKwNdRkRbFhnrgzEOhBibYGkbenSzhSMFqwnM0cCRFJuj0LRlqwUt7pHf4ujeqIxqY06ZwTRb5u6B51ASvlzl6v3DdamHJcbbbZscczB_z-BRdE7f9ivA6XO0Hj-npEX-gvVJIAQ84BG-vZyAB8-XC4Yk1ZK0uW70oTAWrhHQ4KBcwONUFQJOBPe0tc-7pNEfDz8FI-QQtTBDXoeMs8GJmHFQO7H-1cBvUjA9BmBFZ8A88a6q2T3L2v6uXBhrZYgPoP"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h4 className="text-3xl font-headline italic mb-2">Handcrafted Urns</h4>
              <p className="font-body opacity-90 max-w-sm">Elegant ceramic vessels that provide a dignified resting place.</p>
            </div>
          </NavLink>

          <NavLink to="/shop" className="md:col-span-4 group relative overflow-hidden rounded-lg bg-secondary-container/20 transition-transform duration-500 cursor-pointer p-8 flex flex-col justify-between">
            <div>
              <Sprout className="text-secondary mb-6" size={40} />
              <h4 className="text-2xl font-headline italic mb-4">Memorial Treats</h4>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">Special comfort foods and commemorative seeds to plant in their honor.</p>
            </div>
            <div className="rounded-xl overflow-hidden h-48 mt-8">
              <img 
                alt="Seeds" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcfC0ZxJZULPPHxhPAVT_yW6CWLZoNAAW4_R6rGNa4OhQH4Beb0hYpcn3K6kAKjMN8rKNLESdJCKCg8fReZdn6znCGIgw_MLVIHOu1sCVoQlpENEqvT0bqd-o5Zy1mrtrwYcWFKQ7-NZDrMqetRxEOTvepkk2UAVurpiwS2S2CNSgCSZMF7j_2L0-r4hHxBRS7K7QyXLx5lr1BwW6_XyvG_kWGRlRtnPnbVx8ul4NRkVc6ou7GscrJKoS0A76Uyg_CGi2edAq_b_Qq"
                referrerPolicy="no-referrer"
              />
            </div>
          </NavLink>

          <NavLink to="/shop" className="md:col-span-5 group relative overflow-hidden rounded-lg bg-surface-container-highest transition-transform duration-500 cursor-pointer">
            <div className="p-8">
              <h4 className="text-2xl font-headline italic mb-2">Sanctuary Houses</h4>
              <p className="font-body text-on-surface-variant text-sm mb-6">Delicate indoor resting places for quiet reflection.</p>
            </div>
            <img 
              alt="Sanctuary" 
              className="w-full h-64 object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATEPaYlGFcZrKd1axbtZ1JtPcrmvtBme0UFi50BSHa0ONF8SjOkrGCR8NfSeEa1fcdcYDNPz3ZoEcgmb0kzr9Jugdr_myqPPMbDBcneC4ljrNfTdn1Hr4xJ87jTu9oY5dOz-x2gT7CgyWcfUiYQq7NAemeVoKpiIxogN50hNLX7nqPl4k40J0fhsGmXcaora7DZfkhyO3ACjiEuc_aSsOQOjaPF8eeRfttCq0iq9nIu8_4QRzpjgZDIzhDmIicRV12plcEEggiCOZ2"
              referrerPolicy="no-referrer"
            />
          </NavLink>

          <div className="md:col-span-7 group relative overflow-hidden rounded-lg bg-primary-container/20 transition-transform duration-500 flex items-center justify-center cursor-pointer p-12 text-center">
            <div>
              <h4 className="text-4xl font-headline italic mb-4">Eternal Inscriptions</h4>
              <p className="font-body text-on-surface-variant max-w-md mx-auto mb-8">Personalize any memorial item with names, dates, or a custom message of love.</p>
              <NavLink to="/support" className="bg-on-surface text-surface px-8 py-3 rounded-full font-label text-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors inline-block">Start Customizing</NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-6 max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <img 
              alt="Our Story" 
              className="rounded-lg shadow-xl grayscale-[20%]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu7rkI6JjDLskNRzC95dNMiOUxX6yS0GNQi44mkjpKhQ8oiUGgGNofoKKMXDvhvD44K95esPqc46QoZiIpmIxpMiGfi5E1k4Zpe66A81HLcsA6KfpSZN5QYYOcJ9hMWB4b134k_etioxjf2YXQIMhbQ_-eXAyR_0SlOrCCHX-o7U02IVuVnmqNDN2SHVgdc4Na53UDGCjrpoi-eLm0pB56nnR2Nqcnj62IqMkql6B5McOkwpceatubI4mwhbM4MK_kiD2r1z4djWp7"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container p-6 text-center leading-tight font-headline italic shadow-lg">
              Since 1994
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-6 block font-bold">Our Philosophy</span>
            <h3 className="text-4xl md:text-5xl font-headline italic mb-8 leading-tight">Grief is the final act of love we can give.</h3>
            <div className="space-y-6 text-on-surface-variant leading-loose text-lg font-body">
              <p>Eternal Garden was born from a simple need: a place to find beauty in the midst of loss. We believe that the items we choose to remember our companions should be as unique and beautiful as the lives they represent.</p>
              <p>Our sanctuary works with independent ceramicists, woodworkers, and artisans to create memorials that don't just sit in a room, but belong there—becoming part of your home's story.</p>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary"></div>
              <span className="font-headline italic text-xl">The Founders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto bg-surface-container rounded-xl p-12 text-center border-t-4 border-primary/20 ambient-glow">
          <h3 className="text-3xl font-headline italic mb-4">Healing Words & Updates</h3>
          <p className="font-body text-on-surface-variant mb-10">Receive gentle reminders on healing and exclusive early access to new handcrafted collections.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              className="flex-grow bg-surface border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface-variant font-body outline-none" 
              placeholder="Your email address" 
              type="email" 
            />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-label font-bold uppercase tracking-widest text-xs hover:bg-primary-dim transition-colors">Join Us</button>
          </form>
        </div>
      </section>
    </div>
  );
}
