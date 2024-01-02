import StatsCard from '@/components/StatsCard';
import useSWRImmutable from 'swr/immutable';
import {API_URL, authFetcher} from '@/lib/api';

export default function ProductStats() {
  const { data: result = {}, isLoading, error } = useSWRImmutable(
    API_URL + '/products/stats',
    authFetcher
  );
  const { inactive, active } = result;

  return (
      <div className="flex gap-4">
        {inactive !== undefined && active !== undefined && (
          <>
            <StatsCard
              label="Total Products"
              data={inactive + active}
              cardColor="bg-blue-100"
              textColor="text-blue-800"
            />
            <StatsCard
              label="Active Products"
              data={active}
              cardColor="bg-green-100"
              textColor="text-green-800"
            />
            <StatsCard
              label="Inactive Products"
              data={inactive}
              cardColor="bg-red-100"
              textColor="text-red-800"
            />
          </>
        )}
      </div>
  );
}
