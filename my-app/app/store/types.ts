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


// interface Product {
//   name: string;
//   price: number;
// };
// interface OrderItem {
//   id: string;
//   orderId: string;
//   productId: string;
//   quantity: number;
//   price: number;
//   product: Product;
// };

// interface PaymentMethod {
//   name: string;
// };

// interface OrderStatus {
//   name: string;
// };

// export interface Order {
//   id: string;
//   orderDate: Date;
//   totalAmount: number;
//   paymentMethodId: string;
//   shippingAddressId: string;
//   expectedDeliveryDate: Date;
//   userId: string;
//   statusId: string;
//   paymentMethod: PaymentMethod;
//   status: OrderStatus;
//   orderItems: OrderItem[];
// };