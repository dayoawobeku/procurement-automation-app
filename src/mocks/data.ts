import {Order, OrderItem} from '@/types';

export const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Item 1',
    price: 10,
    quantity: 1,
    imageUrl: 'https://example.com/item1.jpg',
  },
  {
    id: '2',
    name: 'Item 2',
    price: 20,
    quantity: 2,
    imageUrl: 'https://example.com/item2.jpg',
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    estimatedDelivery: '2023-06-15T12:00:00Z',
    shippingAddress: '123 Main St, Anytown, USA',
    billingAddress: '123 Main St, Anytown, USA',
    items: mockOrderItems,
    shippingFee: 5,
    discount: 2,
    tax: 3,
    totalAmount: 56,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: '2023-06-10T12:00:00Z',
    updatedAt: '2023-06-10T12:00:00Z',
    shippingMethod: 'Standard Shipping',
    trackingNumber: '123456',
  },
];

export const mockOrder: Order = mockOrders[0];
