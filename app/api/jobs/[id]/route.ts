import { NextApiRequest } from "next"
import { getSingleJobAction } from "@/utils/actions";


export const GET = async (req:NextApiRequest)=>{
  const id = req.url?.split('/').pop()
  // @ts-ignore
  const job = await getSingleJobAction(id);
  return Response.json(job);
}