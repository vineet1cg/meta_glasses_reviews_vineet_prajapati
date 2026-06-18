import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchOverview, 
  fetchRatingDistribution, 
  fetchSentimentTrend, 
  fetchTopReviewers, 
  fetchHelpfulnessDistribution,
  fetchMonthlyVolume,
  fetchImageVsNoImage
} from '../store/slices/analyticsSlice';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  MessageSquare, 
  Star, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

const AnalyticsDashboard = () => {
  useSEO({
    title: 'Analytics & Insights',
    description: 'Detailed analytics of ratings, sentiment trend, top reviewers, monthly volume, and image presence.',
  });

  const dispatch = useDispatch();
  const { 
    overview, 
    ratingDist, 
    sentimentTrend, 
    topReviewers, 
    helpfulnessDist, 
    monthlyVolume, 
    imageComparison, 
    loading 
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchOverview());
    dispatch(fetchRatingDistribution());
    dispatch(fetchSentimentTrend());
    dispatch(fetchTopReviewers());
    dispatch(fetchHelpfulnessDistribution());
    dispatch(fetchMonthlyVolume());
    dispatch(fetchImageVsNoImage());
  }, [dispatch]);

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Intelligence Dashboard</h1>
        <p className="text-[var(--text-muted)] font-medium text-lg">Real-time market signals and sentiment analysis</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Reviews', value: overview?.totalReviews?.toLocaleString(), icon: MessageSquare, trend: '+12%', isUp: true, color: 'var(--fun-blue)' },
          { label: 'Average Rating', value: overview?.avgRating?.toFixed(1), icon: Star, trend: '+0.2', isUp: true, color: 'var(--primary)' },
          { label: 'Avg Helpfulness', value: overview?.avgHelpfulness?.toFixed(1), icon: TrendingUp, trend: '+5%', isUp: true, color: 'var(--fun-pink)' },
          { label: 'Positive Sentiment', value: overview?.totalReviews ? `${Math.round((overview.positiveCount / overview.totalReviews) * 100)}%` : '0%', icon: Activity, trend: '-2%', isUp: false, color: 'var(--fun-green)' }
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-[var(--primary)]/5 blur-2xl rounded-full group-hover:bg-[var(--primary)]/10 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl" style={{ background: `${card.color}15`, color: card.color }}>
                <card.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${card.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {card.trend}
                {card.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">{card.label}</p>
            <p className="text-4xl font-black tracking-tight">{loading ? <Loader2 className="animate-spin" /> : card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">Rating Distribution</h3>
            <div className="px-4 py-1.5 rounded-full glass text-[10px] font-black uppercase tracking-widest opacity-60">Cluster-A1</div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDist}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis 
                  dataKey="rating" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'var(--border-color)', opacity: 0.1 }}
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '1rem',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sentiment Mix */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">Sentiment Mix</h3>
            <div className="px-4 py-1.5 rounded-full glass text-[10px] font-black uppercase tracking-widest opacity-60">Live feed</div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Positive', value: overview?.positiveCount },
                    { name: 'Negative', value: overview?.negativeCount }
                  ]}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '1rem',
                    fontWeight: 'bold'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-black uppercase tracking-widest opacity-60">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs font-black uppercase tracking-widest opacity-60">Negative</span>
            </div>
          </div>
        </motion.div>

        {/* Sentiment Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">Monthly Volume</h3>
            <div className="px-4 py-1.5 rounded-full glass text-[10px] font-black uppercase tracking-widest opacity-60">Last year</div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVolume.map(m => ({ month: `${m.year}-${String(m.month).padStart(2, '0')}`, count: m.count }))}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '1rem',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="var(--primary)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorTrend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Reviewers & Image Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Reviewers */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-black tracking-tight mb-8">Top Reviewers</h3>
          <div className="space-y-4">
            {topReviewers.slice(0, 5).map((reviewer, i) => (
              <div key={reviewer.name} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--border-color)]/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{reviewer.name}</p>
                  <p className="text-sm text-[var(--text-muted)] font-medium">{reviewer.totalReviews} reviews</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-[var(--primary)]">{reviewer.totalHelpfulAug}</p>
                  <p className="text-xs text-[var(--text-muted)] font-medium">Helpful Votes</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image vs No Image */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-black tracking-tight mb-8">Image Coverage</h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">With Image</span>
                <span className="font-black">{imageComparison?.withImage}</span>
              </div>
              <div className="h-4 w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--primary)] rounded-full"
                  style={{ width: `${imageComparison?.total ? (imageComparison.withImage / imageComparison.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Without Image</span>
                <span className="font-black">{imageComparison?.withoutImage}</span>
              </div>
              <div className="h-4 w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--text-muted)] rounded-full"
                  style={{ width: `${imageComparison?.total ? (imageComparison.withoutImage / imageComparison.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
