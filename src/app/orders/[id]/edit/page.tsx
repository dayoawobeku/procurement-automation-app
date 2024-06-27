import Breadcrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import {getItems, getOrder} from '@/api';
import EditOrderForm from '@/components/edit-order-form';

export const revalidate = 0;

export default async function EditOrder({
  params: {id},
}: {
  params: {id: string};
}) {
  const order = await getOrder(id);
  const items = await getItems();

  return (
    <Layout
      breadcrumb={
        <Breadcrumb
          items={[
            {label: 'Orders', link: '/orders'},
            {label: `Edit order #${order.id}`},
          ]}
        />
      }
    >
      <EditOrderForm items={items} order={order} />
    </Layout>
  );
}
