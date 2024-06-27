import Image from 'next/image';
import Link from 'next/link';
import {format} from 'date-fns';
import Layout from '@/components/layout';
import Breadcrumb from '@/components/breadcrumb';
import styles from '@/styles/dashboard.module.css';
import {getNotifications, getOrders, getSummary} from '@/api';
import {getStatusColor} from '@/helpers';
import {NotificationStatusFilter, OrderStatusFilter} from '@/components/tabs';
import NotificationItems from '@/components/notification';

export const revalidate = 0;

export default async function Dashboard({
  searchParams: {order, notification},
}: {
  searchParams: {order: string | null; notification: string | null};
}) {
  const summary = await getSummary();
  const orders = await getOrders({status: order});
  const notifications = await getNotifications({status: notification});

  return (
    <Layout breadcrumb={<Breadcrumb items={[{label: 'Dashboard'}]} />}>
      <section className={styles.cards}>
        <div className={styles.card}>
          <p>Completed Orders</p>
          <h2>{summary.totalCompletedOrders}</h2>
        </div>
        <div className={styles.card}>
          <p>Active Orders</p>
          <h2>{summary.totalActiveOrders}</h2>
        </div>
        <div className={styles.card}>
          <p>Revenue</p>
          <h2>${summary.totalRevenue.toLocaleString()}</h2>
        </div>
        <div className={styles.card}>
          <p>Customers</p>
          <h2>{summary.uniqueCustomers}</h2>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.recentOrders}>
          <p className={styles.recentOrdersTitle}>Recent Orders</p>

          <OrderStatusFilter
            allOrdersLength={summary.totalOrders}
            completedOrdersLength={summary.totalCompletedOrders}
            activeOrdersLength={summary.totalActiveOrders}
            notStartedOrdersLength={summary.totalNotStartedOrders}
          />

          <div className={styles.ordersGroup}>
            {orders.orders.map(order => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className={styles.order}
              >
                <div className={styles.productDetails}>
                  <Image
                    src={order.items[0].imageUrl}
                    alt={order.items[0].name}
                    width={120}
                    height={75}
                    className={styles.productImage}
                  />
                  <div>
                    <p>
                      Order by {order.customerName} on{' '}
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </p>
                    <div className={styles.subDetails}>
                      <div
                        className={`${styles.status} ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </div>
                      <div className={styles.dot} />
                      <p>Order #{order.id}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.orderDetails}>
                  <p className={styles.orderQuantity}>
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items
                  </p>
                  <p className={styles.orderTotal}>
                    ${order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.notifications}>
          <p className={styles.notificationTitle}>Notifications</p>

          <NotificationStatusFilter
            allNotificationsLength={summary.totalNotifications}
            unreadNotificationsLength={summary.totalUnreadNotifications}
            readNotificationsLength={
              summary.totalNotifications - summary.totalUnreadNotifications
            }
          />

          <NotificationItems notifications={notifications} />
        </section>
      </div>
    </Layout>
  );
}
