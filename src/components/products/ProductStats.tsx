import StatsCard from '@/components/StatsCard';
import {API_ENDPOINTS} from '@/lib/api';
import Dot from "@/components/utils/Dot";
import {useFetcher} from "@/app/hooks/useFetcher";
import React from "react";
import Badge from "@/components/utils/Badge";

export default function ProductStats() {
    const {data: result = {}, isLoading, error} = useFetcher(API_ENDPOINTS.PRODUCT_STATS);
    const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
    const {inactive, active, market, market_total, total} = result;
    const isAdmin = currentUser?.role?.toString().toLowerCase() === 'admin';
    const shopTotal = total ?? inactive + active;

    return (
        <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {inactive !== undefined && active !== undefined && (
                <>
                    {isAdmin ? (
                        <StatsCard
                            label={<><Dot variant="secondary" size="medium"/> Total available variants</>}
                            data={inactive + active}
                            cardColor="bg-white"
                            textColor="text-slate-900"
                        />
                    ) : (
                        <>
                            <StatsCard
                                label={<><Dot variant="secondary" size="medium"/> My shop variants</>}
                                data={shopTotal}
                                cardColor="bg-white"
                                textColor="text-slate-900"
                            >
                                <Badge variant="success" size="small">Active {active}</Badge>
                                <Badge variant="danger" size="small">Inactive {inactive}</Badge>
                            </StatsCard>
                            {market !== undefined && (
                                <StatsCard
                                    label={<><Dot variant="secondary" size="medium"/> Market variants</>}
                                    data={market_total ?? market}
                                    cardColor="bg-sky-50"
                                    textColor="text-sky-700"
                                >
                                    <Badge variant="secondary" size="small">Remaining {market}</Badge>
                                </StatsCard>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
