'use client'
import React from 'react';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import Card from '@/components/Card';
import {useFetcher} from '@/app/hooks/useFetcher';


export default function Account(){
  const {data} = useFetcher('/current_user')
  console.log(data)
  return (
    <Container>
      <ContainerOne>
        <h4 className="text-2xl font-bold">Account</h4>
        <div className="flex gap-2 w-full">
          <Card className="w-1/4">avatar</Card>
          <Card className="w-3/4">info</Card>
        </div>
      </ContainerOne>
    </Container>
  )
};
