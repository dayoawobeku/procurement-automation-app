import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {deleteOrder} from '@/api';
import DeleteOrder from '@/components/delete-order';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

// Mock deleteOrder API call
jest.mock('@/api', () => ({
  deleteOrder: jest.fn(),
}));

// Mock toast functions
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const queryClient = new QueryClient();

const renderComponent = (id: string) =>
  render(
    <QueryClientProvider client={queryClient}>
      <DeleteOrder id={id} />
    </QueryClientProvider>,
  );

describe('DeleteOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test('calls deleteOrder API and shows success message on button click', async () => {
    const mockId = '1';
    const mockRefresh = jest.fn();
    const {refresh} = jest.requireMock('next/navigation').useRouter();

    renderComponent(mockId);

    const button = screen.getByRole('button');
    fireEvent.click(button);
  });

  test('shows error message on deleteOrder API error', async () => {
    const mockId = '1';
    const mockError = new Error('Failed to delete order');
    (deleteOrder as jest.Mock).mockRejectedValueOnce(mockError);

    renderComponent(mockId);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(deleteOrder).toHaveBeenCalledWith(mockId);
      expect(toast.error).toHaveBeenCalledWith(mockError.message);
    });
  });
});
