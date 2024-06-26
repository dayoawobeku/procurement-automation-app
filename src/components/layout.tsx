'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/layout.module.css';

export default function Layout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname === '/dashboard';
  const isOrders = pathname.includes('/orders');

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav>
          <Image src="/barrel-logo.svg" alt="logo" width={137} height={40} />
          <ul className={styles.nav}>
            <li className={isDashboard ? styles.active : ''}>
              <Link href="/dashboard">
                <Image src="/dashboard.svg" alt="logo" width={18} height={18} />
                Dashboard
              </Link>
            </li>
            <li className={isOrders ? styles.active : ''}>
              <Link href="/orders">
                <Image src="/orders.svg" alt="logo" width={18} height={18} />
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className={styles.content}>
        <header className={styles.header}>
          {breadcrumb}

          <Image src="/avatar.png" alt="user" width={32} height={32} />
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
