import type { CartItem } from "../App";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  onCheckout: () => void;
  total: number;
}

export function Cart({ isOpen, onClose, cart, onUpdateQuantity, onCheckout, total }: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-80" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl border-l border-red-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-red-800">
            <h2 className="text-lg font-semibold text-white">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg border border-red-800">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.productName}</h3>
                      <p className="text-sm text-gray-400">{item.size} • {item.color}</p>
                      <p className="text-sm font-medium text-red-400">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-red-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-white">Total: ₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors transform hover:scale-105"
              >
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
