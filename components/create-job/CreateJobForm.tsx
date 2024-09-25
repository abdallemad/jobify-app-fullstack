'use client';

import axios from 'axios'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomField, CustomSelect } from './FormComponents';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { formSchema , CreateJobType, JobMode ,JobStatus } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateJobForm() {
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const {isSignedIn,user} = useUser()
  const router = useRouter()


  const {mutate,isPending} = useMutation({
    mutationFn:async (values:CreateJobType)=> {
      
      if(!isSignedIn) return router.push('/')
      try {
      return await axios.post('/api/jobs',{...values,clerkId:user.id},{
        headers:{
          'Content-Type':'application/json',
        }
      }).then(result=>result.data);
      } catch (error) {
        return null
      }
  },
  onSuccess:(data)=>{
    // display the toast
    if(!data){
      toast({
        description:"there was an error please try again later.",
      })
      return;
    }
    toast({
      description:"Job Add Successfully."
    })
    // revalidate the queries that doesn't exists yet.
    queryClient.invalidateQueries({ queryKey: ['jobs'] });
    queryClient.invalidateQueries({ queryKey: ['stats'] });
    queryClient.invalidateQueries({ queryKey: ['charts'] });
    // reset the form and redirect 
    form.reset();
    router.push('/jobs');
  }
  })
  
  const form = useForm<CreateJobType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: '',
      location:"",
      company:"",
      mode:JobMode.FullTime,
      status:JobStatus.Pending,
    },
  });

  function onSubmit(values: CreateJobType) {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-center bg-muted rounded p-8'>
        <CustomField name='position' control={form.control} />
        <CustomField name='company' control={form.control} />
        <CustomField name='location' control={form.control} />
        <CustomSelect name='mode' control={form.control} items={Object.values(JobMode)} labelText='job mode'/>
        <CustomSelect name='status' control={form.control} items={Object.values(JobStatus)} labelText='job mode'/>
        <Button type='submit' className='self-end capitalize' disabled={isPending}>
          {
            isPending?'loading..':'create job'
          }
      </Button>
      </form>
    </Form>
  );
}

export default CreateJobForm;