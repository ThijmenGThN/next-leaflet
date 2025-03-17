"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { LineChart, BarChart } from "@/components/Chart"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Server, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StatisticsTab({ stats }: { stats: any }) {
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <div className="w-full max-w-7xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Proxy Statistics Dashboard</h2>
        <div className="mt-2 sm:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.requestsChange > 0 ? "+" : ""}
              {stats.requestsChange}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <Progress value={stats.successRate} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              {stats.responseTimeChange < 0 ? "" : "+"}
              {stats.responseTimeChange}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProviders}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {stats.topProviders.slice(0, 3).map((provider: any) => (
                <Badge key={provider.name} variant="outline" className="text-xs">
                  {provider.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-1/2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Request Volume Over Time</CardTitle>
            <CardDescription>Number of requests processed per hour</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={stats.requestsOverTime} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Providers</CardTitle>
            <CardDescription>Request volume by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={stats.topProviders} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Top countries by request volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.geoDistribution.map((country: any) => (
                <div key={country.name} className="flex items-center">
                  <div className="w-[30%] font-medium">{country.name}</div>
                  <div className="w-[60%]">
                    <Progress value={country.percentage} className="h-2" />
                  </div>
                  <div className="w-[10%] text-right text-sm">{country.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Proxy Type Performance</CardTitle>
          <CardDescription>Success rate and response time by proxy type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase border-b">
                <tr>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Success Rate</th>
                  <th className="px-6 py-3">Avg. Response Time</th>
                  <th className="px-6 py-3">Request Count</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.proxyTypePerformance.map((type: any) => (
                  <tr key={type.name} className="border-b">
                    <td className="px-6 py-4 font-medium">{type.name}</td>
                    <td className="px-6 py-4">{type.successRate}%</td>
                    <td className="px-6 py-4">{type.avgResponseTime}ms</td>
                    <td className="px-6 py-4">{type.requestCount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {type.successRate >= 90 ? (
                        <Badge className="bg-green-500">Excellent</Badge>
                      ) : type.successRate >= 75 ? (
                        <Badge className="bg-yellow-500">Good</Badge>
                      ) : (
                        <Badge className="bg-red-500">Poor</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
