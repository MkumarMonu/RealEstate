import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiMaximize, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { LuBedDouble, LuBath } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enquiry Form State
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqPhone, setEnqPhone] = useState('');
  const [enqMsg, setEnqMsg] = useState('I am interested in this property. Please contact me.');
  const [enqStatus, setEnqStatus] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`/api/properties/${id}`);
        setProperty(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const submitEnquiry = async (e) => {
    e.preventDefault();
    try {
      setEnqStatus('sending');
      await axios.post('/api/enquiries', {
        name: enqName,
        email: enqEmail,
        phone: enqPhone,
        message: enqMsg,
        propertyId: property._id
      });
      setEnqStatus('success');
      setEnqName(''); setEnqEmail(''); setEnqPhone('');
    } catch (err) {
      setEnqStatus('error');
    }
  };

  if (loading) return <div className="text-center py-32 text-2xl font-bold text-primary animate-pulse">Loading property details...</div>;
  if (error) return <div className="text-center py-32 text-2xl font-bold text-red-500">{error}</div>;
  if (!property) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase">{property.propertyType}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase ${property.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{property.status}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-dark mb-2">{property.title}</h1>
          <p className="flex items-center text-slate-500 text-lg"><FiMapPin className="mr-2" /> {property.address}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-extrabold text-primary">${property.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden">
        <div className="md:col-span-3 bg-slate-200 h-full relative group cursor-pointer">
          <img src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'} alt="Main Property" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          <div className="bg-slate-200 h-full overflow-hidden rounded-r-2xl cursor-pointer">
            <img src={property.images[1] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'} alt="Property 2" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
          </div>
          <div className="bg-slate-200 h-full overflow-hidden rounded-r-2xl cursor-pointer relative">
            <img src={property.images[2] || 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&w=600&q=80'} alt="Property 3" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
            {(property.images.length > 3) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                <span className="text-white text-xl font-bold">+{property.images.length - 3} Photos</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Facts */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex justify-between items-center text-center">
            <div>
              <LuBedDouble className="text-primary text-3xl mx-auto mb-2" />
              <p className="font-bold text-xl text-dark">{property.bedrooms}</p>
              <p className="text-slate-500">Bedrooms</p>
            </div>
            <div className="w-px h-16 bg-slate-200"></div>
            <div>
              <LuBath className="text-primary text-3xl mx-auto mb-2" />
              <p className="font-bold text-xl text-dark">{property.bathrooms}</p>
              <p className="text-slate-500">Bathrooms</p>
            </div>
            <div className="w-px h-16 bg-slate-200"></div>
            <div>
              <FiMaximize className="text-primary text-3xl mx-auto mb-2" />
              <p className="font-bold text-xl text-dark">{property.area}</p>
              <p className="text-slate-500">Square Feet</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-dark mb-4">Description</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-dark mb-6">Amenities</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((item, index) => (
                <li key={index} className="flex items-center text-slate-700">
                  <FiCheckCircle className="text-primary mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar / Contact */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg sticky top-24">
            <h3 className="text-xl font-bold text-dark mb-6">Contact Agent</h3>
            
            <a href={`https://wa.me/1234567890?text=Im%20interested%20in%20property%20${property.title}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#1EBE55] transition mb-6 shadow-md shadow-green-500/30">
              <FaWhatsapp size={24} />
              Chat on WhatsApp
            </a>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-3 text-slate-400 text-sm">OR</span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>

            {enqStatus === 'success' ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center border border-green-200">
                <FiCheckCircle className="mx-auto text-3xl mb-2" />
                <p className="font-bold">Enquiry Sent Successfully!</p>
                <p className="text-sm mt-1">Our agent will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={enqName} onChange={e => setEnqName(e.target.value)} />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={enqEmail} onChange={e => setEnqEmail(e.target.value)} />
                </div>
                <div>
                  <input type="tel" placeholder="Your Phone" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={enqPhone} onChange={e => setEnqPhone(e.target.value)} />
                </div>
                <div>
                  <textarea placeholder="Message" required rows="3" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" value={enqMsg} onChange={e => setEnqMsg(e.target.value)}></textarea>
                </div>
                {enqStatus === 'error' && <p className="text-red-500 text-sm">Error submitting enquiry, Try again.</p>}
                <button type="submit" disabled={enqStatus === 'sending'} className="w-full bg-primary text-white font-bold py-3 mt-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-primary/30">
                  {enqStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
