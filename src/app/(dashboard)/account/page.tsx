import dynamic from 'next/dynamic';

const AccountPage = dynamic(() => import('@/components/account/AccountPage'), {
  ssr: false,
});

export default function Account() {
  return <AccountPage />;
}
