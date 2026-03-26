import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('/api/blogs');
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Real Estate Insights</h1>
        <p className="text-xl text-slate-500">Read the latest news, market trends, and property buying guides.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-96 bg-slate-200 rounded-2xl w-full"></div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-xl">No blogs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-slate-100 flex flex-col group">
              <div className="h-56 overflow-hidden">
                <img 
                  src={blog.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                  {new Date(blog.createdAt).toLocaleDateString()} &bull; {blog.author}
                </p>
                <Link to={`/blogs/${blog._id}`}>
                  <h2 className="text-xl font-bold text-dark mb-3 hover:text-primary transition line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-slate-500 line-clamp-3 mb-6 flex-1">
                  {blog.content}
                </p>
                <Link to={`/blogs/${blog._id}`} className="text-primary font-bold hover:underline">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
