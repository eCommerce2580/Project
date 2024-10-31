// store/cartStore.ts
import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  uniqueId?: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
};

const getCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const useCartStore = create<CartState>((set) => ({
  cart: getCartFromLocalStorage(),

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      const updatedCart = existingItem
        ? state.cart.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        : [...state.cart, item];

      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),

  removeFromCart: (uniqueId) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.uniqueId !== uniqueId
      );
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),

  updateQuantity: (uniqueId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.uniqueId === uniqueId ? { ...cartItem, quantity } : cartItem
      );
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
}));
