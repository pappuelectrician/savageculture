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

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      className="group cursor-pointer bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-red-800 hover:border-red-500 transform hover:scale-105"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden rounded-t-lg relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {product.featured && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            FEATURED
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-500">₹{product.price}</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-red-500"
                style={{ 
                  backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                 color.toLowerCase() === 'white' ? '#fff' :
                                 color.toLowerCase() === 'red' ? '#dc2626' :
                                 color.toLowerCase() === 'gray' ? '#6b7280' :
                                 color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                 color.toLowerCase() === 'burgundy' ? '#7c2d12' :
                                 '#9ca3af'
                }}
              />
            ))}
          </div>
        </div>
        {!product.inStock && (
          <div className="mt-2">
            <span className="text-red-400 text-sm font-medium">OUT OF STOCK</span>
          </div>
        )}
      </div>
    </div>
  );
}
