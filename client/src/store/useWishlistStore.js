import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const getProductId = (product) => product._id || product.id || ''

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const productId = getProductId(product)
        if (!productId) return

        set((state) => {
          const exists = state.items.some((item) => getProductId(item) === productId)
          if (exists) return state
          return {
            items: [...state.items, { ...product, id: productId }],
          }
        })
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => getProductId(item) !== productId),
        })),

      toggleItem: (product) => {
        const productId = getProductId(product)
        if (!productId) return
        const inWishlist = get().items.some((item) => getProductId(item) === productId)
        if (inWishlist) {
          get().removeItem(productId)
        } else {
          get().addItem(product)
        }
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) =>
        get().items.some((item) => getProductId(item) === productId),
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useWishlistStore
