import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {format} from 'date-fns';
import EditOrderForm from '@/components/edit-order-form';
import {mockOrderItems, mockOrder} from '@/mocks/data';
import {Order, OrderItem} from '@/types';
import {updateOrder} from '@/api';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock updateOrder API call
jest.mock('@/api', () => ({
  updateOrder: jest.fn(),
}));

const queryClient = new QueryClient();

const renderComponent = (order: Order, items: OrderItem[]) =>
  render(
    <QueryClientProvider client={queryClient}>
      <EditOrderForm order={order} items={items} />
    </QueryClientProvider>,
  );

describe('EditOrderForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('renders form elements with pre-filled values', () => {
    renderComponent(mockOrder, mockOrderItems);

    expect(screen.getByLabelText('Customer name')).toHaveValue(
      mockOrder.customerName,
    );
    expect(screen.getByLabelText('Estimated delivery date')).toHaveValue(
      format(new Date(mockOrder.estimatedDelivery), 'MM/dd/yyyy'),
    );
    expect(screen.getByLabelText('Delivery address')).toHaveValue(
      mockOrder.shippingAddress,
    );
    expect(screen.getByLabelText('Delivery price')).toHaveValue(
      mockOrder.shippingFee,
    );
    expect(screen.getByLabelText('Discount (if any)')).toHaveValue(
      mockOrder.discount,
    );
    expect(screen.getByLabelText('Tax (if any)')).toHaveValue(mockOrder.tax);

    mockOrder.items.forEach((item, index) => {
      expect(screen.getByTestId(`items.${index}.name`)).toHaveValue(item.name);
      expect(screen.getByTestId(`items.${index}.quantity`)).toHaveValue(
        item.quantity,
      );
    });
  });

  test('validates required fields', async () => {
    renderComponent(mockOrder, mockOrderItems);

    fireEvent.change(screen.getByLabelText('Customer name'), {
      target: {value: ''},
    });
    fireEvent.change(screen.getByLabelText('Delivery address'), {
      target: {value: ''},
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('Customer name is required')).toBeInTheDocument();
      expect(
        screen.getByText('Delivery address is required'),
      ).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    renderComponent(mockOrder, mockOrderItems);

    fireEvent.change(screen.getByLabelText('Customer name'), {
      target: {value: 'John Doe'},
    });
    fireEvent.change(screen.getByLabelText('Delivery address'), {
      target: {value: '123 Main St'},
    });
    fireEvent.change(screen.getByLabelText('Estimated delivery date'), {
      target: {value: '2024-07-06T00:00:00.000Z'},
    });
    fireEvent.change(screen.getByTestId('items.0.name'), {
      target: {value: mockOrderItems[0].name},
    });
    fireEvent.change(screen.getByTestId('items.0.quantity'), {
      target: {value: mockOrderItems[0].quantity},
    });

    const submitButton = screen.getByRole('button', {name: 'Save'});
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(updateOrder).toHaveBeenCalledWith(
        mockOrder.id,
        expect.any(Object),
      );
    });
  });
});
