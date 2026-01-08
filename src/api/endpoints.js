export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/admin/login',
  PROFILE: '/admin/profile',
  
  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  
  // SubCategories
  SUBCATEGORIES: '/subcategories',
  SUBCATEGORY_BY_ID: (id) => `/subcategories/${id}`,
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  
  // Drivers
  DRIVERS: '/drivers',
  DRIVER_BY_ID: (id) => `/drivers/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDER_STATUS: (id) => `/orders/${id}/status`,
};