import dynamic from 'next/dynamic';

const CategoriesTable = dynamic(() => import('@/components/categories/CategoriesTable'), {
  ssr: false
});

export default function Categories() {
  return <CategoriesTable />;
}
