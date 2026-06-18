import { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, BarChart3, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/analytics/overview');
        if (response && response.data) {
          setStats(response.data.data?.overview || null);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { 
      label: 'Total reviews', 
      value: stats?.totalReviews?.toLocaleString() || '10k+', 
      icon: <Users size={20} />,
      color: 'var(--fun-blue)',
      bg: 'color-mix(in srgb, var(--fun-blue) 12%, transparent)'
    },
    { 
      label: 'Average rating', 
      value: stats?.averageRating?.toFixed(1) || '4.2', 
      icon: <BarChart3 size={20} />,
      color: 'var(--primary)',
      bg: 'color-mix(in srgb, var(--primary) 12%, transparent)'
    },
    { 
      label: 'Positive vibes', 
      value: stats?.sentimentDistribution?.positive ? `${Math.round((stats.sentimentDistribution.positive / stats.totalReviews) * 100)}%` : '83%', 
      icon: <Heart size={20} fill="currentColor" />,
      color: 'var(--fun-pink)',
      bg: 'color-mix(in srgb, var(--fun-pink) 12%, transparent)'
    },
    { 
      label: 'Verified only', 
      value: '100%', 
      icon: <CheckCircle2 size={20} />,
      color: 'var(--fun-green)',
      bg: 'color-mix(in srgb, var(--fun-green) 12%, transparent)'
    },
  ];

  return (
    <div className="py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl" style={{ background: item.bg }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                  Live
                </div>
              </div>

              <p className="text-xs font-black uppercase mb-1 tracking-wider" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black tracking-tight">
                  {loading ? (
                    <span className="inline-block w-20 h-10 rounded-xl bg-[var(--border-color)] animate-pulse"></span>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
              
              <div className="mt-5 flex items-center gap-2">
                <div className="h-1.5 flex-grow rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.floor(Math.random() * 20 + 60)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full"
                    style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
