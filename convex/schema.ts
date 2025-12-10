import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageUrl: v.string(),
    category: v.string(),
    sizes: v.array(v.string()),
    colors: v.array(v.string()),
    inStock: v.boolean(),
    featured: v.optional(v.boolean()),
  }),
  
  orders: defineTable({
    orderNumber: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    items: v.array(v.object({
      productId: v.id("products"),
      productName: v.string(),
      size: v.string(),
      color: v.string(),
      quantity: v.number(),
      price: v.number(),
    })),
    totalAmount: v.number(),
    status: v.string(), // "pending", "processing", "shipped", "delivered"
    paymentMethod: v.string(),
    notes: v.optional(v.string()),
  }).index("by_status", ["status"])
    .index("by_email", ["customerEmail"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
