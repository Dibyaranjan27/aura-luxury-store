import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getItemId = (item) => item?.id || item?._id;

const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => 
        set((state) => {
          const targetId = getItemId(product);
          const exists = state.items.some(item => getItemId(item) === targetId);
          return {
            items: exists ? state.items : [...state.items, { ...product, id: targetId }]
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(item => getItemId(item) !== productId && item.id !== productId)
        })),
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
);

export default useWishlistStore;
