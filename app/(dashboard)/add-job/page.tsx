'use client';
import CreateJobForm from "@/components/create-job/CreateJobForm"
import { 
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query"

function page() {
  const queryClient = new QueryClient();
  return (
    <>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
    </>
  )
}

export default page
