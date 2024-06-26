'use client';

import Breadcrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import styles from '@/styles/createOrder.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IFormInput {
  customerName: string;
  deliveryDate: string;
  address: string;
  itemName: string;
  quantity: number;
  deliveryPrice: number;
  discount: number;
  tax: number;
  totalAmount: number;
}

export default function CreateOrder() {
  const {register, handleSubmit} = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  return (
    <Layout
      breadcrumb={
        <Breadcrumb
          items={[
            {label: 'Orders', link: '/orders'},
            {label: 'Create new order'},
          ]}
        />
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createOrderContainer}
      >
        <section className={styles.createOrderForm}>
          <div className={styles.createFormHeader}>
            <h1 className={styles.createOrderFormTitle}>Create new order</h1>
            <button className={styles.resetOrder}>Clear</button>
          </div>

          <section className={styles.createOrderFormContainer}>
            <div className={styles.formGroup}>
              <div className={styles.grid}>
                <label
                  htmlFor="customer_name"
                  className={styles.createOrderFormLabel}
                >
                  Customer name
                  <input
                    type="text"
                    className={styles.createOrderFormInput}
                    {...register('customerName', {required: true})}
                    id="customer_name"
                  />
                </label>
                <label
                  htmlFor="delivery_date"
                  className={styles.createOrderFormLabel}
                >
                  Delivery date
                  <input
                    type="text"
                    className={styles.createOrderFormInput}
                    {...register('deliveryDate', {required: true})}
                    id="delivery_date"
                  />
                </label>
              </div>
              <label htmlFor="address" className={styles.createOrderFormLabel}>
                Delivery address
                <input
                  type="text"
                  className={styles.createOrderFormInput}
                  {...register('address', {required: true})}
                  id="address"
                />
              </label>
              <div className={styles.itemContainer}>
                <div className={styles.grid}>
                  <label
                    htmlFor="item_name"
                    className={styles.createOrderFormLabel}
                  >
                    Item name
                    <select
                      className={styles.createOrderFormInput}
                      id="item_name"
                      {...register('itemName', {required: true})}
                    >
                      <option value="" disabled selected>
                        Select an item
                      </option>
                      <option value="Apple MacBook Pro 13-inch">
                        Apple MacBook Pro 13-inch
                      </option>
                      <option value="Samsung Galaxy S21">
                        Samsung Galaxy S21
                      </option>
                      <option value="Office Chair">Office Chair</option>
                    </select>
                  </label>
                  <label
                    htmlFor="quantity"
                    className={styles.createOrderFormLabel}
                  >
                    Quantity
                    <input
                      type="number"
                      className={styles.createOrderFormInput}
                      {...register('quantity', {required: true})}
                      id="quantity"
                    />
                  </label>
                </div>

                <button className={styles.addAnotherItem}>
                  <Image src="/plus.svg" alt="plus" width={18} height={18} />
                  Add another item
                </button>
              </div>

              <div className={styles.grid}>
                <label
                  htmlFor="delivery_price"
                  className={styles.createOrderFormLabel}
                >
                  Delivery price
                  <input
                    placeholder="2,000"
                    type="text"
                    className={styles.createOrderFormInput}
                    id="delivery_price"
                    {...register('deliveryPrice', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </label>
                <label
                  htmlFor="discount"
                  className={styles.createOrderFormLabel}
                >
                  Discount (if any)
                  <input
                    placeholder="2,000"
                    type="text"
                    className={styles.createOrderFormInput}
                    id="discount"
                    {...register('discount', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </label>
                <label htmlFor="tax" className={styles.createOrderFormLabel}>
                  Tax (if any)
                  <input
                    placeholder="2,000"
                    type="text"
                    className={styles.createOrderFormInput}
                    id="tax"
                    {...register('tax', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </label>
                <label
                  htmlFor="total_amount"
                  className={styles.createOrderFormLabel}
                >
                  Total amount
                  <input
                    placeholder="2,000"
                    type="text"
                    className={styles.createOrderFormInput}
                    id="total_amount"
                    {...register('totalAmount', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </label>
              </div>
            </div>
          </section>
        </section>
        <section className={styles.createOrderSummary}>
          <p className={styles.createOrderContainerTitle}>Order summary</p>

          <div className={styles.orderSummaryCard}>
            <div className={styles.orderSummaryItem}>
              <p>Sub total</p>
              <h3>$5,000</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Discount</p>
              <h3>$0</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Taxes</p>
              <h3>$0</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Shipping</p>
              <h3>${(100.45).toLocaleString()}</h3>
            </div>
            <div className={styles.orderSummaryItem}>
              <p>Total Amount</p>
              <h3>$5,500</h3>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.createOrderButton}>
              Create order
            </button>
            <Link
              href="/orders"
              type="submit"
              className={styles.cancelOrderButton}
            >
              Cancel
            </Link>
          </div>
        </section>
      </form>
    </Layout>
  );
}
