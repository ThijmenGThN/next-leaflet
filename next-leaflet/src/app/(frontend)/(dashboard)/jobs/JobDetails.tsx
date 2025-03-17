"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, XCircle, Play } from "lucide-react"
import { mockHeartbeats } from "@/lib/mock-data"
import { Job } from "@/types/payload-types"

export default function JobDetails({ job, onClose }: { onClose: () => void; job: Job }) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "running":
        return <Badge className="bg-green-500">Running</Badge>
      case "stopped":
        return <Badge className="bg-gray-500">Stopped</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2">
          Job Details: {job.jobName} {getStatusBadge(job.status ? job.status : "No status")}
        </DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heartbeats">Heartbeats</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Job Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Job Name:</div>
                  <div className="col-span-2 text-sm">{job.jobName}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Provider:</div>
                  <div className="col-span-2 text-sm">{job.providerName}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Proxy:</div>
                  <div className="col-span-2 text-sm">{job.proxy}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Pool:</div>
                  <div className="col-span-2 text-sm">{job.pool}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Type:</div>
                  <div className="col-span-2 text-sm">{job.type}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Status Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Status:</div>
                  <div className="col-span-2 text-sm">{job.status}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Threads:</div>
                  <div className="col-span-2 text-sm">{job.threads}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">URL:</div>
                  <div className="col-span-2 text-sm">{job.status}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Last Heartbeat:</div>
                  <div className="col-span-2 text-sm">{job.lastHeartbeat}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            {job.status?.toLowerCase() === "running" ? (
              <Button variant="destructive" size="sm">
                <XCircle className="mr-2 h-4 w-4" />
                Stop Job
              </Button>
            ) : (
              <Button variant="default" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Start Job
              </Button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="heartbeats" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Heartbeats</h3>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHeartbeats.map((heartbeat, index) => (
                    <TableRow key={index}>
                      <TableCell>{heartbeat.timestamp}</TableCell>
                      <TableCell>
                        {heartbeat.status === "OK" ? (
                          <Badge className="bg-green-500">OK</Badge>
                        ) : (
                          <Badge className="bg-red-500">Error</Badge>
                        )}
                      </TableCell>
                      <TableCell>{heartbeat.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <DialogFooter className="mt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </>
  )
}
