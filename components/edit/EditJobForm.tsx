'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  formSchema,
  CreateJobType,
  JobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomField, CustomSelect } from '../create-job/FormComponents';
import { useMutation, useQueryClient, useQuery, useMutationState } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingContainer from '../globals/LoadingContainer';
function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient()
  const router = useRouter();
  const {toast} = useToast();

  const {data, isPending:isPendingQuery} = useQuery({
    queryKey:['job',jobId],
    queryFn: async ()=> {
      try {
        const job = await axios.get(`/api/jobs/${jobId}`).then(res=>res.data) as JobType
        console.log(job)
        return job
      } catch (error) {
        return null
      }
    }
  })

  const form = useForm<CreateJobType>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    }
  })
  const {mutate,isPending} = useMutation({
    mutationFn:(values:CreateJobType)=> axios.patch(`/api/jobs`,values,{params:{id:jobId}}).then(res=>res.data),
    onSuccess:(data)=>{
      if(!data){
        toast({description:"some thing went wrong"});
        return null 
      }
      toast({description:"updated successfully"});
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      router.push('/jobs');
    }
  })
  const handleSubmit = (values:CreateJobType)=>{
    mutate(values)
  }
  if(isPendingQuery) return <div className='grid md:grid-cols-2 gap-8'>
    <LoadingContainer />
    <LoadingContainer />
  </div>
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='bg-muted rounded p-8'>
        <h2 className="text-4xl capitalize mb-4">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CustomField name='position' control={form.control}  />
          <CustomField name='company' control={form.control} />
          <CustomField name='location' control={form.control} />
          <CustomSelect name='status' control={form.control} items={Object.values(JobStatus)} />
          <CustomSelect name='mode' control={form.control} items={Object.values(JobMode)} />
          <Button type='submit' className='capitalize self-end' variant={'default'} disabled={isPending}>
            {isPending?'loading..':'edit job'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default EditJobForm;