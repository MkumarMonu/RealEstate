import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blogs');
            setBlogs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs', error);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/blogs/${id}`, config);
                fetchBlogs();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting blog');
            }
        }
    };

    if (loading) return <div className="animate-pulse">Loading blogs...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark">Manage Blogs</h1>
                    <p className="text-slate-500 mt-2">Create and edit articles</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/blogs/add')}
                    className="flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                >
                    <FiPlus size={20} /> Write New Post
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                                <th className="py-4 px-6 font-medium">Image</th>
                                <th className="py-4 px-6 font-medium">Title</th>
                                <th className="py-4 px-6 font-medium">Author</th>
                                <th className="py-4 px-6 font-medium">Date Published</th>
                                <th className="py-4 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="border-b border-slate-50 hover:bg-slate-50 transition border-l-4 border-l-transparent hover:border-l-primary">
                                    <td className="py-4 px-6">
                                        <img src={blog.image || 'https://via.placeholder.com/80'} alt="Blog" className="w-16 h-12 object-cover rounded-lg" />
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-bold text-dark line-clamp-1 w-64">{blog.title}</p>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{blog.author}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 text-right space-x-3">
                                        <button onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)} className="text-blue-500 hover:text-blue-700 transition">
                                            <FiEdit size={20} />
                                        </button>
                                        <button onClick={() => deleteHandler(blog._id)} className="text-red-500 hover:text-red-700 transition">
                                            <FiTrash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-500">No blog posts found. Create one!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;
