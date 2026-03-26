import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ManageEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchEnquiries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchEnquiries = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('/api/enquiries', config);
            setEnquiries(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching enquiries', error);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Delete this enquiry?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/enquiries/${id}`, config);
                fetchEnquiries();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting enquiry');
            }
        }
    };

    if (loading) return <div className="animate-pulse">Loading enquiries...</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark">Lead Enquiries</h1>
                <p className="text-slate-500 mt-2">Manage all customer requests and leads</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                                <th className="py-4 px-6 font-medium">Date</th>
                                <th className="py-4 px-6 font-medium">Customer Details</th>
                                <th className="py-4 px-6 font-medium">Message</th>
                                <th className="py-4 px-6 font-medium">Property</th>
                                <th className="py-4 px-6 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.map((enq) => (
                                <tr key={enq._id} className="border-b border-slate-50 hover:bg-slate-50 transition border-l-4 border-l-transparent hover:border-l-primary">
                                    <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">
                                        {new Date(enq.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-bold text-dark">{enq.name}</p>
                                        <p className="text-sm text-slate-500">{enq.email}</p>
                                        <p className="text-sm text-slate-500">{enq.phone}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm text-slate-700 w-64 line-clamp-3">{enq.message}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        {enq.propertyId ? (
                                            <Link to={`/properties/${enq.propertyId._id}`} className="text-primary hover:underline text-sm font-medium">
                                                {enq.propertyId.title}
                                            </Link>
                                        ) : (
                                            <span className="text-slate-400 text-sm">Unavailable</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button onClick={() => deleteHandler(enq._id)} className="text-red-500 hover:text-red-700 transition">
                                            <FiTrash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {enquiries.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-500">No enquiries found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEnquiries;
