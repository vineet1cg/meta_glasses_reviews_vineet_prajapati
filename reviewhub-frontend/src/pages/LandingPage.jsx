import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ReviewList from '../components/ReviewList';
import { Layout, Search, Users, Database, ShieldCheck, Zap, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

const LandingPage = () => {
  useSEO({
    title: 'Meta Ray-Ban Smart Glasses Reviews Platform',
    description: 'Explore real reviews, average ratings, sentiment analysis, and user feedback for Meta Ray-Ban Smart Glasses on ReviewHub.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'ReviewHub',
      'url': window.location.origin,
      'description': 'Reviews analysis hub for Meta Ray-Ban smart glasses.',
    },
  });

  return (
    <div className="min-h-screen selection:bg-[var(--primary)] selection:text-white transition-colors duration-300" style={{ background: 'var(--bg-base)', color: 'var(--text-main)' }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--primary)' }}>
                  <Activity size={16} />
                  Built for you
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  No fluff, just&nbsp;
                  <span style={{ color: 'var(--primary)' }}>good stuff</span>
                </h2>
                <p className="text-lg font-medium mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  ReviewHub is designed to feel like a friend who's really good at organizing reviews. Simple, intuitive, and a little bit silly.
                </p>
                
                <div className="space-y-7">
                  {[
                    { icon: <Search size={24} />, title: "Find anything instantly", desc: "Full-text search across every single review." },
                    { icon: <Database size={24} />, title: "Up to the minute", desc: "Direct sync with our database. Always fresh." },
                    { icon: <ShieldCheck size={24} />, title: "Safe and sound", desc: "Your data stays yours. Role-based access for teams." },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex gap-5"
                    >
                      <div className="p-3 rounded-2xl shrink-0" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
                        <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black mb-1">{item.title}</h4>
                        <p className="text-base font-medium" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 relative">
                 <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
                 <motion.div 
                    whileHover={{ y: -8, rotate: -1 }}
                    className="glass-card p-8 mt-10"
                 >
                    <Zap className="mb-4" size={32} style={{ color: 'var(--primary)' }} />
                    <h3 className="text-2xl font-black mb-2">Snappy</h3>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>Under a second to load.</p>
                 </motion.div>
                 <motion.div 
                    whileHover={{ y: -8, rotate: 1 }}
                    className="glass-card p-8"
                 >
                    <Users className="mb-4" size={32} style={{ color: 'var(--accent)' }} />
                    <h3 className="text-2xl font-black mb-2">Social</h3>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>See who's saying what.</p>
                 </motion.div>
                 <motion.div 
                    whileHover={{ y: -8, rotate: 1 }}
                    className="glass-card p-8 mt-4"
                 >
                    <Layout className="mb-4" size={32} style={{ color: 'var(--fun-blue)' }} />
                    <h3 className="text-2xl font-black mb-2">Clean</h3>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>No confusing clutter.</p>
                 </motion.div>
                 <motion.div 
                    whileHover={{ y: -8, rotate: -1 }}
                    className="glass-card p-8 mt-14"
                 >
                    <Search className="mb-4" size={32} style={{ color: 'var(--fun-green)' }} />
                    <h3 className="text-2xl font-black mb-2">Smart</h3>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>Filters that just work.</p>
                 </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <ReviewList />
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="glass-card p-10 lg:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute -top-1/2 -left-1/2 w-full h-full" style={{ background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 60%)' }}></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Ready to give it a go?
                </h2>
                <p className="text-xl font-medium mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                  Dive in and see for yourself. No credit card, no weird commitments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary text-lg py-4 px-10 group">
                    Create an account
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button className="btn-glass text-lg py-4 px-10">
                    Browse as guest
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="py-16 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-black mb-6">
                Review<span style={{ color: 'var(--primary)' }}>Hub</span>
              </div>
              <p className="text-lg font-medium max-w-md mb-8" style={{ color: 'var(--text-muted)' }}>
                A friendly little corner of the internet for Meta Ray-Ban reviews.
              </p>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-11 h-11 rounded-2xl glass flex items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-all"
                  ></motion.div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-6">Product</h4>
              <ul className="space-y-3 text-base font-semibold" style={{ color: 'var(--text-muted)' }}>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-[var(--primary)] transition-colors">Features</a></li>
                <li><a href="#reviews" className="hover:text-[var(--primary)] transition-colors">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-6">More</h4>
              <ul className="space-y-3 text-base font-semibold" style={{ color: 'var(--text-muted)' }}>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
              © 2026 ReviewHub. Made with care.
            </p>
            <div className="flex gap-10 text-xs font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                All systems go
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
