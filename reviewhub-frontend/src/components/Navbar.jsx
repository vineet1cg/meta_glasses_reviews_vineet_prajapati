import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl glass rounded-full px-6 py-3 flex items-center justify-between"
    >
      <Link to="/" className="group flex items-center gap-3">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xl shadow-sm"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
        >
          Rh
        </motion.div>
        <span className="text-xl font-black tracking-tight">
          Review<span style={{ color: 'var(--primary)' }}>Hub</span>
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-sm font-semibold hover:text-[var(--primary)] transition-colors">Home</Link>
        <a href="#features" className="text-sm font-semibold hover:text-[var(--primary)] transition-colors">Features</a>
        <a href="#reviews" className="text-sm font-semibold hover:text-[var(--primary)] transition-colors">Live Feed</a>
        
        <div className="h-6 w-px bg-[var(--border-color)] mx-2"></div>
        
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2.5 rounded-full glass hover:border-[var(--primary)] transition-colors"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>

        {user ? (
          <div className="flex items-center gap-3">
            <Link 
              to="/dashboard" 
              className="btn-primary text-sm py-2 px-5"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout} 
                className="p-2.5 rounded-full glass text-[var(--text-muted)] hover:text-red-500 hover:border-red-500/30 transition-colors"
              >
                <LogOut size={18} />
              </motion.button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-bold hover:text-[var(--primary)] transition-colors px-3">Login</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-5">Get Started</Link>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center gap-3">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme} 
          className="p-2 rounded-full glass"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 rounded-full glass"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="md:hidden w-full glass rounded-3xl overflow-hidden absolute top-full left-0 shadow-lg"
          >
            <div className="p-6 flex flex-col gap-4">
              <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-base font-bold">Home</Link>
              <a onClick={() => setIsMenuOpen(false)} href="#features" className="text-base font-bold">Features</a>
              <a onClick={() => setIsMenuOpen(false)} href="#reviews" className="text-base font-bold">Live Feed</a>
              <hr className="border-[var(--border-color)] my-2" />
              {user ? (
                <Link onClick={() => setIsMenuOpen(false)} to="/dashboard" className="btn-primary text-center">Dashboard</Link>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link onClick={() => setIsMenuOpen(false)} to="/login" className="text-center font-bold">Login</Link>
                  <Link onClick={() => setIsMenuOpen(false)} to="/register" className="btn-primary text-center">Get Started</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
