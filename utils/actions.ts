import db from './db';
import { auth, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { CreateJobType, JobType } from './types';
import { Prisma } from '@prisma/client';

const getAuthUser = ()=>{
  const {userId}= auth();
  if(!userId) return redirect("/");
  return userId
}


export async function createJobAction(values:CreateJobType):Promise<JobType | null>{ 
  const userId = getAuthUser()
  try {
    const newJob = await db.job.create({
      data:{
        clerkId:userId,
        ...values
      }
    })
    // return newJob
  } catch (error) {
    console.log(error);
    return null
  }
  redirect('/');
}

type GetAllJobsAction ={
  search?:string,
  jobStatus?:string,
  page?:number,
  limit?:number,
}

export async function getAllJobsActions({jobStatus,limit =10,page =1,search}:GetAllJobsAction):Promise<{
  jobs:JobType[],page:number,count:number,totalPages:number
}> {
  const userId = getAuthUser()
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId:userId,
    }
    if(search){
      whereClause = {
        ...whereClause,
        OR:[
          {position:{contains:search}} ,
          {company:{contains:search}},
        ]
      }
    }
    if(jobStatus && jobStatus != 'all'){
      whereClause ={
        ...whereClause,
        status:jobStatus
      }
    }
    const jobs = await db.job.findMany({
      where:whereClause,
      orderBy:{
        createdAt:"desc"
      }
    })
    return {jobs, count:0, page:1,totalPages:0 }
  } catch (error) {
    return {jobs:[], count:0, page:1,totalPages:0 }
  }
}