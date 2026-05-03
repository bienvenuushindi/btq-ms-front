import dynamic from 'next/dynamic';

const RequisitionsPage = dynamic(() => import('@/components/pages/dashboard/RequisitionsPage'), {
  ssr: false
});

export default function Requisitions() {
  return <RequisitionsPage />;
}
