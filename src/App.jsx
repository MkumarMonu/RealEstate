import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Services from './pages/Services';

import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ManageProperties from './pages/admin/ManageProperties';
import PropertyForm from './pages/admin/PropertyForm';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageBlogs from './pages/admin/ManageBlogs';
import BlogForm from './pages/admin/BlogForm';



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        {/* <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} /> */}
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/properties" element={<MainLayout><Properties /></MainLayout>} />
        <Route path="/properties/:id" element={<MainLayout><PropertyDetails /></MainLayout>} />
        <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
        <Route path="/blogs/:id" element={<MainLayout><BlogDetails /></MainLayout>} />
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/properties" element={<AdminLayout><ManageProperties /></AdminLayout>} />
        <Route path="/admin/properties/add" element={<AdminLayout><PropertyForm /></AdminLayout>} />
        <Route path="/admin/properties/edit/:id" element={<AdminLayout><PropertyForm /></AdminLayout>} />
        <Route path="/admin/enquiries" element={<AdminLayout><ManageEnquiries /></AdminLayout>} />
        <Route path="/admin/blogs" element={<AdminLayout><ManageBlogs /></AdminLayout>} />
        <Route path="/admin/blogs/add" element={<AdminLayout><BlogForm /></AdminLayout>} />
        <Route path="/admin/blogs/edit/:id" element={<AdminLayout><BlogForm /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
