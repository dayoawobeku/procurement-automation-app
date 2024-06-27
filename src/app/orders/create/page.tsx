import Breadcrumb from '@/components/breadcrumb';
import Layout from '@/components/layout';
import CreateOrderForm from '@/components/create-order-form';
import {getItems} from '@/api';

export default async function CreateOrder() {
  const items = await getItems();

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
      <CreateOrderForm items={items} />
    </Layout>
  );
}
