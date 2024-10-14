import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [], // רשימת מוצרים בעגלה
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // הוספת מוצר לעגלה
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // עדכון כמות מוצר בעגלה
    updateCartItemQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    // הסרת מוצר מהעגלה
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    // איפוס העגלה
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartItemQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
