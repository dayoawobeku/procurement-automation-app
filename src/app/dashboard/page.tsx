import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout';
import Breadcrumb from '@/components/breadcrumb';
import styles from '@/styles/dashboard.module.css';

export default function Dashboard() {
  return (
    <Layout breadcrumb={<Breadcrumb items={[{label: 'Dashboard'}]} />}>
      <section className={styles.cards}>
        <div className={styles.card}>
          <p>Completed Orders</p>
          <h2>10</h2>
        </div>
        <div className={styles.card}>
          <p>Active Orders</p>
          <h2>5</h2>
        </div>
        <div className={styles.card}>
          <p>Revenue</p>
          <h2>$500</h2>
        </div>
        <div className={styles.card}>
          <p>Customers</p>
          <h2>10</h2>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.recentOrders}>
          <p className={styles.recentOrdersTitle}>Recent Orders</p>

          <div className={styles.buttonGroup}>
            <button className={styles.active}>
              All <span>10</span>
            </button>
            <button>
              Completed <span>10</span>
            </button>
            <button>
              Active <span>10</span>
            </button>
            <button>
              Not started <span>10</span>
            </button>
          </div>

          <div className={styles.ordersGroup}>
            <Link href="/orders/1" className={styles.order}>
              <div className={styles.productDetails}>
                <Image
                  src="https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg"
                  alt="product"
                  width={120}
                  height={75}
                  className="rounded-lg"
                />
                <div>
                  <p>Apple MacBook Pro 13-inch</p>
                  <div className={styles.subDetails}>
                    <div className={`${styles.status} ${styles.completed}`}>
                      complete
                    </div>
                    <div className={styles.dot} />
                    <p>Order #123456</p>
                  </div>
                </div>
              </div>
              <div className={styles.orderDetails}>
                <p className={styles.orderQuantity}>10 x $300</p>
                <p className={styles.orderTotal}>$3000</p>
              </div>
            </Link>
            <Link href="/orders/1" className={styles.order}>
              <div className={styles.productDetails}>
                <Image
                  src="https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg"
                  alt="product"
                  width={120}
                  height={75}
                  className="rounded-lg"
                />
                <div>
                  <p>Apple MacBook Pro 13-inch</p>
                  <div className={styles.subDetails}>
                    <div className={`${styles.status} ${styles.shipped}`}>
                      shipped
                    </div>
                    <div className={styles.dot} />
                    <p>Order #123456</p>
                  </div>
                </div>
              </div>
              <div className={styles.orderDetails}>
                <p className={styles.orderQuantity}>10 x $300</p>
                <p className={styles.orderTotal}>$3000</p>
              </div>
            </Link>
            <Link href="/orders/1" className={styles.order}>
              <div className={styles.productDetails}>
                <Image
                  src="https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg"
                  alt="product"
                  width={120}
                  height={75}
                  className="rounded-lg"
                />
                <div>
                  <p>Apple MacBook Pro 13-inch</p>
                  <div className={styles.subDetails}>
                    <div className={`${styles.status} ${styles.pending}`}>
                      pending
                    </div>
                    <div className={styles.dot} />
                    <p>Order #123456</p>
                  </div>
                </div>
              </div>
              <div className={styles.orderDetails}>
                <p className={styles.orderQuantity}>10 x $300</p>
                <p className={styles.orderTotal}>$3000</p>
              </div>
            </Link>
            <Link href="/orders/1" className={styles.order}>
              <div className={styles.productDetails}>
                <Image
                  src="https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg"
                  alt="product"
                  width={120}
                  height={75}
                  className="rounded-lg"
                />
                <div>
                  <p>Apple MacBook Pro 13-inch</p>
                  <div className={styles.subDetails}>
                    <div className={`${styles.status} ${styles.cancelled}`}>
                      cancelled
                    </div>
                    <div className={styles.dot} />
                    <p>Order #123456</p>
                  </div>
                </div>
              </div>
              <div className={styles.orderDetails}>
                <p className={styles.orderQuantity}>10 x $300</p>
                <p className={styles.orderTotal}>$3000</p>
              </div>
            </Link>
          </div>
        </section>

        <section className={styles.notifications}>
          <p className={styles.notificationTitle}>Notifications</p>

          <div className={styles.buttonGroup}>
            <button className={styles.active}>
              All <span>10</span>
            </button>
            <button>
              Unread <span>10</span>
            </button>
            <button>
              Read <span>10</span>
            </button>
          </div>

          <div className={styles.notificationsGroup}>
            <button className={`${styles.notification}`}>
              <div className={styles.notificationDot} />
              <p className={styles.notificationContent}>
                Order #123456 has been completed
              </p>
              <p className={styles.notificationTime}>2 hours ago</p>
            </button>
            <button className={`${styles.notification}`}>
              <div className={styles.notificationDot} />
              <p className={styles.notificationContent}>
                Order #123456 has been completed
              </p>
              <p className={styles.notificationTime}>2 hours ago</p>
            </button>
            <button className={`${styles.notification}`}>
              <div className={styles.notificationDot} />
              <p className={styles.notificationContent}>
                Order #123456 has been completed
              </p>
              <p className={styles.notificationTime}>2 hours ago</p>
            </button>
            <button className={`${styles.notification}`}>
              <div className={styles.notificationDot} />
              <p className={styles.notificationContent}>
                Order #123456 has been completed
              </p>
              <p className={styles.notificationTime}>2 hours ago</p>
            </button>
            <button className={`${styles.notification}`}>
              <div className={styles.notificationDot} />
              <p className={styles.notificationContent}>
                Order #123456 has been completed
              </p>
              <p className={styles.notificationTime}>2 hours ago</p>
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
