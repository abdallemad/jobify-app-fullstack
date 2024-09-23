
import * as z from 'zod';

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}
// here is the validation.
export const formSchema =z.object({
  position: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  company: z.string().min(2,{message:'company cant be less than 2'}),
  location: z.string().min(2,{message:'location cant be less than 2'}),
  mode:z.nativeEnum(JobMode),
  status:z.nativeEnum(JobStatus),
});
export type CreateJobType = z.infer<typeof formSchema>