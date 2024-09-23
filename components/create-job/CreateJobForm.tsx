'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CustomField, CustomSelect } from './FormComponents';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { JobMode ,JobStatus } from '@/utils/types';
import { formSchema } from '@/utils/types';


function CreateJobForm() {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: '',
      location:"",
      company:"",
      mode:JobMode.FullTime,
      status:JobStatus.Pending,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-center bg-muted rounded p-8'>
        <CustomField name='position' control={form.control} />
        <CustomField name='company' control={form.control} />
        <CustomField name='location' control={form.control} />
        <CustomSelect name='mode' control={form.control} items={Object.values(JobMode)} labelText='job mode'/>
        <CustomSelect name='status' control={form.control} items={Object.values(JobStatus)} labelText='job mode'/>
        <Button type='submit' className='self-end capitalize'>add job</Button>
      </form>
    </Form>
  );
}

export default CreateJobForm;