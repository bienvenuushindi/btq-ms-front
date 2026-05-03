import dynamic from 'next/dynamic';

const SuppliersPage = dynamic(() => import('@/components/pages/dashboard/SuppliersPage'), {
  ssr: false
});

export default function Suppliers() {
  return <SuppliersPage />;
}
