import {format} from 'date-fns';
import {useRequisition} from '@/app/hooks/useRequisition';
import Card from '@/components/Card';
import Text from '@/components/Text';
import React, {useContext, useEffect} from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import {Calendar, CreditCard, Globe, Layers, PlusCircle} from 'react-feather';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {RequisitionContext} from '@/components/requisitions/RequisitionContext';
import Loading from '@/components/state/Loading';
import NotFound from '@/components/state/NotFound';
import RequisitionDetailsCard from "@/components/requisitions/home-page/RequisitionDetailsCard";

export default function RequisitionItem({title, date}) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const {requisition, error, isLoading} = useRequisition(formattedDate);

    return (
        <>
            <Card className="w-full h-36">
                <Text intent="primary" size="medium" className="font-extrabold">{title}</Text>
                {isLoading ? (
                    <Loading/>
                ) : (
                    <ErrorBoundary error={error}>
                        {requisition && <RequisitionInfo requisition={requisition}/>}
                        {!requisition && <NotFound/>}
                    </ErrorBoundary>
                )}
            </Card>
        </>
    );
}

export function RequisitionInfoWithContext({requisition, withLink = true}) {
    const {setCurrency} = useContext(RequisitionContext)
    useEffect(() => {
        setCurrency(requisition.price_currency)
    }, [requisition, setCurrency])

    return (
        <RequisitionInfo requisition={requisition} withLink={false}/>
    )
}

export function RequisitionInfo({requisition, withLink = true}) {
    const details = [
        {icon: <Calendar/>, label: 'Scheduled Date', value: requisition.date},
        {icon: <CreditCard/>, label: 'Products Bought', value: requisition.count_products_bought},
        {icon: <Layers/>, label: 'Total Price', value: requisition.total_price},
        {icon: <Globe/>, label: 'Currency', value: requisition.price_currency},
    ];
    return (
        <ul className="flex gap-2 my-2">
            {details.map((detail, index) => (
                <li key={`requisition-detail-${index}`}>
                    <RequisitionDetailsCard {...detail} />
                </li>
            ))}
            {
                withLink && (
                    <li className="justify-self-stretch">
                        <Card className="h-full flex items-center">
                            <ViewMore requisitionID={requisition.id}/>
                        </Card>
                    </li>
                )
            }

        </ul>
    )
}

export function ViewMore({requisitionID}) {
    const router = useRouter()
    const handleViewMoreClick = () => {
        router.push(`/requisitions/${requisitionID}`);
    };

    return (
        <Button
            size="medium"
            intent="primary"
            className="flex items-center gap-1 h-full"
            onClick={handleViewMoreClick}
        >
            <PlusCircle size={16} color="#ffffff" />
            <span className="text-neutral-50 font-bold">More</span>
        </Button>
    );
}