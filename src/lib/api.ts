export const API_BASE_URL = 'https://hamzafyp.onrender.com';

// Auth helper
export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Public API functions
export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getProductsByCategory: async (category: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
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

// Admin API functions
export const adminApi = {
  // Auth
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Users
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // Change Password
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) throw new Error('Failed to change password');
    return response.json();
  },
};

// Helper function to get image URL
export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder.svg';
  return `${API_BASE_URL}${imagePath}`;
};