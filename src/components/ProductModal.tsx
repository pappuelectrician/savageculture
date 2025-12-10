import { useState } from "react";
import { toast } from "sonner";
import type { CartItem } from "../App";

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

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    onAddToCart({
      productId: product._id,
      productName: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      imageUrl: product.imageUrl,
    });

    toast.success("Added to cart!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-80" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl rounded-lg border border-red-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-300 mb-6">{product.description}</p>
              
              <div className="text-3xl font-bold text-red-500 mb-6">₹{product.price}</div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-red-400 mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-md text-center font-medium transition-all ${
                        selectedSize === size
                          ? "border-red-500 bg-red-600 text-white"
                          : "border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-red-400 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-red-500 scale-110" : "border-gray-600 hover:border-red-500"
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                       color.toLowerCase() === 'white' ? '#fff' :
                                       color.toLowerCase() === 'red' ? '#dc2626' :
                                       color.toLowerCase() === 'gray' ? '#6b7280' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'burgundy' ? '#7c2d12' :
                                       '#9ca3af'
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
