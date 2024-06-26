import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout';
import Breadcrumb from '@/components/breadcrumb';
import styles from '@/styles/orders.module.css';

export default function Orders() {
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123456</td>
            <td>Apple MacBook Pro 13-inch</td>
            <td>10</td>
            <td>
              <div className={`${styles.status} ${styles.completed}`}>
                Completed
              </div>
            </td>
            <td className={styles.bold}>$3000</td>
            <td>
              <Link href="/orders/123456" className={styles.view}>
                <Image src="/eye.svg" alt="view" width={18} height={18} />
              </Link>
            </td>
          </tr>
          <tr>
            <td>123457</td>
            <td>Samsung Galaxy S21</td>
            <td>5</td>
            <td>
              <div className={`${styles.status} ${styles.shipped}`}>
                shipped
              </div>
            </td>
            <td className={styles.bold}>$4000</td>
            <td>
              <Link href="/orders/123456" className={styles.view}>
                <Image src="/eye.svg" alt="view" width={18} height={18} />
              </Link>
            </td>
          </tr>
          <tr>
            <td>123458</td>
            <td>Office Chair</td>
            <td>20</td>
            <td>
              <div className={`${styles.status} ${styles.pending}`}>
                Pending
              </div>
            </td>
            <td className={styles.bold}>$1000</td>
            <td>
              <Link href="/orders/123456" className={styles.view}>
                <Image src="/eye.svg" alt="view" width={18} height={18} />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
