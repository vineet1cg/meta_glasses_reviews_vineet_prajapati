import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../store/slices/authSlice';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Camera,
  Save,
  Lock,
  Loader2
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const ProfilePage = () => {
  useSEO({
    title: 'My Profile',
    description: 'View and update your ReviewHub user profile details.',
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/auth/profile', formData);
      await dispatch(getMe());
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Account Settings</h1>
        <p className="text-[var(--text-muted)] font-medium text-lg">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="glass-card p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-20"></div>
            <div className="relative pt-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-[var(--bg-base)] border-4 border-[var(--bg-surface)] flex items-center justify-center text-4xl font-black text-[var(--primary)] shadow-xl mx-auto overflow-hidden">
                  {user?.name?.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2.5 bg-[var(--primary)] text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="mt-6 text-2xl font-black">{user?.name}</h3>
              <p className="text-sm font-black uppercase tracking-widest text-[var(--primary)] mt-1">{user?.role}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--border-color)] space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-muted)]">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-muted)]">
                <Calendar size={16} />
                <span>Joined {new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-muted)]">
                <Shield size={16} />
                <span className="capitalize">{user?.role} Permissions</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-amber-500">
            <div className="flex gap-4">
              <Lock className="text-amber-500 shrink-0" size={24} />
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest">Security Tip</h4>
                <p className="text-xs font-semibold text-[var(--text-muted)] mt-1 leading-relaxed">
                  Regularly update your password to keep your account secure.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-10">
            <h3 className="text-2xl font-black mb-8">Personal Information</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full glass rounded-2xl py-3.5 pl-12 pr-6 font-bold outline-none focus:border-[var(--primary)] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input 
                      type="email"
                      value={formData.email}
                      readOnly
                      className="w-full glass rounded-2xl py-3.5 pl-12 pr-6 font-bold outline-none opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-color)]">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary py-4 px-10 font-black group shine-effect"
                >
                  {loading ? <Loader2 className="animate-spin" /> : (
                    <>
                      <Save size={20} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
