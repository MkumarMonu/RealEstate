import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiFileText, FiLogOut, FiSettings, FiGrid } from 'react-icons/fi';
import { useEffect } from 'react';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Basic auth check
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <FiGrid size={20} /> },
    { label: 'Properties', path: '/admin/properties', icon: <FiHome size={20} /> },
    { label: 'Enquiries', path: '/admin/enquiries', icon: <FiMessageSquare size={20} /> },
    { label: 'Blogs', path: '/admin/blogs', icon: <FiFileText size={20} /> },
    { label: 'Settings', path: '/admin/settings', icon: <FiSettings size={20} /> },
  ];

  return (
    <div className="flex bg-slate-100 min-h-screen">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-dark text-white hidden md:flex flex-col flex-shrink-0 min-h-screen sticky top-0">
        <div className="p-6">
          <Link to="/admin" className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">R</span>
            </div>
            AdminPanel
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${location.pathname === item.path ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl transition mx-auto"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-10">
          <h2 className="font-bold text-lg text-dark">Admin Panel</h2>
          <button onClick={handleLogout} className="text-red-500 font-medium">Logout</button>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
