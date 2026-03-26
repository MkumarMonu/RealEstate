import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import axios from 'axios';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch latest properties
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get('/api/properties?limit=6');
        setProperties(data.properties);
      } catch (error) {
        console.error('Error fetching properties', error);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/properties?`;
    if (location) query += `location=${location}&`;
    if (propertyType) query += `propertyType=${propertyType}&`;
    if (price) {
      const [min, max] = price.split('-');
      if (min) query += `minPrice=${min}&`;
      if (max) query += `maxPrice=${max}&`;
    }
    navigate(query);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern Home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Find Your <span className="text-primary">Dream Home</span>
          </h1>
          <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto">
            Discover the best properties in the most desirable locations. We make your real estate journey simple and pleasant.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-2xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Location (e.g. New York)" 
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <select 
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
              <select 
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">Max Price</option>
                <option value="0-100000">Under $100,000</option>
                <option value="100000-500000">$100,000 - $500,000</option>
                <option value="500000-1000000">$500,000 - $1,000,000</option>
                <option value="1000000-">$1,000,000+</option>
              </select>
              <button type="submit" className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Latest Properties</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Explore our newly added properties handpicked for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
            {properties.length === 0 && (
              <div className="col-span-3 text-center text-slate-500 py-12">
                Loading properties or no properties available.
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <button onClick={() => navigate('/properties')} className="px-8 py-3 outline outline-2 outline-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition duration-300">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Looking to Sell or Rent Your Property?</h2>
          <p className="text-xl text-blue-100 mb-10">We provide complete end-to-end services. Get in touch with our experts today.</p>
          <button onClick={() => navigate('/contact')} className="bg-white text-primary font-bold px-10 py-4 rounded-full hover:bg-slate-100 transition duration-300 shadow-xl">
            Contact Us Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
