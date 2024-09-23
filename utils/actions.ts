import db from './db';
import { auth, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { CreateJobType, JobType } from './types';

const getAuthUser =async ()=>{
  const user =await currentUser();
  if(!user) return redirect("/");
  return user
}


export async function createJobAction(values:CreateJobType):Promise<JobType | null>{ 
  const user =await getAuthUser()
  try {
    const newJob = await db.job.create({
      data:{
        clerkId:user.id,
        ...values
      }
    })

    return newJob
  } catch (error) {
    console.log(error);
    return null
  }
}