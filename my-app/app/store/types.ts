// store/types.ts

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
  img: string | null;
  isAuthenticated: boolean;
}
export interface CartState {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// הטיפוס עבור כל ה-state של האפליקציה (store)
export interface RootState {
  user: UserState;
  cart: CartState
}

