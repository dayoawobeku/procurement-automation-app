'use client';

import {useRouter} from 'next/navigation';
import {format} from 'date-fns';
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styles from '@/styles/dashboard.module.css';
import {Notification} from '@/types';
import {updateNotificationStatus} from '@/api';

export default function NotificationItems({
  notifications,
}: {
  notifications: Notification[];
}) {
  const router = useRouter();

  const {mutate} = useMutation({
    mutationFn: ({id, status}: {id: string; status: 'read' | 'unread'}) =>
      updateNotificationStatus(id, status),
    onError: error => {
      toast.error((error as Error).message);
    },
  });

  const handleNotificationClick = (id: string) => {
    mutate({id, status: 'read'});
    router.refresh();
  };

  return (
    <div className={styles.notificationsGroup}>
      {notifications.map(notification => (
        <button
          key={notification.id}
          className={`${styles.notification}`}
          onClick={() => handleNotificationClick(notification.id)}
        >
          {notification.status === 'unread' && (
            <div className={styles.notificationDot} />
          )}
          <p className={styles.notificationContent}>{notification.message}</p>
          <p className={styles.notificationTime}>
            {format(new Date(notification.createdAt), 'MMM dd, yyyy')}
          </p>
        </button>
      ))}
    </div>
  );
}
