import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BarChart3, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 group ${
      active 
        ? 'bg-[var(--primary)] text-white' 
        : 'text-[var(--text-muted)] hover:bg-[var(--border-color)] hover:text-[var(--text-main)]'
    }`}
  >
    <Icon size={22} className={active ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
    <span className="font-bold tracking-tight">{label}</span>
    {active && <ChevronRight className="ml-auto" size={18} />}
  </Link>
);

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: MessageSquare, label: 'Reviews', path: '/dashboard/reviews' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: UserIcon, label: 'Profile', path: '/dashboard/profile' },
  ];

  if (user?.role === 'admin') {
    navItems.splice(1, 0, { icon: Users, label: 'Users', path: '/dashboard/users' });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-[var(--border-color)] glass">
        <div className="p-8 border-b border-[var(--border-color)]">
          <Link to="/" className="text-2xl font-black tracking-tighter">
            Review<span style={{ color: 'var(--primary)' }}>Hub</span>
          </Link>
        </div>
        
        <nav className="flex-grow py-6">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.path}
              {...item}
              active={location.pathname === item.path}
            />
          ))}
        </nav>

        <div className="p-6 border-t border-[var(--border-color)]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 w-full text-red-500 font-bold hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-[var(--bg-base)] z-50 lg:hidden flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-[var(--border-color)] flex justify-between items-center">
              <span className="text-2xl font-black tracking-tighter">ReviewHub</span>
              <button onClick={() => setIsSidebarOpen(false)}><X /></button>
            </div>
            <nav className="flex-grow py-6">
              {navItems.map((item) => (
                <SidebarItem 
                  key={item.path}
                  {...item}
                  active={location.pathname === item.path}
                  onClick={() => setIsSidebarOpen(false)}
                />
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 glass border-b border-[var(--border-color)] flex items-center justify-between px-6 lg:px-12 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 glass rounded-full"
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-xl font-black">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={toggleTheme}
              className="p-3 glass rounded-full hover:border-[var(--primary)] transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-[var(--border-color)]">
              <div className="hidden md:block text-right">
                <p className="text-sm font-black leading-tight">{user?.name}</p>
                <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-widest">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-6 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
