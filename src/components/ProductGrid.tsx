import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { HorizontalScrollSection } from "./HorizontalScrollSection";
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

interface ProductGridProps {
  products: Product[];
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by category
  const hoodies = products.filter(p => 
    p.category.toLowerCase().includes('hoodie') || 
    p.name.toLowerCase().includes('hoodie')
  );
  
  const tshirts = products.filter(p => 
    p.category.toLowerCase().includes('shirt') || 
    p.category.toLowerCase().includes('tee') ||
    p.name.toLowerCase().includes('shirt') ||
    p.name.toLowerCase().includes('tee')
  );
  
  const pants = products.filter(p => 
    p.category.toLowerCase().includes('pant') || 
    p.category.toLowerCase().includes('trouser') ||
    p.name.toLowerCase().includes('pant') ||
    p.name.toLowerCase().includes('trouser')
  );

  // If we don't have enough products in categories, distribute them
  const allProducts = [...hoodies, ...tshirts, ...pants];
  const remainingProducts = products.filter(p => !allProducts.includes(p));
  
  // Distribute remaining products evenly
  const finalHoodies = hoodies.length > 0 ? hoodies : products.slice(0, Math.ceil(products.length / 3));
  const finalTshirts = tshirts.length > 0 ? tshirts : products.slice(Math.ceil(products.length / 3), Math.ceil(2 * products.length / 3));
  const finalPants = pants.length > 0 ? pants : products.slice(Math.ceil(2 * products.length / 3));

  return (
    <>
      <div className="space-y-20">
        <HorizontalScrollSection
          id="hoodies"
          title="HOODIES"
          subtitle="Embrace the darkness with our premium hoodies"
          products={finalHoodies}
          onProductClick={setSelectedProduct}
        />
        
        <HorizontalScrollSection
          id="tshirts"
          title="T-SHIRTS"
          subtitle="Express your savage nature with our metal tees"
          products={finalTshirts}
          onProductClick={setSelectedProduct}
        />
        
        <HorizontalScrollSection
          id="pants"
          title="PANTS"
          subtitle="Complete your dark aesthetic with our premium pants"
          products={finalPants}
          onProductClick={setSelectedProduct}
        />
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
