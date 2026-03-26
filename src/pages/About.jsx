const About = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">About RealEstates</h1>
        <p className="text-xl text-slate-500">We are dedicated to helping you find the perfect place to call home.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="About Us" className="rounded-2xl shadow-xl hover:scale-105 transition duration-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-dark mb-6">Our Mission</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            At RealEstates, our mission is to redefine the real estate experience through unparalleled service, innovative technology, and a deep commitment to our clients. We believe that finding a home should be an exciting and seamless journey.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-primary">
              <h3 className="text-3xl font-bold text-primary mb-2">10+</h3>
              <p className="text-slate-500 font-medium">Years Experience</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-primary">
              <h3 className="text-3xl font-bold text-primary mb-2">5K+</h3>
              <p className="text-slate-500 font-medium">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
