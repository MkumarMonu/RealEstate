import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiImage } from 'react-icons/fi';

const BlogForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(isEdit);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (isEdit) {
            const fetchBlog = async () => {
                try {
                    const { data } = await axios.get(`/api/blogs/${id}`);
                    setTitle(data.title);
                    setContent(data.content);
                    setAuthor(data.author);
                    setImage(data.image);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching blog Details');
                    setLoading(false);
                }
            };
            fetchBlog();
        }
    }, [id, isEdit]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error('Upload error', error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };
            const payload = { title, content, author, image };

            if (isEdit) {
                await axios.put(`/api/blogs/${id}`, payload, config);
            } else {
                await axios.post('/api/blogs', payload, config);
            }
            navigate('/admin/blogs');
        } catch (error) {
            alert(error.response?.data?.message || 'Error saving blog');
        }
    };

    if (loading) return <div className="animate-pulse">Loading form data...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link to="/admin/blogs" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
                    <FiArrowLeft size={20} className="text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-dark">{isEdit ? 'Edit Blog Post' : 'Write New Post'}</h1>
                    <p className="text-slate-500 mt-1">Share your thoughts and insights</p>
                </div>
            </div>

            <form onSubmit={submitHandler} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Article Title *</label>
                        <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Author Name *</label>
                        <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Cover Image</label>
                    <div className="flex items-center gap-6">
                        {image && (
                            <img src={image} alt="Cover Preview" className="w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        )}
                        <div className="relative flex-1 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition">
                            <input type="file" onChange={uploadFileHandler} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="flex flex-col items-center">
                                <FiImage className="text-3xl text-slate-400 mb-2" />
                                <span className="text-primary font-medium tracking-wide">Choose an image</span>
                            </div>
                            {uploading && <p className="text-sm mt-2 text-primary">Uploading...</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Content/Body *</label>
                    <textarea required rows="15" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-y" placeholder="Write your article here... (Supports multiple paragraphs)" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/admin/blogs')} className="px-6 py-3 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition">
                        Cancel
                    </button>
                    <button type="submit" className="px-8 py-3 bg-primary text-white rounded-xl font-bold py-3 hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                        {isEdit ? 'Update Post' : 'Publish Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
