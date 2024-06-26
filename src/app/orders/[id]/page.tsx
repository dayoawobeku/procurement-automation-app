import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import styles from '@/styles/orderDetail.module.css';

export default function Order({params: {id}}: {params: {id: string}}) {
  const order = {
    id,
    date: '2023-06-20',
    customerName: 'John Doe',
    shippingAddress: '123 Main St, Anytown, USA',
    billingAddress: '123 Main St, Anytown, USA',
    items: [
      {
        name: 'Apple MacBook Pro 13-inch',
        quantity: 1,
        price: 1299,
        imageUrl:
          'https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg',
      },
      {
        name: 'Samsung Galaxy S21',
        quantity: 2,
        price: 799,
        imageUrl:
          'https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg',
      },
    ],
    status: 'Completed',
    paymentMethod: 'Credit Card',
    totalAmount: 2897,
    paymentStatus: 'Paid',
    shippingMethod: 'Standard Shipping',
    trackingNumber: '123456789',
    estimatedDelivery: '2023-06-25',
  };

  const subTotal = order.items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Layout
      breadcrumb={
        <Breadcrumb
          items={[{label: 'Orders', link: '/orders'}, {label: `#${order.id}`}]}
        />
      }
    >
      <div className={styles.orderDetailContainer}>
        <section className={styles.orderDetail}>
          <Image
            src="/package.svg"
            alt="package"
            width={56}
            height={56}
            className={styles.packageIcon}
          />
          <h1>Order #{order.id}</h1>
          <div className={`${styles.status} ${styles.completed}`}>
            Completed
          </div>

          <button className={styles.deleteOrder} title="Delete order">
            <Image src="/trash.svg" alt="delete order" width={18} height={18} />
          </button>
        </section>

        <section className={styles.deliveryDetailsContainer}>
          <div className={styles.deliveryDetails}>
            <p className={styles.orderSmallText}>Order Date</p>
            <p className={styles.orderLargeText}>Sept 20, 2023</p>
          </div>
          <div className={styles.deliveryDetails}>
            <p className={styles.orderSmallText}>Delivery Date</p>
            <p className={styles.orderLargeText}>Sept 20, 2023</p>
          </div>
          <div className={styles.deliveryDetails}>
            <p className={styles.orderSmallText}>Courier</p>
            <p className={`${styles.orderLargeText} ${styles.courier}`}>
              <Image src="/dhl.png" alt="dhl" width={18} height={18} />
              DHL Express
            </p>
          </div>
          <div className={styles.deliveryDetails}>
            <p className={styles.orderSmallText}>Address</p>
            <p className={styles.orderLargeText}>{order.shippingAddress}</p>
          </div>
        </section>

        <section className={styles.orderSummary}>
          <h2>Order Summary</h2>

          <div className={styles.orderSummaryCard}>
            <div className={styles.orderSummaryItem}>
              <p>Sub total</p>
              <h3>${subTotal.toLocaleString()}</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Discount</p>
              <h3>$0</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Shipping</p>
              <h3>${(100.45).toLocaleString()}</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Total Amount</p>
              <h3>${order.totalAmount.toLocaleString()}</h3>
            </div>
          </div>
        </section>

        <section className={styles.orderInfo}>
          <h2>Order Info</h2>

          <div className={styles.orderItemContainer}>
            {order.items.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <div className={styles.itemDetails}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={120}
                    height={75}
                  />
                  <p className={styles.itemName}>{item.name}</p>
                </div>
                <div className={styles.itemQuantityPrice}>
                  <h3>${item.price.toLocaleString()}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.orderActions}>
          <Link href={`/orders/${order.id}/edit`} className={styles.secondary}>
            Edit order
          </Link>
          <button className={styles.primary}>Print Invoice</button>
        </section>
      </div>
    </Layout>
  );
}
