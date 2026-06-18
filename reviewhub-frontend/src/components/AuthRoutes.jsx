import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { user, loading, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading, token } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
      </div>
    );
  }

  if (!token || user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
