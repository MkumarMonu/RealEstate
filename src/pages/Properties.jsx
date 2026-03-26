import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import axios from 'axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const query = new URLSearchParams(useLocation().search);
  const locationParam = query.get('location') || '';
  const typeParam = query.get('propertyType') || '';
  const minPriceParam = query.get('minPrice') || '';
  const maxPriceParam = query.get('maxPrice') || '';

  const [location, setLocation] = useState(locationParam);
  const [propertyType, setPropertyType] = useState(typeParam);
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [bedrooms, setBedrooms] = useState('');
  const [sort, setSort] = useState('latest');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, [locationParam, typeParam, minPriceParam, maxPriceParam, page, sort]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      let fetchUrl = `/api/properties?page=${page}&limit=9&sort=${sort}`;
      if (locationParam) fetchUrl += `&location=${locationParam}`;
      if (typeParam) fetchUrl += `&propertyType=${typeParam}`;
      if (minPriceParam) fetchUrl += `&minPrice=${minPriceParam}`;
      if (maxPriceParam) fetchUrl += `&maxPrice=${maxPriceParam}`;
      if (bedrooms) fetchUrl += `&bedrooms=${bedrooms}`;

      const { data } = await axios.get(fetchUrl);
      setProperties(data.properties);
      setPages(data.pages);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    let sq = `/properties?`;
    if (location) sq += `location=${location}&`;
    if (propertyType) sq += `propertyType=${propertyType}&`;
    if (minPrice) sq += `minPrice=${minPrice}&`;
    if (maxPrice) sq += `maxPrice=${maxPrice}&`;
    
    navigate(sq.slice(0, -1)); // navigate to update URL and trigger effect
    // Explicitly call fetch Properties since bedrooms and sort are local state
    fetchProperties(); 
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Find Properties</h1>
          <p className="text-slate-500 mt-2">Filter and browse available listings</p>
        </div>
        <div>
          <select 
            className="border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
          >
            <option value="latest">Sort by: Latest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Filters</h2>
            <form onSubmit={handleFilter} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input 
                  type="text" 
                  placeholder="City, State..." 
                  className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                <select 
                  className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Min Price</label>
                  <input type="number" placeholder="$0" className="w-full border-slate-200 border rounded-lg px-3 py-2 outline-none" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Max Price</label>
                  <input type="number" placeholder="Any" className="w-full border-slate-200 border rounded-lg px-3 py-2 outline-none" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
                <select 
                  className="w-full border-slate-200 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 mt-4 rounded-xl hover:bg-blue-700 transition">
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-slate-200 h-96 rounded-2xl w-full"></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-700">No properties found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters to find more properties.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  {[...Array(pages).keys()].map(x => (
                    <button
                      key={x + 1}
                      onClick={() => setPage(x + 1)}
                      className={`px-4 py-2 rounded-lg font-bold transition ${
                        page === x + 1 
                        ? 'bg-primary text-white shadow-md shadow-primary/30' 
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {x + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
