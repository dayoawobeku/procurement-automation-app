import {z} from 'zod';

export const orderSchema = z.object({
  customerName: z.string().min(1, {message: 'Customer name is required'}),
  estimatedDelivery: z.string().min(1, {message: 'Delivery date is required'}),
  shippingAddress: z.string().min(1, {message: 'Delivery address is required'}),
  items: z.array(
    z.object({
      name: z.string().min(1, {message: 'Item is required'}),
      quantity: z
        .union([z.number().int().positive().min(1), z.nan()])
        .optional(),
    }),
  ),
  shippingFee: z
    .union([z.number().int().positive().min(1), z.nan()])
    .optional(),
  discount: z.number().optional(),
  tax: z.number().optional(),
});
