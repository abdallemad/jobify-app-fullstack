import JobsList from '@/components/all-jobs/JobsList';
import SearchForm from '@/components/all-jobs/SearchForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllJobsActions } from '@/utils/actions';
async function jobs() {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey:['jobs','','all',1],
    queryFn: ()=> getAllJobsActions({})
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm /> 
      <JobsList />
    </HydrationBoundary>
  )
}

export default jobs
