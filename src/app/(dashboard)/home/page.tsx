'use client';

import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import Container from '@/components/utils/wrappers/Container';
import RequisitionsHeader from '@/components/requisitions/RequisitionsHeader';
import React, {useState} from 'react';
import { Calendar } from "@/components/ui/calendar"
import 'react-calendar/dist/Calendar.css';
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import {RequisitionInfoWrapper} from "@/components/requisitions/home-page/sections/RequisitionInfoWrapper";
import {RequisitionItemByDate} from "@/components/requisitions/home-page/RequisitionItemByDate";
import ProtectedRoute from "@/components/ProtectedRoute";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const onChange = (newDate: any) => {
        setDate(newDate);
    };
    return (
        <ProtectedRoute>
            <Container>
                <RequisitionsHeader/>
                <ContainerOne>
                    <div className="flex w-full gap-4 items-stretch bg-gray-100 py-4 px-2 rounded">
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose Day</CardTitle>
                                <CardDescription>Please select date to view requisitions for that day.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={onChange}
                                    className="rounded-md border"
                                />
                            </CardContent>
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