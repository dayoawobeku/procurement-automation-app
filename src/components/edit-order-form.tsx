'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import DatePicker from 'react-datepicker';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {z} from 'zod';
import {useMutation} from '@tanstack/react-query';
import {zodResolver} from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import styles from '@/styles/createOrder.module.css';
import {Order, OrderItem} from '@/types';
import {orderSchema} from '@/schema';
import {updateOrder} from '@/api';

export default function EditOrderForm({
  items,
  order,
}: {
  items: OrderItem[];
  order: Order;
}) {
  const router = useRouter();
  const [startDate] = useState(new Date());

  const {mutate} = useMutation({
    mutationFn: (data: Order) => updateOrder(order.id, data),
    onSuccess: () => {
      toast.success(`Order #${order.id} updated successfully`);
      router.push('/orders');
      router.refresh();
    },
    onError: error => {
      toast.error((error as Error).message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    control,
    setValue,
    getValues,
  } = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: order.customerName,
      estimatedDelivery: order.estimatedDelivery,
      shippingAddress: order.shippingAddress,
      items: order.items,
      shippingFee: order.shippingFee,
      discount: order.discount,
      tax: order.tax,
    },
    values: {
      items: order.items,
      customerName: order.customerName,
      estimatedDelivery: order.estimatedDelivery,
      shippingAddress: order.shippingAddress,
      shippingFee: order.shippingFee,
      discount: order.discount,
      tax: order.tax,
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'items',
  });

  const {tax, discount, shippingFee, items: itemsSelected} = watch();

  const subTotal = itemsSelected.reduce((acc, item) => {
    const itemPrice = items.find(i => i.name === item.name)?.price || 0;
    return acc + itemPrice * (item.quantity ?? 0);
  }, 0);

  const totalAmount =
    subTotal + (tax || 0) + (shippingFee || 0) - (discount || 0);

  const onSubmit: SubmitHandler<z.infer<typeof orderSchema>> = data => {
    const currItems = data.items.map(item => {
      const itemSelected = items.find(i => i.name === item.name);
      return {
        id: itemSelected?.id,
        quantity: item.quantity,
      };
    });

    const dataToSend = {
      ...data,
      items: currItems,
    } as Order;

    mutate(dataToSend);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.createOrderContainer}
    >
      <section className={styles.createOrderForm}>
        <div className={styles.createFormHeader}>
          <h1 className={styles.createOrderFormTitle}>
            Edit Order #{order.id}
          </h1>
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
                  aria-invalid={errors.customerName ? 'true' : 'false'}
                />
                {errors.customerName && (
                  <p className={styles.error} role="alert">
                    {errors.customerName.message}
                  </p>
                )}
              </label>

              <label
                htmlFor="delivery_date"
                className={`${styles.createOrderFormLabel} ${styles.datePickerLabel} `}
              >
                <span>Estimated delivery date</span>
                <Controller
                  control={control}
                  name="estimatedDelivery"
                  render={({field}) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={date =>
                        setValue(
                          'estimatedDelivery',
                          date ? date.toISOString() : '',
                        )
                      }
                      className={styles.createOrderFormInput}
                      id="delivery_date"
                      aria-invalid={errors.estimatedDelivery ? 'true' : 'false'}
                      minDate={startDate}
                      wrapperClassName={styles.datePicker}
                    />
                  )}
                />
                {errors.estimatedDelivery && (
                  <p className={styles.error} role="alert">
                    {errors.estimatedDelivery.message}
                  </p>
                )}
              </label>
            </div>
            <label htmlFor="address" className={styles.createOrderFormLabel}>
              Delivery address
              <input
                type="text"
                className={styles.createOrderFormInput}
                {...register('shippingAddress', {required: true})}
                id="address"
                aria-invalid={errors.shippingAddress ? 'true' : 'false'}
              />
              {errors.shippingAddress && (
                <p className={styles.error} role="alert">
                  {errors.shippingAddress.message}
                </p>
              )}
            </label>

            {fields.map((item, index) => (
              <div key={item.id} className={styles.itemContainer}>
                <div className={styles.grid}>
                  <label
                    htmlFor={`items.${index}.name`}
                    className={styles.createOrderFormLabel}
                  >
                    Item name
                    <select
                      className={styles.createOrderFormInput}
                      id={`items.${index}.name`}
                      {...register(`items.${index}.name`, {required: true})}
                      defaultValue="DEFAULT"
                      data-testid={`items.${index}.name`}
                    >
                      <option value="DEFAULT" disabled>
                        Select an item
                      </option>
                      {items.map(item => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.items?.[index]?.name && (
                      <p className={styles.error} role="alert">
                        {errors.items[index]?.name?.message}
                      </p>
                    )}
                  </label>
                  <label
                    htmlFor={`items.${index}.quantity`}
                    className={styles.createOrderFormLabel}
                  >
                    Quantity
                    <input
                      type="number"
                      className={styles.createOrderFormInput}
                      {...register(`items.${index}.quantity`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                      id={`items.${index}.quantity`}
                      data-testid={`items.${index}.quantity`}
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className={styles.error} role="alert">
                        {errors.items[index]?.quantity?.message}
                      </p>
                    )}
                  </label>
                </div>
                {index === fields.length - 1 && (
                  <button
                    className={styles.addAnotherItem}
                    type="button"
                    onClick={() => append({name: '', quantity: 0})}
                  >
                    Add another item
                  </button>
                )}
                {index !== fields.length - 1 && (
                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className={styles.grid}>
              <label
                htmlFor="delivery_price"
                className={styles.createOrderFormLabel}
              >
                Delivery price
                <input
                  type="number"
                  className={styles.createOrderFormInput}
                  id="delivery_price"
                  {...register('shippingFee', {
                    required: true,
                    valueAsNumber: true,
                  })}
                  aria-invalid={errors.shippingFee ? 'true' : 'false'}
                  min="0"
                />
                {errors.shippingFee && (
                  <p className={styles.error} role="alert">
                    {errors.shippingFee.message}
                  </p>
                )}
              </label>
              <label htmlFor="discount" className={styles.createOrderFormLabel}>
                Discount (if any)
                <input
                  type="number"
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
                  type="number"
                  className={styles.createOrderFormInput}
                  id="tax"
                  {...register('tax', {
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
            <h3>${subTotal.toLocaleString()}</h3>
          </div>
          <div className={styles.orderSummaryItem}>
            <p>Discount</p>
            <h3>{discount ? `- $${discount.toLocaleString()}` : '$0'}</h3>
          </div>
          <div className={styles.orderSummaryItem}>
            <p>Taxes</p>
            <h3>{tax ? `$${tax.toLocaleString()}` : '$0'}</h3>
          </div>
          <div className={styles.orderSummaryItem}>
            <p>Shipping</p>
            <h3>{shippingFee ? `$${shippingFee.toLocaleString()}` : '$0'}</h3>
          </div>
          <div className={styles.orderSummaryItem}>
            <p>Total Amount</p>
            <h3>${totalAmount.toLocaleString()}</h3>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.createOrderButton}>
            Save
          </button>
          <Link
            href={`/orders/${order.id}`}
            className={styles.cancelOrderButton}
          >
            Cancel
          </Link>
        </div>
      </section>
    </form>
  );
}
