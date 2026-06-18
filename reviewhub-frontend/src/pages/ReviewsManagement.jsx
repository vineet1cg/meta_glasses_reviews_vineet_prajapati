import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, createReview, updateReview, deleteReview } from '../store/slices/reviewSlice';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Star,
  ExternalLink,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const ReviewsManagement = () => {
  useSEO({
    title: 'Reviews Management',
    description: 'Manage, create, update, and search reviews for Meta smart glasses.',
  });

  const dispatch = useDispatch();
  const { items, pagination, loading } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [rating, setRating] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    review: '',
    rating: 5,
    verifiedPurchase: true,
    reviewID: '',
    reviewLink: ''
  });

  useEffect(() => {
    dispatch(fetchReviews({ page, limit: 10, search, rating }));
  }, [dispatch, page, search, rating]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setPage(1);
  };

  const handleOpenModal = (review = null) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        name: review.name,
        title: review.title,
        review: review.review,
        rating: review.rating,
        verifiedPurchase: review.verifiedPurchase,
        reviewID: review.reviewID,
        reviewLink: review.reviewLink
      });
    } else {
      setEditingReview(null);
      setFormData({
        name: '',
        title: '',
        review: '',
        rating: 5,
        verifiedPurchase: true,
        reviewID: `REV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        reviewLink: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await dispatch(updateReview({ id: editingReview._id, reviewData: formData })).unwrap();
        toast.success('Review updated');
      } else {
        await dispatch(createReview(formData)).unwrap();
        toast.success('Review created');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await dispatch(deleteReview(id)).unwrap();
      toast.success('Review deleted');
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Reviews Management</h1>
          <p className="text-[var(--text-muted)] font-medium">Manage and curate product reviews</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary py-4 px-8 self-start md:self-auto shine-effect"
        >
          <Plus size={20} />
          Add Review
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input 
            type="text"
            placeholder="Search reviews, authors, or IDs..."
            value={search}
            onChange={handleSearchChange}
            className="glass rounded-full py-3.5 pl-12 pr-6 font-semibold outline-none focus:border-[var(--primary)] transition-all w-full"
          />
        </div>
        <div className="relative w-full md:w-48">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <select 
            value={rating}
            onChange={handleRatingChange}
            className="glass rounded-full py-3.5 pl-12 pr-10 font-black uppercase text-xs tracking-widest outline-none focus:border-[var(--primary)] transition-all w-full appearance-none"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--border-color)]/20">
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Review ID</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">User</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Rating</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Title</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && items.length === 0 ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-[var(--border-color)]">
                    <td className="px-8 py-5"><div className="h-6 w-24 bg-[var(--border-color)] rounded-lg"></div></td>
                    <td className="px-8 py-5"><div className="h-10 w-32 bg-[var(--border-color)] rounded-lg"></div></td>
                    <td className="px-8 py-5"><div className="h-6 w-16 bg-[var(--border-color)] rounded-full"></div></td>
                    <td className="px-8 py-5"><div className="h-6 w-48 bg-[var(--border-color)] rounded-lg"></div></td>
                    <td className="px-8 py-5"><div className="h-8 w-8 bg-[var(--border-color)] rounded-full ml-auto"></div></td>
                  </tr>
                ))
              ) : items.length > 0 ? (
                items.map((review) => (
                  <motion.tr 
                    key={review._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-[var(--border-color)] hover:bg-[var(--border-color)]/10 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <p className="text-xs font-black font-mono text-[var(--primary)]">{review.reviewID}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--border-color)] flex items-center justify-center text-[10px] font-black">
                          {review.name.charAt(0)}
                        </div>
                        <p className="font-bold text-sm">{review.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1 text-[var(--primary)]">
                        <Star size={14} fill="currentColor" />
                        <span className="font-black">{review.rating}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-sm truncate max-w-xs">{review.title}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={review.reviewLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2.5 rounded-xl hover:bg-blue-500/10 text-blue-500 transition-all"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <button 
                          onClick={() => handleOpenModal(review)}
                          className="p-2.5 rounded-xl hover:bg-[var(--primary)]/10 text-[var(--primary)] transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(review._id)}
                          className="p-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <AlertCircle size={48} className="mb-4" />
                      <p className="text-xl font-black uppercase tracking-tighter">No reviews found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 border-t border-[var(--border-color)] bg-[var(--border-color)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-[var(--text-muted)]">
            Showing <span className="text-[var(--text-main)]">{items.length}</span> of <span className="text-[var(--text-main)]">{pagination.total}</span> reviews
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-xl glass disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-black transition-all ${
                      page === pageNum 
                        ? 'bg-[var(--primary)] text-white' 
                        : 'glass hover:border-[var(--primary)]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button 
              disabled={page === pagination.pages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-xl glass disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-2xl p-8 my-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black tracking-tight">
                  {editingReview ? 'Edit Review' : 'New Review'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Author Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full glass rounded-2xl py-3 px-5 font-semibold outline-none focus:border-[var(--primary)] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Review ID</label>
                  <input 
                    type="text"
                    required
                    readOnly
                    value={formData.reviewID}
                    className="w-full glass rounded-2xl py-3 px-5 font-bold font-mono text-[var(--primary)] outline-none opacity-60"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Review Title</label>
                  <input 
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full glass rounded-2xl py-3 px-5 font-semibold outline-none focus:border-[var(--primary)] transition-all"
                    placeholder="Great product experience"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Review Content</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.review}
                    onChange={(e) => setFormData({...formData, review: e.target.value})}
                    className="w-full glass rounded-3xl py-4 px-5 font-semibold outline-none focus:border-[var(--primary)] transition-all resize-none"
                    placeholder="Tell us what you think..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Rating</label>
                  <select 
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                    className="w-full glass rounded-2xl py-3 px-5 font-black outline-none focus:border-[var(--primary)] transition-all"
                  >
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Verified Purchase</label>
                  <div className="flex items-center gap-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={formData.verifiedPurchase}
                        onChange={(e) => setFormData({...formData, verifiedPurchase: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary)]"></div>
                    </label>
                    <span className="font-bold text-sm">Status: {formData.verifiedPurchase ? 'Verified' : 'Unverified'}</span>
                  </div>
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">External Link</label>
                  <input 
                    type="url"
                    value={formData.reviewLink}
                    onChange={(e) => setFormData({...formData, reviewLink: e.target.value})}
                    className="w-full glass rounded-2xl py-3 px-5 font-semibold outline-none focus:border-[var(--primary)] transition-all"
                    placeholder="https://example.com/review/123"
                  />
                </div>
                <div className="col-span-full pt-4 flex gap-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary flex-grow py-4 font-black"
                  >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : (editingReview ? 'Update Review' : 'Create Review')}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-glass px-8 py-4 font-black"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsManagement;
