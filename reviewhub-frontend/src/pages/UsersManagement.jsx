import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Trash2, 
  Shield, 
  User as UserIcon, 
  Search,
  MoreVertical,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const UsersManagement = () => {
  useSEO({
    title: 'User Accounts Management',
    description: 'Admin only users management view to assign analyst or admin roles.',
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
      setEditingUser(null);
      toast.success('User role updated');
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Users Management</h1>
          <p className="text-[var(--text-muted)] font-medium">Manage user accounts and roles</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input 
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass rounded-full py-3 pl-12 pr-6 font-semibold outline-none focus:border-[var(--primary)] transition-all w-full md:w-80"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--border-color)]/20">
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">User</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Joined</th>
                <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-[var(--border-color)]">
                    <td className="px-8 py-5"><div className="h-10 w-48 bg-[var(--border-color)] rounded-lg"></div></td>
                    <td className="px-8 py-5"><div className="h-6 w-20 bg-[var(--border-color)] rounded-full"></div></td>
                    <td className="px-8 py-5"><div className="h-6 w-32 bg-[var(--border-color)] rounded-lg"></div></td>
                    <td className="px-8 py-5"><div className="h-8 w-8 bg-[var(--border-color)] rounded-full ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.tr 
                    key={user._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-[var(--border-color)] hover:bg-[var(--border-color)]/10 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-xs font-semibold text-[var(--text-muted)]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                        user.role === 'admin' 
                          ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' 
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-semibold text-[var(--text-muted)]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingUser(user)}
                          className="p-2.5 rounded-xl hover:bg-[var(--primary)]/10 text-[var(--primary)] transition-all"
                          title="Change Role"
                        >
                          <Shield size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="p-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-all"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <AlertCircle size={48} className="mb-4" />
                      <p className="text-xl font-black uppercase tracking-tighter">No users found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Edit Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-sm p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black tracking-tight">Change Role</h3>
                <button onClick={() => setEditingUser(null)}><X /></button>
              </div>
              <p className="text-sm font-semibold text-[var(--text-muted)] mb-8">
                Updating role for <span className="text-[var(--text-main)] font-black">{editingUser.name}</span>
              </p>
              
              <div className="space-y-4">
                {['analyst', 'admin'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleUpdateRole(editingUser._id, role)}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      editingUser.role === role 
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' 
                        : 'border-[var(--border-color)] hover:border-[var(--primary)]'
                    }`}
                  >
                    <span className="font-black uppercase tracking-widest">{role}</span>
                    {editingUser.role === role && <Check size={20} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersManagement;
