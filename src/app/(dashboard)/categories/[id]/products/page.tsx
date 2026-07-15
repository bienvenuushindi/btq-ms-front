'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {ArrowLeft} from 'react-feather';
import Container from '@/components/utils/wrappers/Container';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import ProductsTable from '@/components/products/ProductsTable';
import ProtectedRoute from '@/components/ProtectedRoute';
import TransitionLink from '@/components/navigation/TransitionLink';
import {useFetcher} from '@/app/hooks/useFetcher';
import {API_ENDPOINTS} from '@/lib/api';

const metricValue = (value: any) => value ?? 0;

export default function CategoryProductsPage() {
  const params = useParams();
  const categoryId = params.id?.toString();
  const {data: category = {}} = useFetcher(categoryId ? API_ENDPOINTS.CATEGORY_BY_ID(categoryId) : null);
  const categoryName = category?.name || 'Category';
  const selectedVariants = metricValue(category?.selected_variants_count);
  const marketVariants = metricValue(category?.market_variants_count);

  return (
    <ProtectedRoute>
      <Container>
        <ContainerOne>
          <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.04)] sm:rounded-[24px] sm:px-5 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.28em]">Category variants</p>
                <h1 className="mt-1 break-words font-display text-xl font-bold text-slate-900 sm:text-2xl">{categoryName}</h1>
              </div>
              <TransitionLink
                href="/categories"
                loadingMessage="Opening categories..."
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft size={14}/>
                Categories
              </TransitionLink>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 sm:rounded-[18px] sm:px-4 sm:py-3">
                <p className="text-xs font-semibold text-emerald-700">Selected in shop</p>
                <p className="mt-1 font-display text-2xl font-bold text-emerald-800 sm:text-3xl">{selectedVariants}</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-sky-50 px-3 py-2.5 sm:rounded-[18px] sm:px-4 sm:py-3">
                <p className="text-xs font-semibold text-sky-700">Available on market</p>
                <p className="mt-1 font-display text-2xl font-bold text-sky-800 sm:text-3xl">{marketVariants}</p>
              </div>
            </div>
          </div>
        </ContainerOne>
        <ContainerOne>
          <ProductsTable initialCategoryId={categoryId} categoryFilterLocked/>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
