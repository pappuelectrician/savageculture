interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-red-500 font-gothic tracking-wider">
              SAVAGE CULTURE
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-2">
            <a href="#hoodies" className="nav-item glass-nav">
              Hoodies
            </a>
            <a href="#tshirts" className="nav-item glass-nav">
              T-Shirts
            </a>
            <a href="#pants" className="nav-item glass-nav">
              Pants
            </a>
            <a href="#about" className="nav-item glass-nav">
              About
            </a>
            <a href="#contact" className="nav-item glass-nav">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-red-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
