'use client';
import JobCard from "./JobCard"
import { useSearchParams } from "next/navigation"
import {  
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query"
import axios from "axios";
import { JobType } from "@/utils/types";
import LoadingContainer from "../globals/LoadingContainer";
import ButtonContainer from "./ButtonContainer";
type DataType = {jobs:JobType[],page:number,count:number,totalPages:number} | null;


function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const pageNumber = Number(searchParams.get('page') as string) || 1;

  const queryClient = new QueryClient();
  const {data,isPending} = useQuery({
    queryKey:['jobs',search,jobStatus,pageNumber],
    queryFn: ()=> {
      try {
        return axios.get('/api/jobs',{params:{search,jobStatus,page:pageNumber}}).then(res=>res.data) as Promise<DataType>
      } catch (error) {
        return {jobs:[], count:0, page:1,totalPages:0 }
      }
    }})

  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const totalPages = data?.totalPages || 0;
  const page = data?.page || 1;
  if(isPending) return <div className='grid md:grid-cols-2 gap-8'>
  <LoadingContainer />
  <LoadingContainer />
</div>

  if(jobs.length == 0 ) return <h2 className="text-xl">no jobs found..</h2>
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize">{count} jobs found</h2>
        {
          totalPages < 2 ? null: <ButtonContainer currentPage={page} totalPages={totalPages} />
        }
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map(job=>{
          return <JobCard key={job.id} job={job} />
        })}
      </div>
    </HydrationBoundary>
  )
}

export default JobsList
