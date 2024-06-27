import qs from 'qs';
import {
  Notification,
  Order,
  OrderItem,
  OrdersApiResponse,
  Summary,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getOrders(filters?: {
  status?: string | null;
  page?: number;
  limit?: number;
}): Promise<OrdersApiResponse> {
  try {
    const query = qs.stringify(
      {status: filters?.status !== 'all' ? filters?.status : undefined},
      {skipNulls: true},
    );

    const response = await fetch(
      `${API_BASE_URL}/orders${query ? `?${query}` : ''}`,

      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to get orders');
    }

    return response.json();
  } catch (error) {
    console.error('Error during getOrders:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function getOrder(id: string): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get order');
    }

    return response.json();
  } catch (error) {
    console.error('Error during getOrder:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function deleteOrder(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  } catch (error) {
    console.error('Error during deleteOrder:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function createOrder(order: Order): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  } catch (error) {
    console.error('Error during createOrder:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function updateOrder(id: string, order: Order): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to update order');
    }

    return response.json();
  } catch (error) {
    console.error('Error during updateOrder:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function getSummary(): Promise<Summary> {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get summary');
    }

    return response.json();
  } catch (error) {
    console.error('Error during getSummary:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function getNotifications(filters?: {
  status?: string | null;
}): Promise<Notification[]> {
  try {
    const query = qs.stringify(
      {status: filters?.status !== 'all' ? filters?.status : undefined},
      {skipNulls: true},
    );

    const response = await fetch(
      `${API_BASE_URL}/notifications${query ? `?${query}` : ''}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to get notifications');
    }

    return response.json();
  } catch (error) {
    console.error('Error during getNotifications:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function updateNotificationStatus(
  id: string,
  status: 'read' | 'unread',
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status}),
    });

    if (!response.ok) {
      throw new Error('Failed to update notification status');
    }
  } catch (error) {
    console.error('Error during updateNotificationStatus:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}

export async function getItems(): Promise<OrderItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get items');
    }

    return response.json();
  } catch (error) {
    console.error('Error during getItems:', error);
    throw new Error((error as Error).message || 'Something went wrong');
  }
}
