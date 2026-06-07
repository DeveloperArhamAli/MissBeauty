import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const buildLineId = (product) => {
  const id = product.id ?? product._id ?? ''
  const variant = product.variant ?? product.selectedVariant ?? ''
  const size = product.size ?? product.selectedSize ?? ''
  return `${id}-${variant}-${size}`
}

const normalizeCartProduct = (product) => {
  return {
    lineId: buildLineId(product),
    id: product.id ?? product._id ?? '',
    name: product.name ?? product.title ?? '',
    brand: product.brand ?? '',
    price: Number(product.price ?? 0),
    image: product.image ?? product.imageSrc ?? '',
    variant: product.variant ?? product.selectedVariant ?? '',
    size: product.size ?? product.selectedSize ?? '',
    quantity: Number(product.quantity ?? 1),
  }
}

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) => {
        const cartItem = normalizeCartProduct(product)

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.lineId === cartItem.lineId
          )

          if (existingIndex !== -1) {
            const updatedItems = [...state.items]
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + cartItem.quantity,
            }
            return { items: updatedItems }
          }

          return { items: [...state.items, cartItem] }
        })
      },

      removeFromCart: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId),
        })),

      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter((item) => item.lineId !== lineId)
              : state.items.map((item) =>
                  item.lineId === lineId ? { ...item, quantity } : item
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useCartStore
