export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  shippingAddress: string;
  billingAddress: string;
  items: OrderItem[];
  status: 'completed' | 'shipped' | 'pending' | 'cancelled';
  totalAmount: number;
  tax: number;
  discount: number;
  shippingFee: number;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface OrdersApiResponse {
  orders: Order[];
  page: number;
  limit: number;
  totalPages: number;
  totalOrders: number;
  totalCompletedOrders: number;
  activeOrdersLength: number;
  notStartedOrdersLength: number;
}

export interface Summary {
  totalOrders: number;
  totalCompletedOrders: number;
  totalActiveOrders: number;
  totalNotStartedOrders: number;
  totalRevenue: number;
  totalNotifications: number;
  totalUnreadNotifications: number;
  uniqueCustomers: number;
}

export interface Notification {
  id: string;
  message: string;
  status: 'read' | 'unread';
  createdAt: string;
}
