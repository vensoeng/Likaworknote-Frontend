import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WebLoader from "../components/WebLoader";
function GuestRoute() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <WebLoader>កំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ</WebLoader>;
  }

  if (isAuthenticated && user) {
    if (user.role === 1) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === 2) {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  return <Outlet />;
}

export default GuestRoute;