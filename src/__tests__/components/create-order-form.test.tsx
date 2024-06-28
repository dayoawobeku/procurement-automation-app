import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CreateOrderForm from '@/components/create-order-form';
import {mockOrderItems} from '@/mocks/data';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <CreateOrderForm items={mockOrderItems} />
    </QueryClientProvider>,
  );

describe('CreateOrderForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('renders form elements', () => {
    renderComponent();

    expect(screen.getByLabelText(/Customer name/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText('Estimated delivery date'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Delivery address')).toBeInTheDocument();
    expect(screen.getByLabelText('Item name')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Delivery price')).toBeInTheDocument();
    expect(screen.getByLabelText('Discount (if any)')).toBeInTheDocument();
    expect(screen.getByLabelText('Tax (if any)')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Create order'));

    await waitFor(() => {
      expect(screen.getByText('Customer name is required')).toBeInTheDocument();
      expect(screen.getByText('Delivery date is required')).toBeInTheDocument();
      expect(
        screen.getByText('Delivery address is required'),
      ).toBeInTheDocument();
      expect(screen.getByText('Item is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    renderComponent();

    fireEvent.input(screen.getByLabelText('Customer name'), {
      target: {value: 'John Doe'},
    });
    fireEvent.input(screen.getByLabelText('Delivery address'), {
      target: {value: '123 Main St'},
    });
    fireEvent.input(screen.getByLabelText('Estimated delivery date'), {
      value: '2024-07-06T00:00:00.000Z',
    });
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: {value: mockOrderItems[0].name},
    });

    const submitButton = screen.getByRole('button', {name: 'Create order'});
    fireEvent.submit(submitButton);
  });
});
