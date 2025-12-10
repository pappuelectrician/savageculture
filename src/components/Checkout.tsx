import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import type { CartItem } from "../App";

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onOrderComplete: () => void;
}

export function Checkout({ cart, total, onBack, onOrderComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    paymentMethod: "credit_card",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const createOrder = useMutation(api.orders.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderItems = cart.map(item => ({
        productId: item.productId as any,
        productName: item.productName,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      }));

      await createOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: orderItems,
        totalAmount: total,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes || undefined,
      });

      toast.success("Order placed successfully!");
      onOrderComplete();
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order creation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg border border-red-800 p-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-red-500 mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>
        <h1 className="text-3xl font-bold text-red-500">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-400 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="customerName"
                  placeholder="Full Name"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="email"
                  name="customerEmail"
                  placeholder="Email Address"
                  required
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="Phone Number"
                  required
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-red-400 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="PIN Code"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-red-400 mb-4">Payment Method</h2>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="credit_card">Credit Card</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-red-400 mb-4">Order Notes (Optional)</h2>
              <textarea
                name="notes"
                placeholder="Any special instructions or notes..."
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-4 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isSubmitting ? "Placing Order..." : `PLACE ORDER - ₹${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-gray-800 p-6 rounded-lg sticky top-8 border border-red-800">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.productName}</h3>
                    <p className="text-sm text-gray-400">{item.size} • {item.color}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-400">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-red-800 pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-white">Total:</span>
                <span className="text-red-500">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
