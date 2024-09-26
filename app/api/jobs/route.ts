import { NextRequest, NextResponse } from "next/server";
import { CreateJobType, JobType } from "@/utils/types";
import db from '@/utils/db'
import { getAllJobsActions } from "@/utils/actions";
import { deleteJobAction,editJobAction } from "@/utils/actions";


export const POST = async (req:NextRequest)=>{
  const values = await req.json() as CreateJobType & { clerkId:string }
  
  try {
    const newJob = await db.job.create({
      data:{
        ...values
      }
    })
    return Response.json(newJob)
    // return newJob
  } catch (error) {
    console.log(error);
    return Response.json(null)
  }
}

export const GET = async (req:NextRequest)=>{
  const {searchParams} = new URL(req.url);
  const search = searchParams.get('search') as string ?? ''
  const jobStatus= searchParams.get('jobStatus') as string ?? ''
  const pageNumber = Number(searchParams.get('page')) || 1;
  const data = await getAllJobsActions({search,jobStatus,page:pageNumber});
  return NextResponse.json(data)
}

export const DELETE = async (req:NextRequest)=>{
  const {searchParams} = new URL(req.url);
  const jobId = searchParams.get("jobId") as string
  const job = await deleteJobAction(jobId);
  
  return Response.json({job})
}

export const PATCH = async (req:NextRequest)=>{
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id") as string
  console.log(id)
  const data =await req.json() as CreateJobType
  console.log(data)
  const job = await editJobAction(id,data)
  return Response.json({job})
}