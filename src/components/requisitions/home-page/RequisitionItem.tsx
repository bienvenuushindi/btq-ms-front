import {format} from 'date-fns';
import {useRequisition} from '@/app/hooks/useRequisition';
import Card from '@/components/Card';
import Text from '@/components/Text';
import React, {useContext, useEffect} from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import InfoItem from '@/components/InfoItem';

import {
  Calendar,
  CreditCard, Frown,
  Globe,
  Layers,
  PlusCircle
} from 'react-feather';
import {tagColors} from '@/lib/utils';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {RequisitionContext} from '@/components/requisitions/RequisitionContext';
import Loading from '@/components/state/Loading';
import NotFound from '@/components/state/NotFound';

export default function RequisitionItem({title, date}) {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const {requisition, error, isLoading} = useRequisition(formattedDate)
  return (
    <>
      <Card className="w-full h-36">
        <Text intent="primary" size="large" className="font-extrabold">{title}</Text>
        {isLoading ? (
           <Loading />
        ) : (
          <ErrorBoundary error={error}>
            {
              requisition ? (
                <RequisitionInfo requisition={requisition}/>
              ) : (
               <NotFound />
              )
            }
          </ErrorBoundary>
        )}
      </Card>
    </>
  )
}

export function RequisitionInfoWithContext({requisition, withLink = true}) {
  const {setCurrency} = useContext(RequisitionContext)
  useEffect(() => {
    setCurrency(requisition.price_currency)
  }, [requisition])

  return (
    <RequisitionInfo requisition={requisition} withLink={false}/>
  )
}

export function RequisitionInfo({requisition, withLink = true}) {
  return (
    <ul className="flex gap-2 my-2">
      <li>
        <Card>
          <InfoItem
            label={<><Calendar size={16} color={tagColors.primary}/><span
              className="text-light font-bold">Schedule Date</span></>}
            value={requisition.date}/>
        </Card>
      </li>
      <li>
        <Card>
          <InfoItem
            label={<><CreditCard size={16} color={tagColors.primary}/><span
              className="text-light font-bold"> Bought</span></>}
            value={requisition.count_products_bought + ' Product(s)'}/>
        </Card>
      </li>
      <li>
        <Card>
          <InfoItem
            label={<><Layers size={16} color={tagColors.primary}/> <span
              className="text-light font-bold"> Total Price</span></>}
            value={requisition.total_price}/>
        </Card>

      </li>
      <li>
        <Card>
          <InfoItem
            label={<><Globe size={16} color={tagColors.primary}/> <span
              className="text-light font-bold">Currency</span></>}
            value={requisition.price_currency}/>
        </Card>

      </li>
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
  return (
    <Button
      size="medium"
      intent="primary"
      className="flex items-center gap-1 h-full"
      onClick={async () => {
        await router.push('/requisitions/' + requisitionID)
      }}>
      <PlusCircle size={16} color="#ffffff"/>
      <span className="text-neutral-50  font-bold">More</span>
    </Button>

  )
}