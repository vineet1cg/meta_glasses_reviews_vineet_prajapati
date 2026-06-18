import { useState, useEffect } from 'react';
import api from '../services/api';
import { Star, ExternalLink, Calendar, BadgeCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/reviews?page=1&limit=9');
        if (response && response.data) {
          setReviews(response.data.data || []);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Assign a random color to each card for personality
  const cardColors = [
    'var(--fun-pink)',
    'var(--fun-blue)',
    'var(--fun-green)',
    'var(--primary)',
    'var(--accent)',
  ];

  return (
    <section id="reviews" className="py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--primary)' }}>
              <MessageSquare size={16} />
              What's new?
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              Live review feed
            </h2>
            <p className="text-lg font-medium max-w-md" style={{ color: 'var(--text-muted)' }}>
              Real reviews from real people, all in one cozy corner.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-2 rounded-full glass text-sm font-bold flex items-center gap-2">
                <BadgeCheck size={18} style={{ color: 'var(--primary)' }} />
                Verified
             </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 rounded-[1.75rem] bg-[var(--bg-surface)] border border-[var(--border-color)] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => {
                  const color = cardColors[index % cardColors.length];
                  const rotation = (index % 2 === 0) ? -0.5 : 0.5;

                  return (
                    <motion.div 
                      key={review._id} 
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 250, damping: 20 }}
                      className="break-inside-avoid glass-card p-7"
                      style={{ borderColor: 'transparent' }}
                    >
                      {/* Color pop */}
                      <div 
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                        style={{ background: color, opacity: 0.8 }}
                      ></div>

                      <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-lg"
                            style={{ background: `linear-gradient(135deg, ${color}, var(--accent))` }}
                          >
                            {review.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-[var(--text-main)] font-black leading-tight">{review.name}</h3>
                            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                              <Calendar size={12} />
                              {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
                          <Star size={12} fill="currentColor" />
                          {review.rating.toFixed(1)}
                        </div>
                      </div>

                      <h4 className="text-[var(--text-main)] font-black text-lg mb-3 leading-snug">
                        &ldquo;{review.title || 'Great glasses!'}&rdquo;
                      </h4>
                      
                      <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6 line-clamp-4">
                        {review.review}
                      </p>

                      <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
                            Verified
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        <motion.a 
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          href={review.reviewLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full glass hover:border-[var(--primary)] transition-colors"
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-24 text-[var(--text-muted)] font-black text-xl uppercase tracking-widest opacity-30">
                  No reviews right now.
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="btn-glass text-base py-3.5 px-7 group">
            View all reviews
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewList;
