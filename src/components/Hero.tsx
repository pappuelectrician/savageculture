export function Hero() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-red-900/20 to-black"></div>
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
          alt="Dark metal aesthetic"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-gothic">
            <span className="text-red-500">SAVAGE</span>
            <br />
            <span className="text-white">CULTURE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
            Embrace the darkness. Unleash your inner savage with our premium metal-inspired streetwear.
            <br />
            <span className="text-red-400">Born from rebellion. Forged in darkness.</span>
          </p>
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 border border-red-500"
          >
            ENTER THE DARKNESS
          </button>
        </div>
      </div>
      
      {/* Gothic decorative elements */}
      <div className="absolute top-10 left-10 text-red-800 opacity-20">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 text-red-800 opacity-20">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
        </svg>
      </div>
    </div>
  );
}
