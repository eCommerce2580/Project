// Cart item type
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// Cart state type
// export interface CartState {
//   items: CartItem[]; // ריבוי פריטים בעגלת הקניות
// }

// // טיפוס לכל ה-state של האפליקציה (store)
// export interface RootState {
//   user: UserState;
//   cart: CartState;
// }


export interface FormData {
  name: string;
  email: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  addressId?: string;
}

// User state type
export type UserAddress = {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  addressId?: string; // אופציונלי
};

export type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
  address: UserAddress | null; // שים לב לעדכון כאן
  img: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
} | undefined;

// ...

// SessionUser type
export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null | undefined;
  passwordSet?: boolean;
  isVerified?: boolean;
  address?: UserAddress | null; // התאם את הסוגים
  employee?: {
    id: string;
    businessId: string;
    business: {
      id: string;
      name: string;
      logo: string;
      phone: string;
      email: string;
    };
  } | null;
};
