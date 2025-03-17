"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

export function LineChart({ data }: { data: { label: string; value: number }[] }) {
  const chartData = data.map((d) => ({ x: d.label, y: d.value }))
  const chartConfig = {
    y: {
      label: "Requests",
      color: "hsl(var(--chart-1))"
    }
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <RechartsLineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="x" tickLine={false} axisLine={false} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsLine dataKey="y" stroke="var(--color-y)" strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ChartContainer>
  )
}

export function BarChart({ data }: { data: { name: string; value: number }[] }) {
  const chartData = data.map((d) => ({ x: d.name, y: d.value }))
  const chartConfig = {
    y: {
      label: "Count",
      color: "hsl(var(--chart-2))"
    }
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <RechartsBarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="x" tickLine={false} axisLine={false} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="y" fill="var(--color-y)" radius={4} />
      </RechartsBarChart>
    </ChartContainer>
  )
}
