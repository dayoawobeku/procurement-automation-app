'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styles from '@/styles/orderDetail.module.css';
import {deleteOrder} from '@/api';

export default function DeleteOrder({id}: {id: string}) {
  const router = useRouter();
  const {mutate} = useMutation({
    mutationFn: ({id}: {id: string}) => deleteOrder(id),
    onSuccess: () => {
      toast.success('Order deleted successfully');
      router.refresh();
    },
    onError: error => {
      toast.error((error as Error).message);
    },
  });

  const handleDeleteOrder = (id: string) => {
    mutate({id});
  };

  return (
    <button
      onClick={() => handleDeleteOrder(id)}
      className={styles.deleteOrder}
      title="Delete order"
    >
      <Image src="/trash.svg" alt="delete order" width={18} height={18} />
    </button>
  );
}
