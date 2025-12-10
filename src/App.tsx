import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { ProductGrid } from "./components/ProductGrid";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

export type CartItem = {
  productId: string;
  productName: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  imageUrl: string;
};

export default function App() {
  const [currentView, setCurrentView] = useState<"shop" | "cart" | "checkout">("shop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = useQuery(api.products.list);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existingItem = prev.find(
        cartItem => 
          cartItem.productId === item.productId && 
          cartItem.size === item.size && 
          cartItem.color === item.color
      );

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.productId === item.productId && 
          cartItem.size === item.size && 
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(
        item => !(item.productId === productId && item.size === size && item.color === color)
      ));
    } else {
      setCart(prev => prev.map(item =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {currentView === "shop" && (
        <>
          <Hero />
          <main className="max-w-full mx-auto py-12">
            <div className="text-center mb-16 px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-red-500 mb-4 font-gothic">Our Dark Collection</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Embrace the darkness with our premium metal-inspired collection. Each piece crafted for the savage soul.
              </p>
            </div>
            <ProductGrid products={products || []} onAddToCart={addToCart} />
          </main>
        </>
      )}

      {currentView === "checkout" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Checkout 
            cart={cart}
            total={cartTotal}
            onBack={() => setCurrentView("shop")}
            onOrderComplete={() => {
              clearCart();
              setCurrentView("shop");
            }}
          />
        </main>
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView("checkout");
        }}
        total={cartTotal}
      />

      <Footer />
      <Toaster theme="dark" />
    </div>
  );
}
