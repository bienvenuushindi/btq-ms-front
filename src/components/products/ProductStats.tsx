import StatsCard from '@/components/StatsCard';
import useSWRImmutable from 'swr/immutable';
import {API_URL, authFetcher} from '@/lib/api';
import Dot from "@/components/utils/Dot";

export default function ProductStats() {
    const {data: result = {}, isLoading, error} = useSWRImmutable(
        API_URL + '/products/stats',
        authFetcher
    );
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
