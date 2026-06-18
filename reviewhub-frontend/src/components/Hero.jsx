import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="relative pt-40 pb-16 lg:pt-52 lg:pb-28 overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 -left-20 w-[50%] h-[50%] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)' }}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.05, 1, 1.05],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-full"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%)' }}
        ></motion.div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Zap size={16} />
          <span className="text-sm font-bold">V2 is here & it's snappier!</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight"
        >
          See what people<br/>
          <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            *actually* think
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg md:text-xl mb-10 font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          A cozy little hub for all your Meta Ray-Ban review needs. Simple, powerful, and weirdly fun to use.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Link 
            to="/register" 
            className="btn-primary text-lg py-3.5 px-8"
          >
            Start exploring
            <ArrowRight size={20} />
          </Link>
          <a 
            href="#reviews" 
            className="btn-glass text-lg py-3.5 px-8"
          >
            Take a peek
          </a>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: <Star size={22} />, title: "10k+ reviews", desc: "All nicely organized" },
            { icon: <Shield size={22} />, title: "No nonsense", desc: "Just the good stuff" },
            { icon: <Zap size={22} />, title: "Lightning fast", desc: "Seriously speedy" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -6 }}
              className="glass-card p-6 text-left"
            >
              <div className="mb-4 inline-flex p-2.5 rounded-2xl" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
              </div>
              <h3 className="text-xl font-black mb-1">{item.title}</h3>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
