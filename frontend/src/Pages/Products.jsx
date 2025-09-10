import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';
import Button from '../components/ui/Button';
import { Plus, Package } from "lucide-react";
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import SearchAndSort from '../components/SearchAndSort';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [error, setError] = useState(null);

  // Load all products once from API
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productAPI.getAll();
        setAllProducts(response.data || []);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again.');
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Filter + sort products
  useEffect(() => {
    let filtered = [...allProducts];
    const lowerSearch = searchTerm.toLowerCase().trim();
    const lowerCategoryFilter = categoryFilter.toLowerCase().trim();

    if (lowerCategoryFilter && lowerCategoryFilter !== 'all categories') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(lowerCategoryFilter));
    }

    if (lowerSearch) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch)
      );
    }

    filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    setProducts(filtered);
  }, [allProducts, searchTerm, categoryFilter, sortOrder]);

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct._id, productData);
      } else {
        await productAPI.create(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
      const response = await productAPI.getAll();
      setAllProducts(response.data || []);
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productAPI.delete(productId);
      setAllProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // stagger 150ms between cards
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
            <p className="text-gray-600 mt-1">Manage your products below</p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Plus className="w-5 h-8 mr-2 cursor-pointer" />
            Add Product
          </Button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Search and Sort */}
        <SearchAndSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
        />

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-medium text-gray-900">
              {products.length} Product{products.length !== 1 ? 's' : ''} Found
            </span>
          </div>

          {products.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div key={product._id} variants={cardVariants}>
                  <ProductCard
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || categoryFilter !== 'All Categories'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first product'
                }
              </p>
              {!searchTerm && categoryFilter === 'All Categories' && (
                <Button
                  onClick={handleAddProduct}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              )}
            </div>
          )}
        </div>

        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          isOpen={showForm}
        />
      </div>
    </motion.div>
  );
}
