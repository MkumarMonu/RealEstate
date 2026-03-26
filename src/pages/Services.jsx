import React from 'react';

const Services = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">Our Services</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide comprehensive real estate services to help you find your dream property.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Cards */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-primary text-2xl font-bold">🏢</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Property Management</h3>
            <p className="text-slate-600">
              Professional management of your real estate investments, ensuring maximum returns and peace of mind for owners.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-primary text-2xl font-bold">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Buying & Selling</h3>
            <p className="text-slate-600">
              Expert guidance through the entire process of buying or selling your property at the best possible price.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-primary text-2xl font-bold">📈</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Consulting Services</h3>
            <p className="text-slate-600">
              Strategic advice on real estate investments, market analysis, and comprehensive portfolio optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
