"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios"

export const description = "A responsive single column bar chart showing job application counts by month"
type ChartDataType = {date:string, count:number}[]


export default function ChartContainer() {
  const {data:chartData,isPending} = useQuery({
    queryKey:['charts'],
    queryFn:()=> axios.get('/api/chart').then(res=>res.data) as Promise<ChartDataType>
  })
  if(isPending) return null
  if(!chartData) return <h1>no data</h1>
  if(chartData.length == 0) return <h2>you don't hae any jobs yet tod display the chart</h2>
  return (
    <Card className="w-full bg-muted self-start">
      <CardHeader className="text-center lg:text-start">
        <CardTitle className="text-xl sm:text-2xl">Job Applications by Month</CardTitle>
        <CardDescription>Number of job applications submitted each month</CardDescription>
      </CardHeader>
      <CardContent className="p-1 sm:p-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 2']}
              />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" name="Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm ">
        <div className="font-medium leading-none">
          Total applications: {chartData.reduce((sum, item) => sum + item.count, 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing job application counts from Apr 2023 to Sep 2024
        </div>
      </CardFooter>
    </Card>
  )
}
