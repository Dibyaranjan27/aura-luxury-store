import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const getCartItemId = (item) => {
  const baseId = item?.id || item?._id || 'item';
  const size = item?.selectedSize || '';
  const color = item?.selectedColor || '';
  return `${baseId}_${size}_${color}`;
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      
      addItem: (product, quantity = 1, options = {}) => {
        const currentItems = get().items;
        const newItem = {
          ...product,
          id: product.id || product._id,
          selectedSize: options.size || (product.attributes?.sizes ? product.attributes.sizes[0] : null),
          selectedColor: options.color || (product.attributes?.colors ? product.attributes.colors[0] : null),
          quantity: Math.max(1, quantity),
        };

        const targetKey = getCartItemId(newItem);
        const existingIndex = currentItems.findIndex(item => getCartItemId(item) === targetKey);
        
        let updatedItems;
        if (existingIndex > -1) {
          updatedItems = currentItems.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [...currentItems, newItem];
        }

        set({ items: updatedItems, isDrawerOpen: true });
      },
      
      removeItem: (itemKey) => {
        set({
          items: get().items.filter(item => getCartItemId(item) !== itemKey && item.id !== itemKey)
        });
      },
      
      updateQuantity: (itemKey, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map(item =>
            (getCartItemId(item) === itemKey || item.id === itemKey)
              ? { ...item, quantity }
              : item
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
