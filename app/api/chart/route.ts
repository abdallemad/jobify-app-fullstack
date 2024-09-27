import { NextRequest } from "next/server";
import { getChartsDataAction } from "@/utils/actions";


export const GET = async (req:NextRequest)=>{
  const chartData = await getChartsDataAction();
  return Response.json(chartData)
}