import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// this is home page 
import HomePage from "./pages/home";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";
import AdminLayout from './pages/layout/header';
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
//user dashboard
import Category from "./pages/user/Category";
import TypeTask from "./pages/user/typeTask";
import Setting from "./pages/user/Setting";
import Task from "./pages/user/task";
import TaskTodayPage from "./pages/taskToday";

function AdminLayoutFn() {
  return (
    <div className="admin-shell">
      <AdminLayout />
      <main className="admin-page">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest */}
        <Route element={<GuestRoute />}>
          {/* Home webpage */}
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* This is task today */}
        <Route path="/task/:type/:id" element={<TaskTodayPage />} />
        <Route path="/task/user/:userId/:type/:id" element={<TaskTodayPage />} />
        {/* Add layout  */}
        <Route element={<AdminLayoutFn/>}>
          {/* User */}
          <Route element={<ProtectedRoute allowedRoles={[1,2]} />}>
            {/* route dashboard  */}
            <Route
              path="/user/dashboard"
              element={<UserDashboard />}
            />
            {/* route category */}
            <Route
              path="/category/tasks"
              element={<Category />}
            />
            {/* route type task  */}
            <Route
              path="/type/tasks"
              element={<TypeTask />}
            />
            {/* route setting  */}
            <Route
              path="/user/setting"
              element={<Setting />}
            />
            {/* route for task */}
            <Route
              path="/tasks"
              element={<Task />}
            />
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={[1]} />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />
          </Route>

        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;