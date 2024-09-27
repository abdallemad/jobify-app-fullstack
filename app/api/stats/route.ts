import { NextRequest } from "next/server";
import { getStatsAction } from "@/utils/actions";


export const GET = async(req:NextRequest)=>{
  const stats = await getStatsAction();
  return Response.json(stats)
}