import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${id}`);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-32 text-2xl font-bold text-primary animate-pulse">Loading article...</div>;
  if (!blog) return <div className="text-center py-32 text-2xl font-bold text-red-500">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="mb-8">
        <Link to="/blogs" className="text-primary font-bold hover:underline mb-6 inline-block">&larr; Back to all blogs</Link>
        <p className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">
          {new Date(blog.createdAt).toLocaleDateString()} &bull; By {blog.author}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-8 leading-tight">{blog.title}</h1>
      </div>

      <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-lg">
        <img 
          src={blog.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
        {blog.content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-6">{paragraph}</p>
        ))}
      </div>

    </div>
  );
};

export default BlogDetails;
