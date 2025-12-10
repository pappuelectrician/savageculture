import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { toast } from "sonner";

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "add-product">("orders");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const orders = useQuery(api.orders.list);
  const products = useQuery(api.products.list);
  const updateOrderStatus = useMutation(api.orders.updateStatus);
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const deleteProduct = useMutation(api.products.deleteProduct);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    inStock: true,
    featured: false,
  });

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ orderId: orderId as any, status: newStatus });
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct({
          id: editingProduct._id,
          ...productForm,
        });
        toast.success("Product updated successfully");
        setEditingProduct(null);
      } else {
        await createProduct(productForm);
        toast.success("Product created successfully");
      }
      setProductForm({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        category: "Hoodies",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        inStock: true,
        featured: false,
      });
      setActiveTab("products");
    } catch (error) {
      toast.error("Failed to save product");
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      sizes: product.sizes,
      colors: product.colors,
      inStock: product.inStock,
      featured: product.featured || false,
    });
    setActiveTab("add-product");
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({ id: productId as any });
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-900 text-yellow-300 border-yellow-700";
      case "processing": return "bg-blue-900 text-blue-300 border-blue-700";
      case "shipped": return "bg-purple-900 text-purple-300 border-purple-700";
      case "delivered": return "bg-green-900 text-green-300 border-green-700";
      default: return "bg-gray-800 text-gray-300 border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-red-500">Savage Culture - Admin</h1>
            <div className="text-gray-300">Admin Dashboard</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-lg shadow-xl border border-red-800">
          <div className="border-b border-red-800">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-400 hover:text-red-400 hover:border-red-600"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-400 hover:text-red-400 hover:border-red-600"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => {
                  setActiveTab("add-product");
                  setEditingProduct(null);
                  setProductForm({
                    name: "",
                    description: "",
                    price: 0,
                    imageUrl: "",
                    category: "Hoodies",
                    sizes: ["S", "M", "L", "XL", "XXL"],
                    colors: ["Black"],
                    inStock: true,
                    featured: false,
                  });
                }}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "add-product"
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-400 hover:text-red-400 hover:border-red-600"
                }`}
              >
                {editingProduct ? "Edit Product" : "Add Product"}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-red-500 mb-6">Orders Management</h2>
                {!orders || orders.length === 0 ? (
                  <p className="text-gray-400">No orders yet.</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="bg-gray-800 border border-red-800 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              Order #{order.orderNumber}
                            </h3>
                            <p className="text-gray-300">{order.customerName} • {order.customerEmail}</p>
                            <p className="text-gray-300">{order.customerPhone}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                              {order.status.toUpperCase()}
                            </span>
                            <p className="text-xl font-bold text-red-500 mt-2">₹{order.totalAmount.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-red-400 mb-2">Shipping Address:</h4>
                          <p className="text-gray-300">
                            {order.shippingAddress.street}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                            {order.shippingAddress.country}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-red-400 mb-2">Items:</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm text-gray-300">
                                <span>{item.productName} ({item.size}, {item.color}) x{item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {order.notes && (
                          <div className="mb-4">
                            <h4 className="font-medium text-red-400 mb-2">Notes:</h4>
                            <p className="text-gray-300">{order.notes}</p>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                            className="px-3 py-2 bg-gray-700 border border-red-800 rounded-md text-sm text-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <h2 className="text-2xl font-bold text-red-500 mb-6">Products Management</h2>
                {!products || products.length === 0 ? (
                  <p className="text-gray-400">No products yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product._id} className="bg-gray-800 border border-red-800 rounded-lg p-4">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                        <p className="text-xl font-bold text-red-500 mb-4">₹{product.price}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "add-product" && (
              <div>
                <h2 className="text-2xl font-bold text-red-500 mb-6">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleProductSubmit} className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-red-400 font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-red-400 font-medium mb-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-red-400 font-medium mb-2">Price (₹)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-red-400 font-medium mb-2">Image URL</label>
                    <input
                      type="url"
                      required
                      value={productForm.imageUrl}
                      onChange={(e) => setProductForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-red-400 font-medium mb-2">Colors (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={productForm.colors.join(", ")}
                      onChange={(e) => setProductForm(prev => ({ 
                        ...prev, 
                        colors: e.target.value.split(",").map(c => c.trim()).filter(c => c) 
                      }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-red-800 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Black, Red, Gray"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="mr-2"
                      />
                      <span className="text-red-400">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={productForm.featured}
                        onChange={(e) => setProductForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="mr-2"
                      />
                      <span className="text-red-400">Featured</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
                  >
                    {editingProduct ? "Update Product" : "Create Product"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster theme="dark" />
    </div>
  );
}
