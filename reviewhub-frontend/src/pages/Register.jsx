import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { register, clearError } from '../store/slices/authSlice';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Register = () => {
  useSEO({
    title: 'Register',
    description: 'Create a ReviewHub account to explore reviews, rating distribution, and analytics.',
  });

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (!register.fulfilled.match(resultAction)) {
      toast.error(resultAction.payload?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-base)]">
      <Toaster position="top-right" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black mb-4 inline-block tracking-tighter">
            Review<span style={{ color: 'var(--primary)' }}>Hub</span>
          </Link>
          <h2 className="text-2xl font-black">Create Account</h2>
          <p className="text-[var(--text-muted)] font-medium">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full glass rounded-2xl py-3 pl-12 pr-4 font-semibold focus:border-[var(--primary)] transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full glass rounded-2xl py-3 pl-12 pr-4 font-semibold focus:border-[var(--primary)] transition-all outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full glass rounded-2xl py-3 pl-12 pr-4 font-semibold focus:border-[var(--primary)] transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg font-black group shine-effect"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : (
              <>
                Register
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center font-bold text-sm" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--primary)] hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
