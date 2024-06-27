import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout';
import Breadcrumb from '@/components/breadcrumb';
import styles from '@/styles/orders.module.css';
import {getOrders} from '@/api';
import {getStatusColor} from '@/helpers';
import DeleteOrder from '@/components/delete-order';

export const revalidate = 0;

export default async function Orders() {
  const orders = await getOrders();

  return (
    <Layout breadcrumb={<Breadcrumb items={[{label: 'Orders'}]} />}>
      <div className={styles.header}>
        <p className={styles.title}>All orders</p>
        <Link href="/orders/create" className={styles.createOrder}>
          Create Order
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item(s)</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Total</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.items.map((item, index) => (
                  <span key={item.id}>
                    {item.name} ({item.quantity})
                    {index < order.items.length - 1 && ', '}
                  </span>
                ))}
              </td>
              <td>
                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
              </td>
              <td>
                <div
                  className={`${styles.status} ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </div>
              </td>
              <td className={styles.bold}>
                ${order.totalAmount?.toLocaleString()}
              </td>
              <td>
                <Link
                  title="View order details"
                  href={`/orders/${order.id}`}
                  className={styles.view}
                >
                  <Image src="/eye.svg" alt="view" width={18} height={18} />
                </Link>
              </td>
              <td>
                <DeleteOrder id={order.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
