import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getItemId = (item) => item?.id || item?._id;

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const targetId = getItemId(product);
        const existingItem = currentItems.find(item => getItemId(item) === targetId);
        
        if (existingItem) {
          set({
            items: currentItems.map(item =>
              getItemId(item) === targetId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity }] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => getItemId(item) !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map(item =>
            getItemId(item) === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'aura-cart-storage',
    }
  )
);

export default useCartStore;
