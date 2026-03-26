import { Link } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiHome } from 'react-icons/fi';
import { LuBedDouble, LuBath } from 'react-icons/lu';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100 group">
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {property.propertyType}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-900 text-sm font-bold px-3 py-1 rounded-full">
          {property.status}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-2xl font-bold">${property.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        <div className="flex items-center text-slate-500 text-sm mb-2 gap-1 content-center">
            <FiMapPin className="shrink-0" />
            <span className="truncate">{property.location}</span>
        </div>
        <Link to={`/properties/${property._id}`}>
          <h3 className="text-xl font-bold text-slate-900 mb-4 hover:text-primary transition-colors line-clamp-1">{property.title}</h3>
        </Link>
        
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 mb-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <LuBedDouble className="text-slate-400" size={20} />
            <span className="text-sm font-medium text-slate-700">{property.bedrooms} Beds</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-x border-slate-100">
            <LuBath className="text-slate-400" size={20} />
            <span className="text-sm font-medium text-slate-700">{property.bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <FiMaximize className="text-slate-400" size={20} />
            <span className="text-sm font-medium text-slate-700">{property.area} sqft</span>
          </div>
        </div>

        <Link to={`/properties/${property._id}`} className="block w-full text-center py-3 bg-slate-50 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors duration-300">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
