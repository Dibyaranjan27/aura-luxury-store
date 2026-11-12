/**
 * AURA Store API Service Layer
 *
 * Connects the React client to the Express + MongoDB backend.
 * Includes graceful fallback to local mock data if the backend is offline.
 */

import { mockProducts, categories as fallbackCategories } from '../data/mockData';

const API_BASE = '/api';

/**
 * Fetch products with optional category, search, and sorting
 */
export const getProducts = async ({ category = 'All', search = '', sort = 'featured', isBestSeller } = {}) => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());
    if (sort) params.append('sort', sort);
    if (isBestSeller) params.append('isBestSeller', 'true');

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/products${queryString}`);

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data && data.length > 0 ? data : fallbackLocalFilter({ category, search, sort, isBestSeller });
  } catch (err) {
    console.warn(`[API] Backend unavailable (${err.message}). Serving local dataset.`);
    return fallbackLocalFilter({ category, search, sort, isBestSeller });
  }
};

/**
 * Fetch a single product by ID
 */
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) {
      throw new Error(`Product lookup failed: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Backend lookup failed (${err.message}). Searching local dataset.`);
    return mockProducts.find((p) => p.id === id || p._id === id) || null;
  }
};

/**
 * Fetch product categories
 */
export const getCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Categories fetch failed');
    const data = await res.json();
    return data.length > 0 ? data : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
};

/**
 * Submit Order to Backend
 */
export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error(`Order failed with status ${res.status}`);
    }

    const order = await res.json();
    // Cache order locally so it shows in Account even if running offline
    cacheLocalOrder(order);
    return order;
  } catch (err) {
    console.warn(`[API] Order backend offline (${err.message}). Generating offline confirmation.`);
    const fallbackOrder = {
      _id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      totalAmount: orderData.totalAmount,
      items: orderData.items,
      isMock: true,
    };
    cacheLocalOrder(fallbackOrder);
    return fallbackOrder;
  }
};

/**
 * Fetch user order history
 */
export const getMyOrders = async (userId, email) => {
  try {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (email) params.append('email', email);

    const res = await fetch(`${API_BASE}/orders/myorders?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('[API] Failed to fetch orders from server:', err.message);
  }

  // Return locally cached orders
  try {
    const saved = localStorage.getItem('aura_client_orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function cacheLocalOrder(order) {
  try {
    const current = JSON.parse(localStorage.getItem('aura_client_orders') || '[]');
    localStorage.setItem('aura_client_orders', JSON.stringify([order, ...current]));
  } catch (e) {
    console.error('Failed to cache order locally', e);
  }
}

/**
 * Helper: Local fallback filter
 */
function fallbackLocalFilter({ category, search, sort, isBestSeller }) {
  let result = [...mockProducts];

  if (category && category !== 'All') {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (isBestSeller) {
    result = result.filter((p) => p.isBestSeller);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    result.reverse();
  }

  return result;
}
