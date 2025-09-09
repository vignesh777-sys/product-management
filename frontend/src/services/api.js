import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

// Product API functions
export const productAPI = {
  // Get all products with optional filters
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response;
  },

  // Create new product
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response;
  },

  // Update product
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response;
  },

  // Delete product
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response;
  },

  // Search products
  search: async (searchTerm, category = '', sort = 'price', order = 'asc') => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (category && category !== 'All Categories') params.category = category;
    if (sort) params.sort = sort;
    if (order) params.order = order;
    
    const response = await api.get('/products', { params });
    return response;
  }
};

export default api;
