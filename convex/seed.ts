import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if products already exist
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length > 0) {
      return "Products already seeded";
    }

    const products = [
      // HOODIES
      {
        name: "Death Metal Hoodie",
        description: "Embrace the darkness with this premium black hoodie featuring gothic metal aesthetics. Perfect for the savage soul.",
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
        category: "Hoodies",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Dark Red"],
        inStock: true,
        featured: true,
      },
      {
        name: "Savage Oversized Hoodie",
        description: "Ultra-dark oversized hoodie with blood-red accents. For those who live in the shadows and embrace their savage nature.",
        price: 3499,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
        category: "Hoodies",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Charcoal", "Dark Red"],
        inStock: true,
        featured: true,
      },
      {
        name: "Gothic Rebellion Hoodie",
        description: "Born from rebellion, this gothic-inspired hoodie features intricate dark designs. Made for the metal warriors.",
        price: 3799,
        imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop",
        category: "Hoodies",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Dark Navy"],
        inStock: true,
        featured: false,
      },
      {
        name: "Blood Moon Premium Hoodie",
        description: "Luxurious blood-red hoodie with premium fleece lining. The ultimate statement piece for the savage culture elite.",
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=500&h=500&fit=crop",
        category: "Hoodies",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blood Red", "Burgundy"],
        inStock: true,
        featured: true,
      },
      
      // T-SHIRTS
      {
        name: "Savage Culture Metal Tee",
        description: "Express your dark side with this premium metal-inspired t-shirt. Soft cotton with bold gothic graphics.",
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        category: "T-Shirts",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Dark Red", "Charcoal"],
        inStock: true,
        featured: true,
      },
      {
        name: "Gothic Skull Tee",
        description: "Unleash your inner darkness with this striking skull design. Premium quality cotton for ultimate comfort.",
        price: 2299,
        imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop",
        category: "T-Shirts",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Dark Gray"],
        inStock: true,
        featured: false,
      },
      {
        name: "Crimson Rebellion Tee",
        description: "Bold crimson graphics on premium black cotton. Perfect for those who dare to be different.",
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
        category: "T-Shirts",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Crimson"],
        inStock: true,
        featured: true,
      },
      
      // PANTS
      {
        name: "Dark Warrior Cargo Pants",
        description: "Military-inspired cargo pants with gothic details. Built for the modern savage warrior.",
        price: 4299,
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
        category: "Pants",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Black", "Dark Gray", "Charcoal"],
        inStock: true,
        featured: true,
      },
      {
        name: "Gothic Skinny Jeans",
        description: "Sleek black skinny jeans with subtle gothic accents. Perfect for completing your dark aesthetic.",
        price: 3799,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
        category: "Pants",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Black", "Dark Wash"],
        inStock: true,
        featured: false,
      },
      {
        name: "Savage Tactical Pants",
        description: "Heavy-duty tactical pants with multiple pockets and reinforced knees. Built for the savage lifestyle.",
        price: 4799,
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
        category: "Pants",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Black", "Dark Olive"],
        inStock: true,
        featured: true,
      },
    ];

    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return `Seeded ${products.length} savage products across all categories`;
  },
});
