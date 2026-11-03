import { useAuth } from "../../context/AuthContext";
import Dashboard from "../user/Dashboard";
function AdminDashboard() {
  const {  loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Dashboard/>
  );
}

export default AdminDashboard;