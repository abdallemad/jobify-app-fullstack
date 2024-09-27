'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import StatsCard from "./StatsCard"
type StatsType = {
  pending: number;
  interview: number;
  declined: number;
}
function StatsContainer() {
  const {data,isPending} = useQuery({
    queryKey:['stats'],
    queryFn:()=> axios.get('/api/stats').then(res=>res.data) as Promise<StatsType>
  })
  
  return (
    <>
    <h2 className="text-3xl font-semibold mb-8">Job Stats</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24">
      <StatsCard title={'Pending Jobs'} amount={data?.pending || 0} />
      <StatsCard title={'Declined Jobs'} amount={data?.declined || 0} />
      <StatsCard title={'Interview Jobs'} amount={data?.interview || 0} />
    </div>
    </>
  )
}

export default StatsContainer
