import StatsContainer from '@/components/stats/StatusContainer';
import ChartsContainer from '@/components/stats/ChartsContainer';
import StatsChart from '@/components/stats/StatsChart';
import { getChartsDataAction, getStatsAction } from '@/utils/actions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function StatsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:['stats'],
    queryFn:()=>getStatsAction()
  })
  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartsContainer />
        <StatsChart />
      </div>
    </HydrationBoundary>
  );
}
export default StatsPage;