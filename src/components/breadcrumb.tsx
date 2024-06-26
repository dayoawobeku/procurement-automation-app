import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/breadcrumb.module.css';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

export default function Breadcrumb({items}: {items: BreadcrumbItem[]}) {
  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbContainer}>
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <Link className={styles.breadcrumbItem} href={item.link}>
                {item.label}
              </Link>
            ) : (
              <p className={styles.breadcrumbItem}>{item.label}</p>
            )}
            {index !== items.length - 1 && (
              <Image
                src="/chevron-right.svg"
                alt="right arrow"
                width={14}
                height={14}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
