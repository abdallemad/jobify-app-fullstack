import db from './db';
import { auth, getAuth, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CreateJobType, JobType } from './types';
import { Job, Prisma } from '@prisma/client';
import dayjs from 'dayjs'
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

export async function getAllJobsActions({jobStatus,limit =10,page =1,search}:GetAllJobsAction):Promise<{jobs:JobType[],page:number,count:number,totalPages:number}> {
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
        status:jobStatus,
      }
    }
    const jobs = await db.job.findMany({
      where:whereClause,
      orderBy:{
        createdAt:"desc"
      },
      skip:(page-1)*limit,
      take:limit,
    })
    // this more fast than make the server calculate it.
    const count:number = await db.job.count({
      where:whereClause
    })
    return {jobs, count, page: page,totalPages: Math.ceil(count/limit) }
  } catch (error) {
    return {jobs:[], count:0, page:1,totalPages:0 }
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = getAuthUser();
  try {
    const job: JobType = await db.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
}
export async function getSingleJobAction(id:string):Promise<JobType | null>{
  const userId = getAuthUser();
  try {
    const job = await db.job.findUnique({
      where:{
        id:id,
        clerkId:userId
      }
    })
    return job
  } catch (error) {
    redirect('/jobs');
    return null
  }
}

export async function editJobAction(id:string,values:CreateJobType):Promise<JobType | null>{
  const userId = getAuthUser();
  try {
    const newJob = await db.job.update({
      where:{
        id:id,
        clerkId:userId,
      },
      data:{
        ...values
      }
    })
    return newJob
  } catch (error) {
    return null
  }
}

export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  const userId = getAuthUser();
  // just to show Skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const stats = await db.job.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
      where: {
        clerkId: userId, // replace userId with the actual clerkId
      },
    });
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    redirect('/jobs');
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = getAuthUser();
  const sixMonthsAgo = dayjs().subtract(1, 'year').subtract(6,'month').toDate();
  try {
    const jobs = await db.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);
    return applicationsPerMonth;
  } catch (error) {
    redirect('/jobs');
  }
}