'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import styles from '@/styles/dashboard.module.css';

interface FilterButtonGroupProps {
  filters: {label: string; value: string | null; count: number}[];
  queryParam: string;
}

interface OrderStatusProps {
  allOrdersLength: number;
  completedOrdersLength: number;
  activeOrdersLength: number;
  notStartedOrdersLength: number;
}

interface NotificationStatusProps {
  allNotificationsLength: number;
  unreadNotificationsLength: number;
  readNotificationsLength: number;
}

const FilterButtonGroup = ({filters, queryParam}: FilterButtonGroupProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterClick = (value: string | null) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set(queryParam, value || 'all');

    searchParams.forEach((value, key) => {
      if (key !== queryParam) {
        newSearchParams.set(key, value);
      }
    });

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className={styles.buttonGroup}>
      {filters.map(filter => (
        <button
          key={filter.value}
          className={
            searchParams.get(queryParam) === filter.value ? styles.active : ''
          }
          onClick={() => handleFilterClick(filter.value)}
        >
          {filter.label} <span>{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export const OrderStatusFilter = ({
  allOrdersLength,
  completedOrdersLength,
  activeOrdersLength,
  notStartedOrdersLength,
}: OrderStatusProps) => {
  const filters = [
    {label: 'All', value: null, count: allOrdersLength},
    {label: 'Completed', value: 'completed', count: completedOrdersLength},
    {label: 'Active', value: 'shipped', count: activeOrdersLength},
    {label: 'Not started', value: 'pending', count: notStartedOrdersLength},
  ];

  return <FilterButtonGroup filters={filters} queryParam="order" />;
};

export const NotificationStatusFilter = ({
  allNotificationsLength,
  unreadNotificationsLength,
  readNotificationsLength,
}: NotificationStatusProps) => {
  const filters = [
    {label: 'All', value: null, count: allNotificationsLength},
    {label: 'Unread', value: 'unread', count: unreadNotificationsLength},
    {label: 'Read', value: 'read', count: readNotificationsLength},
  ];

  return <FilterButtonGroup filters={filters} queryParam="notification" />;
};
