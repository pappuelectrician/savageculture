import { useRef, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured?: boolean;
}

interface HorizontalScrollSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function HorizontalScrollSection({ 
  id, 
  title, 
  subtitle, 
  products, 
  onProductClick 
}: HorizontalScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const itemWidth = 320; // Approximate width of each item
      const containerWidth = container.clientWidth;
      const centerPosition = scrollLeft + containerWidth / 2;
      const newCenterIndex = Math.round(centerPosition / itemWidth);
      
      setCenterIndex(Math.max(0, Math.min(newCenterIndex, products.length - 1)));
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [products.length]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section id={id} className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-red-500 mb-4 font-gothic tracking-wider">
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-md bg-black/30 border border-red-500/30 text-red-500 hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 flex items-center justify-center group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-md bg-black/30 border border-red-500/30 text-red-500 hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 flex items-center justify-center group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-16"
          >
            {products.map((product, index) => {
              const isCenterish = Math.abs(index - centerIndex) <= 1;
              const isCenter = index === centerIndex;
              
              return (
                <div
                  key={product._id}
                  className={`flex-shrink-0 transition-all duration-500 ease-out ${
                    isCenter 
                      ? 'scale-110 z-20' 
                      : isCenterish 
                        ? 'scale-105 z-10' 
                        : 'scale-95 opacity-70'
                  }`}
                  style={{ 
                    width: '300px',
                    transform: `scale(${isCenter ? 1.1 : isCenterish ? 1.05 : 0.95}) translateY(${isCenter ? '-10px' : '0px'})`
                  }}
                >
                  <div className="relative">
                    <ProductCard
                      product={product}
                      onClick={() => onProductClick(product)}
                    />
                    {isCenter && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 rounded-lg blur-xl -z-10 animate-pulse-red"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({ 
                      left: index * 320, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.abs(index - centerIndex) <= 1
                    ? 'bg-red-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
