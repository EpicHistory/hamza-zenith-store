export const API_BASE_URL = 'https://hamzafyp.onrender.com';

// Auth helper
export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Mock products data
const mockProducts = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 15000,
    category: 'electronics',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 25000,
    category: 'electronics',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    price: 2500,
    category: 'clothing',
    image: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Running Shoes',
    description: 'Professional running shoes for athletes',
    price: 8000,
    category: 'footwear',
    image: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Laptop Bag',
    description: 'Durable laptop bag with multiple compartments',
    price: 3500,
    category: 'accessories',
    image: '/placeholder.svg'
  },
  {
    id: '6',
    title: 'Mobile Phone',
    description: 'Latest smartphone with advanced features',
    price: 45000,
    category: 'electronics',
    image: '/placeholder.svg'
  }
];

// Public API functions
export const api = {
  // Products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock data');
      return mockProducts;
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock data');
      return mockProducts.find(p => p.id === id) || mockProducts[0];
    }
  },

  getProductsByCategory: async (category: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock data');
      return mockProducts.filter(p => p.category === category);
    }
  },

  // Checkout
  checkout: async (orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to place order');
    return response.json();
  },
};

// Mock admin data
const mockOrders = [
  { id: '1', customerName: 'John Doe', total: 15000, status: 'pending', date: '2024-01-15' },
  { id: '2', customerName: 'Jane Smith', total: 25000, status: 'completed', date: '2024-01-14' }
];

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer' }
];

// Admin API functions
export const adminApi = {
  // Auth
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock authentication');
      throw error; // Let the component handle mock auth
    }
  },

  // Products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock data');
      return mockProducts;
    }
  },

  addProduct: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
  },

  updateProduct: async (id: string, formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  // Orders
  getOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock data');
      return mockOrders;
    }
  },

  // Users
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    } catch (error) {
      console.log('API not available, using mock data');
      return mockUsers;
    }
  },
};

// Helper function to get image URL
export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder.svg';
  return `${API_BASE_URL}${imagePath}`;
};