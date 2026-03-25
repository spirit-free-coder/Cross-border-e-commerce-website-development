import React from 'react';
import { motion } from 'motion/react';
import { Brain, Users, Heart, Music, ArrowRight, CheckCircle, Mail, Sprout } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Support() {
  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <section className="px-6 max-w-screen-xl mx-auto mb-20 md:mb-32">
        <div className="relative rounded-xl overflow-hidden min-h-[500px] flex items-center group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPp_jj1_i9qsjWZKdX2q6StYKGVloJuQxWQasWWaSBgce4-yOCG4-sTWo6M5vZ7Gy4MEfdupJIx3FlEpWa8IXBTSRH7ZfHif45w59hkY_pZkOpIxqdgIzp4TWiNLPt3Sp62N_-l6H4FXkNgdR1H5RNNe4gZ6uxp_65xoPOxmCWUpEZltceX_gOSy4Rsx-VW3EsPfxMALgUzSY7z34UD4hi38cbqC0jhavtNzeh0t0a6q0Oznb_nVoyOg7hJZO1RoYOI4tsJjXu0_4k')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent"></div>
          <div className="relative z-10 p-8 md:p-20 max-w-2xl">
            <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-6 leading-tight tracking-tight italic">
              A space for <br/><span className="text-primary">quiet reflection</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed max-w-lg">
              We walk with you through every stage of remembrance. Find solace in our curated resources and artisan services designed to honor a life well-lived.
            </p>
            <NavLink to="/support" className="bg-primary hover:bg-primary-dim text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all scale-100 hover:scale-[1.02] shadow-sm inline-block text-center">
              Begin the Journey
            </NavLink>
          </div>
        </div>
      </section>

      {/* Resources Bento Grid */}
      <section className="px-6 max-w-screen-xl mx-auto mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline text-4xl text-on-surface mb-2 italic">Healing Resources</h2>
            <p className="font-body text-on-surface-variant">Compassionate guidance for your heart's journey.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-surface-container-low rounded-lg p-10 flex flex-col justify-between group hover:shadow-lg transition-shadow">
            <div>
              <Brain className="text-primary mb-6" size={48} />
              <h3 className="font-headline text-3xl mb-4 italic">The Language of Loss</h3>
              <p className="text-on-surface-variant max-w-md mb-8 leading-relaxed font-body">A digital library of essays, guided meditations, and expert advice on navigating the complex landscape of grief and healing.</p>
            </div>
            <NavLink className="text-primary font-semibold flex items-center gap-2 group-hover:gap-4 transition-all" to="/support">
              Learn More <ArrowRight size={20} />
            </NavLink>
          </div>

          <div className="md:col-span-4 bg-secondary-container/30 rounded-lg p-10 group hover:shadow-lg transition-shadow">
            <Users className="text-secondary mb-6" size={48} />
            <h3 className="font-headline text-2xl mb-4 italic">Circle of Care</h3>
            <p className="text-on-surface-variant mb-8 text-sm leading-relaxed font-body">Weekly virtual gathering spaces led by certified grief counselors for shared healing.</p>
            <NavLink className="text-secondary font-semibold text-sm uppercase tracking-widest font-label" to="/support">Join a session</NavLink>
          </div>

          <div className="md:col-span-4 bg-primary-container/20 rounded-lg p-10 group hover:shadow-lg transition-shadow">
            <Heart className="text-primary mb-6" size={48} />
            <h3 className="font-headline text-2xl mb-4 italic">Daily Rituals</h3>
            <p className="text-on-surface-variant mb-8 text-sm leading-relaxed font-body">Small, meaningful practices to incorporate into your morning for steadying the mind.</p>
            <NavLink className="text-primary font-semibold text-sm uppercase tracking-widest font-label" to="/support">Explore rituals</NavLink>
          </div>

          <div className="md:col-span-8 bg-surface-container-highest rounded-lg p-10 flex flex-col md:flex-row gap-8 items-center overflow-hidden">
            <div className="flex-1">
              <h3 className="font-headline text-2xl mb-4 italic">Healing Through Nature</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed font-body">Our podcast series exploring the profound connection between the natural world and the restoration of the human spirit.</p>
              <NavLink to="/support" className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-outline/10 font-label inline-block text-center">Listen Now</NavLink>
            </div>
            <div className="flex-1 w-full h-48 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_7IjeaYccKV9cMj-QCjes1-71gx5a2lNY0zlUh6Fa231p3BeX7jrubbtb4rKVDG8ZSqD5-UkaDxfp6lm3Rb8adWhJlqf8kr79K0GcKGhMMTuNhJkGC7dyrX4zKaBgjmKJk8CCBt9AciwdnNNiOEeoaEg5F1r8M-LK4-A1xilqqr9AnWSNw9gt9gb21uUt0Vloot1p5BaEv2pb7gOTGa6wwvC2eU4eTUWuUk3ZUc_4zqV2wXlUep06BYFWKiwrVuT8aHEvVXS6z4mg')" }}></div>
          </div>
        </div>
      </section>

      {/* Artisan Section */}
      <section className="px-6 max-w-screen-xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="font-headline text-4xl text-on-surface mb-6 italic leading-snug">Bespoke Memorials <br/>& Artisan Craft</h2>
            <p className="font-body text-on-surface-variant text-lg mb-8 leading-relaxed">
              Every life has a unique signature. Our master artisans work one-on-one with you to create custom commemorative pieces—from hand-thrown ceramic urns to botanical glass art—that perfectly encapsulate a spirit.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-on-surface font-body">
                <CheckCircle className="text-primary" size={18} />
                <span>Personalized Ceramic Design</span>
              </li>
              <li className="flex items-center gap-3 text-on-surface font-body">
                <CheckCircle className="text-primary" size={18} />
                <span>Heritage Textile Preservation</span>
              </li>
              <li className="flex items-center gap-3 text-on-surface font-body">
                <CheckCircle className="text-primary" size={18} />
                <span>Commissioned Botanical Illustrations</span>
              </li>
            </ul>
            <NavLink to="/support" className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all font-label inline-block text-center">
              Request a Consultation
            </NavLink>
          </div>
          <div className="flex-1 order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-lg bg-cover bg-center mt-12 shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDC9bf2PKroCR5dKPymApP0kjxEk9h1Nb8UCQV8KJK1r3LgquJs19BtQIJnmOZDX-Q5CW2mi0yVAc6b6xUGIBqqz-YCBUuMs543nxWCx84OrdkJ_qFHynYurWzK8mhP_QXp-rqfolUtDlVfqjkC8SdI6mVEo1OfFjtxoBy8fKp86SUhCdIyzZy2lOzjHg1t5vt0Y2QR5bANVUdxy0QuJghjAScb2-bJuxrZUG2gP4Ta0r3edAFwvYA5Mh5uIQSKyRylP3byFCVNLM49')" }}></div>
            <div className="aspect-[4/5] rounded-lg bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsr2hmenR7RJI7e8wgWNPs3SMtIheSGT7qrcdvbygzx3DcQg2O-BJ2K_l4aC22UAFU0T9MpOS15eJAGO1JrnhbAkA_UgPOm6u5puDWCsfe7GpwLhz1pap1IyRDYVqNpYDzBwmydR1tcwtDbTkLW27xdxCCU6f9mPAISQCYGQuleWa5NqfWdLq4Kk2POJqGws29HXSHPr4A5mCBd14oCS5RIqkXkURJIC49KdFB5ZaYQvrco4XrpE7oP2Xo3NnOv1_T4bjUhmFX2ODa')" }}></div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 max-w-screen-xl mx-auto">
        <div className="bg-primary/5 rounded-[3rem] p-12 md:p-24 text-center border border-primary/5 ambient-glow">
          <Mail className="text-primary mx-auto mb-6" size={48} />
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface mb-6 italic">Stay connected to the garden</h2>
          <p className="font-body text-on-surface-variant max-w-lg mx-auto mb-10 text-lg">
            Receive gentle thoughts on healing, new artisan features, and community updates once a month.
          </p>
          <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input 
              className="flex-1 bg-white border-0 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary shadow-sm outline-none font-body" 
              placeholder="Your email address" 
              type="email" 
            />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-dim transition-colors shadow-sm font-label">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
