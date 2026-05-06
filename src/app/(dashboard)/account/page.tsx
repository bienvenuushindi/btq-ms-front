'use client';

import React from 'react';
import Container from '@/components/utils/wrappers/Container';
import {useFetcher} from '@/app/hooks/useFetcher';
import ProtectedRoute from '@/components/ProtectedRoute';
import {API_ENDPOINTS} from '@/lib/api';
import UserForm from '@/components/account/UserForm';
import Card from '@/components/utils/wrappers/Card';

export default function Account() {
  const {data: user, isLoading} = useFetcher(API_ENDPOINTS.CURRENT_USER);

  return (
    <ProtectedRoute>
      <Container>
        {isLoading || !user ? (
          <Card className="w-full border-slate-200/70 bg-white/95 p-6 text-sm text-slate-500">
            Loading profile...
          </Card>
        ) : (
          <UserForm user={user}/>
        )}
      </Container>
    </ProtectedRoute>
  );
}
