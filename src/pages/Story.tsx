import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Quote, Heart, BookOpen, Music, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Story() {
  return (
    <div className="pt-20">
      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Ethereal Forest" 
            className="w-full h-full object-cover scale-105 opacity-80" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzOD1GSZ8tM30rck0J8Q8gjf4G9JK4RurdVfXFeWMxYIFVevlFrF9iGJO60EEvn3qCyikfS8mcwRaXa4Yi7WCMqXORE5XpLASc-hhec67jljnYKsuN7lSDCMev--IlFgd-Os-lVEN9YKXic8m-JjfzaTywP-X7byRCgt6thdx7q5azDVQ01xP1zpSWQDmjsFaZ6aJQsg1fUPyel2Hg5MLDz51XQqN18ESNBP-dQST2M5236UfwcPJolmOo7G2zWPr50H_hsS2D18eb"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-headline text-on-surface mb-6 tracking-tight leading-tight">Stories of Love</h2>
          <p className="text-xl md:text-2xl font-body font-light text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            A curated collection of cherished memories, honoring the silent bonds that transcend time.
          </p>
        </div>
      </section>

      {/* Story List */}
      <section className="max-w-screen-2xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Story Card 1 */}
          <div className="md:col-span-8 group">
            <div className="bg-surface-container-low rounded-lg overflow-hidden ambient-glow transition-all duration-500 hover:scale-[1.01]">
              <div className="grid md:grid-cols-2">
                <div className="h-[400px] md:h-auto overflow-hidden">
                  <img 
                    alt="Golden Retriever" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6BmMJgK0Er7Jx7S8e0ilAaXus2LqqZtIsMsE0_OhV-m4Mv211GZu-ZHBUZ30A8JwLS5dkBwh1wWs44gqogNzozHn6u7Jl1rXUP6sKoKq-gNj1QtPeBtHNTS3KP2O_2TtnSUbyAfkQsQO1YAtOFEZ2_vMZl1i1zdi_YyO-nzWmSTQVZzHrhqeuZEsRxqtph4NCx4pIkPsXFnnWNAvBmgI9Sfrj0F-dGq57TY9igOGZoIpFR1kSGWdQX61MrDPnQXvbb56xWVdMGn8V"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center bg-white">
                  <span className="text-primary font-label text-xs tracking-[0.3em] uppercase mb-4">Featured Tribute</span>
                  <h3 className="text-4xl font-headline mb-2">Oliver</h3>
                  <p className="text-on-surface-variant/60 font-body text-sm mb-8">2010 — 2024</p>
                  <blockquote className="mb-10">
                    <p className="text-2xl font-headline italic text-on-surface leading-relaxed">
                      "He taught me that silence can be the most profound form of conversation we ever have."
                    </p>
                  </blockquote>
                  <NavLink to="/story" className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase group/btn">
                    Read Full Story 
                    <ArrowRight className="transition-transform group-hover/btn:translate-x-2" size={16} />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Story Card 2 */}
          <div className="md:col-span-4 group">
            <div className="bg-surface-container-high rounded-lg p-10 h-full flex flex-col ambient-glow transition-all duration-500 hover:scale-[1.02]">
              <div className="aspect-square rounded-lg overflow-hidden mb-8">
                <img 
                  alt="Calico Cat" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhKajUb4Y8deXjgWtp-plEyTTIuwcrHKKhfndcxId_M9dSdBD5pCPclYG1yeiianvmici4NelvNj4EYsdjMafRNDlGqrqswjRWsSX-ZsORvtUdh9nU51fkdnCdt5yfzSGZw_Fvr3DEMSM4gXRAar68tVAU4aQ1GMJ9tbYOqk_1N1zRmiMeP-2xS8eXZjhvc_sW2RcdBOmqK3n5pSB_BKrXX2Fm0i4-JlnE_B1HulDoWDCFc4yAYeIz5ng10Ppzrfu-zcgBVvgAFXAv"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-3xl font-headline mb-1">Luna</h3>
              <p className="text-on-surface-variant/60 font-body text-sm mb-6">2012 — 2023</p>
              <p className="text-on-surface-variant font-body leading-relaxed mb-8 italic">
                A spirit of gentle independence who found her home in the quiet corners of our hearts.
              </p>
              <NavLink to="/story" className="mt-auto py-4 px-8 bg-white text-primary rounded-full font-bold tracking-widest text-xs uppercase border border-outline-variant/10 hover:bg-primary hover:text-white transition-all text-center">
                View Tribute
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sprout className="text-primary mx-auto mb-8" size={48} />
          <h3 className="text-4xl md:text-5xl font-headline text-on-surface leading-tight italic mb-12">
            "What we have once enjoyed and deeply loved we can never lose, for all that we love deeply becomes a part of us."
          </h3>
          <p className="font-label text-on-surface-variant/70 uppercase tracking-[0.4em] text-xs">— Helen Keller</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-screen-xl mx-auto rounded-xl bg-secondary-container p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-headline text-on-secondary-container mb-6">Share Your Story</h2>
            <p className="text-lg md:text-xl font-body text-on-secondary-container/80 leading-relaxed mb-8">
              Every bond is unique, and every memory deserves a place in the Eternal Garden. We invite you to contribute your tribute to our sanctuary.
            </p>
            <NavLink to="/story" className="bg-primary text-white py-5 px-12 rounded-xl text-sm font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-primary/20 inline-block text-center">
              Begin the Journey
            </NavLink>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden -rotate-6 shadow-lg">
                <img 
                  alt="Dog" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUiww60Nfz4ufUXPGTCxy4u7F0c04bjS1O-Xg7-9PLvdgNxtZVkQqB8-vLDtXAjuoZbX2kwSabilOPjD9DwcU383e8ughjvbEOFUkvXx1hSQroIMtaH1DcScARWyw1fwB2TgLiooQqiLi5CgD6k1oQf7n9nLnFOkSS-_v6ohh0Tp_4qC71eCs3ur9nM4LJuohZ9qxLX-a4D3HJRTtsZKay4NO15byQKiAmy0AIqtGl4vmMto9iGeCAYzh1p2r7nUslcHrHdwsh7_jI"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden rotate-12 mt-8 shadow-lg">
                <img 
                  alt="Cat" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALIyXayK303K860jzO8HxtI4PIjNXQVkyaMD5L2Xl4YMYXuHAFssOOHEqSHLV1ll1ftaMyZteg3RbkodK50eNYNJCy8nV6U8Fmvt8eUfmFqqZoj-U4u5jVC0o_KblFfjBNWR1CkXpOdGsSyINacNl2M0yb0cg35CrMLT8Hq5tc2V8f8XlhEgmVruWhns4WB1BI2Kiby_FhSz4-RU_1pNkGoq8kwFnJCiYZsOAihDVrrlssTtB1Y8GlsTAuSaTl_bnq2izGRBds9SY7"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
