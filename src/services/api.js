/**
 * Simulated API Service Layer
 * 
 * Once the Node/Express + MongoDB backend is ready, replace these 
 * mock functions with actual fetch() or axios calls to your endpoints.
 * 
 * Example future implementation:
 * export const fetchProducts = async () => {
 *   const response = await fetch('/api/products');
 *   return response.json();
 * }
 */

import { mockProducts } from '../data/mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (category = 'All') => {
  await delay(500); // simulate 500ms network request
  if (category === 'All') return mockProducts;
  return mockProducts.filter(p => p.category === category);
};

export const getProductById = async (id) => {
  await delay(300);
  return mockProducts.find(p => p.id === id);
};

// These will later connect to your Node backend routes (e.g., /api/orders)
export const createOrder = async (orderData) => {
  await delay(1000);
  console.log("Order created:", orderData);
  return { success: true, orderId: `ORD-${Math.floor(Math.random() * 100000)}` };
};

// Stripe intent mock
export const createPaymentIntent = async (amount) => {
  await delay(500);
  return { clientSecret: "mock_secret_123" };
};
