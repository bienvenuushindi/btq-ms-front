import StatsCard from '@/components/StatsCard';
import {API_ENDPOINTS} from '@/lib/api';
import Dot from "@/components/utils/Dot";
import {useFetcher} from "@/app/hooks/useFetcher";
import React from "react";
export default function ProductStats() {
    const {data: result = {}, isLoading, error} = useFetcher(API_ENDPOINTS.PRODUCT_STATS);
    const {inactive, active} = result;

    return (
        <div className="flex gap-4">
            {inactive !== undefined && active !== undefined && (
                <>
                    <StatsCard
                        label={<><Dot variant="secondary" size="medium"/> Total</>}
                        data={inactive + active}
                        cardColor="bg-gray-50"
                        textColor="text-gray-500"
                    />
                    <StatsCard
                        label={<><Dot variant="success" size="medium"/> Active</>}
                        data={active}
                        cardColor="bg-gray-50"
                        textColor="text-green-800"
                    />
                    <StatsCard
                        label={<><Dot variant="danger" size="medium"/> Inactive</>}
                        data={inactive}
                        cardColor="bg-gray-50"
                        textColor="text-red-800"
                    />
                </>
            )}
        </div>
    );
}
