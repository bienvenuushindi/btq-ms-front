import StatsCard from '@/components/StatsCard';
import {API_ENDPOINTS} from '@/lib/api';
import Dot from "@/components/utils/Dot";
import {useFetcher} from "@/app/hooks/useFetcher";
import React from "react";
export default function ProductStats() {
    const {data: result = {}, isLoading, error} = useFetcher(API_ENDPOINTS.PRODUCT_STATS);
    const {inactive, active} = result;

    return (
        <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
            {inactive !== undefined && active !== undefined && (
                <>
                    <StatsCard
                        label={<><Dot variant="secondary" size="medium"/> Total</>}
                        data={inactive + active}
                        cardColor="bg-white"
                        textColor="text-slate-900"
                    />
                    <StatsCard
                        label={<><Dot variant="success" size="medium"/> Active</>}
                        data={active}
                        cardColor="bg-emerald-50"
                        textColor="text-emerald-700"
                    />
                    <StatsCard
                        label={<><Dot variant="danger" size="medium"/> Inactive</>}
                        data={inactive}
                        cardColor="bg-orange-50"
                        textColor="text-primary"
                    />
                </>
            )}
        </div>
    );
}
