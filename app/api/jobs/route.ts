import { NextRequest } from "next/server";
import { CreateJobType } from "@/utils/types";
import db from '@/utils/db'


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