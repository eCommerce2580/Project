// store/types.ts

// User state type
export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
  image: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;  // הוספת isVerified ל-user state
}

// Cart item type
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// Cart state type
export interface CartState {
  items: CartItem[]; // ריבוי פריטים בעגלת הקניות
}

// טיפוס לכל ה-state של האפליקציה (store)
export interface RootState {
  user: UserState;
  cart: CartState;
}
