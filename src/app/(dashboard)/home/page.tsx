'use client';
import {format} from 'date-fns';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RequisitionItem from '@/components/requisitions/home-page/RequisitionItem';
import Card from '@/components/Card';
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import clsx from 'clsx';

export default function Home() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, setDate] = useState<Date>(tomorrow);

    const formattedDate = format(date, 'yyyy-MM-dd');

    const onChange = (newDate: any) => {
        setDate(newDate);
    };
    return (
        <Container>
            <RequisitionsHeader/>
            <ContainerOne>
                <div className="flex w-full gap-4 items-stretch">
                    <Card className="w-1/4">
                        <Calendar value={date} onChange={onChange} className="border-none border-0"/>
                    </Card>
                    <div className="w-3/4 flex flex-col gap-2">
                        <RequisitionItem date={new Date().getDate()} title="Today's Requisition"/>
                        <RequisitionItem date={date} title={clsx(formattedDate, "Requisition")}/>
                    </div>
                </div>
            </ContainerOne>
            <ContainerOne>
                <div className="gap-2 flex w-full">
                    <div className="w-1/3">
                    </div>
                    <div className="w-2/3 flex  gap-2">
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
    );
}