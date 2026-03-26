import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiHome, FiMessageSquare, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ properties: 0, enquiries: 0, blogs: 0 });
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                
                // Fetch basic metrics in parallel
                const [propsRes, enqRes, blogsRes] = await Promise.all([
                    axios.get('/api/properties?limit=1', config), // We just need total count
                    axios.get('/api/enquiries', config), // Get all to count and show recent
                    axios.get('/api/blogs', config)
                ]);

                setStats({
                    properties: propsRes.data.total || 0,
                    enquiries: enqRes.data.length || 0,
                    blogs: blogsRes.data.length || 0
                });

                // Top 5 recent enquiries
                setRecentEnquiries(enqRes.data.slice(0, 5));
                setLoading(false);

            } catch (error) {
                console.error("Error fetching dashboard stats", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div className="animate-pulse space-y-6">
        <div className="h-10 w-48 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>)}
        </div>
    </div>

    const statCards = [
        { label: 'Total Properties', count: stats.properties, icon: <FiHome size={24} />, color: 'bg-blue-500', path: '/admin/properties' },
        { label: 'New Enquiries', count: stats.enquiries, icon: <FiMessageSquare size={24} />, color: 'bg-green-500', path: '/admin/enquiries' },
        { label: 'Active Blogs', count: stats.blogs, icon: <FiFileText size={24} />, color: 'bg-purple-500', path: '/admin/blogs' },
        { label: 'Website Visits', count: '2.4K', icon: <FiTrendingUp size={24} />, color: 'bg-orange-500', path: '#' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:-translate-y-1 transition duration-300">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-dark">{stat.count}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Enquiries Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-dark">Recent Lead Enquiries</h2>
                    <Link to="/admin/enquiries" className="text-sm font-bold text-primary hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-slate-500 text-sm border-b border-slate-100">
                                <th className="py-4 px-6 font-medium">Name</th>
                                <th className="py-4 px-6 font-medium">Email / Phone</th>
                                <th className="py-4 px-6 font-medium">Property Details</th>
                                <th className="py-4 px-6 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentEnquiries.map((enquiry) => (
                                <tr key={enquiry._id} className="border-b border-slate-50 hover:bg-slate-50 transition border-l-4 border-l-transparent hover:border-l-primary">
                                    <td className="py-4 px-6 text-dark font-medium">{enquiry.name}</td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm text-slate-700">{enquiry.email}</p>
                                        <p className="text-xs text-slate-500">{enquiry.phone}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        {enquiry.propertyId ? (
                                            <Link to={`/properties/${enquiry.propertyId._id}`} className="text-primary hover:underline text-sm font-medium">
                                                {enquiry.propertyId.title}
                                            </Link>
                                        ) : (
                                            <span className="text-slate-400 text-sm">Property Unavailable</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-500">
                                        {new Date(enquiry.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {recentEnquiries.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-12 text-center text-slate-500">No recent enquiries found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
