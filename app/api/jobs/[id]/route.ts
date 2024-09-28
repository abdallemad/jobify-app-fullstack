import { getSingleJobAction } from "@/utils/actions";
import { NextRequest } from "next/server";


export const GET = async (req:NextRequest)=>{
  const id = req.url?.split('/').pop() as string
  
  const job = await getSingleJobAction(id);
  return Response.json(job);
}