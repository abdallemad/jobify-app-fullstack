"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type StatsType = {
  pending: number;
  interview: number;
  declined: number;
};

export const description = "A donut chart with text";

const chartConfig = {
  count: {
    label: "Count",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--warning))",
  },
  declined: {
    label: "Declined",
    color: "hsl(var(--destructive))",
  },
  interview: {
    label: "Interview",
    color: "hsl(var(--success))",
  },
} satisfies ChartConfig;

function convertData(data: StatsType) {
  return [
    { status: "pending", count: data?.pending || 0, fill: "hsl(var(--warning))" },
    { status: "declined", count: data?.declined || 0, fill: "hsl(var(--destructive))" },
    { status: "interview", count: data?.interview || 0, fill: "hsl(var(--primary))" },
  ];
}

export default function StatsChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => axios.get("/api/stats").then((res) => res.data) as Promise<StatsType>,
  });

  // Always call useMemo, even when data is not available yet
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return convertData(data);
  }, [data]);

  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (!data) return null; // Return null if no data is available

  return (
    <Card className="flex flex-col bg-muted self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Jobs Status</CardTitle>
        <CardDescription>Current jobs status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="status" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Interview rate: {((data?.interview / totalCount) * 100).toFixed(1)}%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing current jobs status</div>
      </CardFooter>
    </Card>
  );
}
