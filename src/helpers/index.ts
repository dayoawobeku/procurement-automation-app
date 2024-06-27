import styles from '@/styles/status.module.css';

export function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return styles.completed;
    case 'shipped':
      return styles.shipped;
    case 'pending':
      return styles.pending;
    case 'cancelled':
      return styles.cancelled;
    default:
      return '';
  }
}
