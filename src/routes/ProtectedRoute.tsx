import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WebLoader from "../components/WebLoader";

interface ProtectedRouteProps {
  allowedRoles: number[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <WebLoader>យើងកំពុងព្យាយាមផ្ទុកដើម្បីដំណើរការ!</WebLoader>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === 1) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === 2) {
      return <Navigate to="/user/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
}

export default ProtectedRoute;