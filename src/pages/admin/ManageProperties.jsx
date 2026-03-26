import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProperties = async () => {
        try {
            const { data } = await axios.get('/api/properties?limit=100');
            setProperties(data.properties);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/properties/${id}`, config);
                fetchProperties();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    if (loading) return <div className="animate-pulse">Loading properties...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark">Manage Properties</h1>
                    <p className="text-slate-500 mt-2">Add, edit, or delete listings</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/properties/add')}
                    className="flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                >
                    <FiPlus size={20} /> Add New Property
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                                <th className="py-4 px-6 font-medium">Image</th>
                                <th className="py-4 px-6 font-medium">Title/Location</th>
                                <th className="py-4 px-6 font-medium">Price</th>
                                <th className="py-4 px-6 font-medium">Type</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                                <th className="py-4 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property) => (
                                <tr key={property._id} className="border-b border-slate-50 hover:bg-slate-50 transition border-l-4 border-l-transparent hover:border-l-primary">
                                    <td className="py-4 px-6">
                                        <img src={property.images[0] || 'https://via.placeholder.com/80'} alt={property.title} className="w-16 h-16 object-cover rounded-lg" />
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-bold text-dark line-clamp-1">{property.title}</p>
                                        <p className="text-sm text-slate-500 truncate w-48">{property.location}</p>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-primary">${property.price.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-sm">{property.propertyType}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${property.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {property.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-3">
                                        <button onClick={() => navigate(`/admin/properties/edit/${property._id}`)} className="text-blue-500 hover:text-blue-700 transition">
                                            <FiEdit size={20} />
                                        </button>
                                        <button onClick={() => deleteHandler(property._id)} className="text-red-500 hover:text-red-700 transition">
                                            <FiTrash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-slate-500">No properties found. Add your first property!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProperties;
