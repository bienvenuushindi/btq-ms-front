'use client';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import {useCategories} from '@/app/hooks/useCategories';
import CategoriesTable from '@/components/categories/CategoriesTable';
import CategoriesHeader from '@/components/categories/CategoriesHeader';

export default function Categories() {
  const {categories, meta, links, error, isLoading,mutate} = useCategories();
  console.log(categories);
  return (
    <Container>
      <CategoriesHeader revalidate={mutate}/>
      <ContainerOne>
        {isLoading && !error ? (<div>Loading...</div>) :
          error ? <div>Failed to load</div> :
            <div className="w-full">
               <CategoriesTable categories={categories}/>
            </div>}
      </ContainerOne>
    </Container>
  );
}