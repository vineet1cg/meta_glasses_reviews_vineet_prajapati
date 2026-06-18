import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverview, fetchTopReviewers } from '../store/slices/analyticsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Star, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import useSEO from '../hooks/useSEO';

const DashboardHome = () => {
  useSEO({
    title: 'Dashboard Overview',
    description: 'Analyst dashboard overview showing total reviews count, average rating, positive sentiment ratio, and quick actions.',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { overview, topReviewers, loading, error } = useSelector((state) => state.analytics);
  const { user } = useSelector((state) => state.auth);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const loadData = async () => {
    try {
      await Promise.all([
        dispatch(fetchOverview()).unwrap(),
        dispatch(fetchTopReviewers()).unwrap()
      ]);
      if (isFirstLoad) {
        toast.success(`Welcome back, ${user?.name?.split(' ')[0] || 'User'}!`);
        setIsFirstLoad(false);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  if (loading && !overview) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
        <p className="text-lg font-bold animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  if (error && !overview) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
        <div className="p-4 rounded-full bg-red-500/10 text-red-500">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black">Data Retrieval Failed</h2>
          <p className="text-[var(--text-muted)] font-medium max-w-md">
            We couldn't load your dashboard data. This might be due to a network issue or an expired session.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={loadData}
            className="btn-primary py-3 px-8 flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="btn-glass py-3 px-8"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const overviewStats = [
    { label: 'Total Reviews', value: overview?.totalReviews?.toLocaleString(), icon: MessageSquare, color: 'var(--fun-blue)' },
    { label: 'Average Rating', value: overview?.avgRating?.toFixed(1), icon: Star, color: 'var(--primary)' },
    { label: 'Sentiment', value: overview?.totalReviews ? `${Math.round((overview.positiveCount / overview.totalReviews) * 100)}% Positive` : 'N/A', icon: Activity, color: 'var(--fun-pink)' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Welcome back!
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-lg mt-2">
            Here's what's happening in your intelligence hub today.
          </p>
        </div>
        <div className="flex gap-3">
           <div className="px-6 py-3 rounded-2xl glass border-[var(--primary)]/20 text-sm font-black flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Active
           </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-[var(--primary)]/5 blur-2xl rounded-full group-hover:bg-[var(--primary)]/10 transition-colors" />
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{stat.label}</span>
            </div>
            <p className="text-4xl font-black tracking-tight">{loading ? '...' : stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/dashboard/reviews" className="block p-6 glass-card group hover:border-[var(--primary)] transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg">Manage Reviews</h4>
                  <p className="text-sm font-medium text-[var(--text-muted)]">View, edit, or delete reviews</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/analytics" className="block p-6 glass-card group hover:border-[var(--primary)] transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg">View Analytics</h4>
                  <p className="text-sm font-medium text-[var(--text-muted)]">Check trends and insights</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black tracking-tight">Top Reviewers</h3>
              <Link to="/dashboard/analytics" className="text-sm font-black text-[var(--primary)] hover:underline flex items-center gap-1 group">
                View all
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-4">
              {topReviewers.slice(0, 3).map((reviewer, i) => (
                <div key={reviewer.name} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--border-color)]/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{reviewer.name}</p>
                    <p className="text-sm text-[var(--text-muted)] font-medium">{reviewer.totalReviews} reviews • {reviewer.totalHelpfulAug} helpful votes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tip */}
        <div className="space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-[var(--primary)] text-white relative overflow-hidden shadow-2xl">
            <ShieldCheck size={48} className="mb-6 opacity-80" />
            <h3 className="text-2xl font-black mb-3 leading-tight">Pro Tip</h3>
            <p className="text-sm font-bold opacity-80 leading-relaxed">
              Use the rating filter to quickly identify negative sentiment and address product concerns before they grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
