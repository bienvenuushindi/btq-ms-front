'use client';

import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from '@/components/Card';
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import {RequisitionInfoWrapper} from "@/components/requisitions/home-page/sections/RequisitionInfoWrapper";
import {RequisitionItemByDate} from "@/components/requisitions/home-page/RequisitionItemByDate";
import Text from "@/components/Text";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
    const [date, setDate] = useState<Date>(null);

    const onChange = (newDate: any) => {
        setDate(newDate);
    };
    return (
        <ProtectedRoute>
            <Container>
                <RequisitionsHeader/>
                <ContainerOne>
                    <div className="flex w-full gap-4 items-stretch bg-gray-100 py-4 px-2 rounded">
                        <Card className="w-1/4 bg-white flex-col flex gap-4">
                            <Text intent="secondary" size="small" className="font-semibold text-center">
                                Please select date to view requisitions for that day.
                            </Text>
                            <Calendar value={date} onChange={onChange} className="border-none border-0"/>
                        </Card>
                        <div className="w-3/4 flex flex-col gap-2">
                            {date && <RequisitionItemByDate date={date}/>}
                            <RequisitionInfoWrapper/>
                        </div>
                    </div>
                </ContainerOne>
                <ContainerOne>
                    <div className="gap-2 flex w-full">
                        <div className="w-1/4">
                        </div>
                        <div className="w-3/4 flex  gap-2">
                            <div className="w-1/2">
                                <ExpiredProductContainer title="Expired Soon" type="expiring_soon" limit={5}/>
                            </div>
                            <div className="w-1/2">
                                <ExpiredProductContainer title="Expired" type='expired' limit={5}/>
                            </div>
                        </div>
                    </div>
                </ContainerOne>
            </Container>
        </ProtectedRoute>
    );
}