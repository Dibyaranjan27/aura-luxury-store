import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => 
        set((state) => ({
          items: state.items.some(item => item.id === product.id)
            ? state.items
            : [...state.items, product]
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        })),
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
);

export default useWishlistStore;