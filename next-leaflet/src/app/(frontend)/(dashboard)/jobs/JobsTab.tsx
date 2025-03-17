"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RefreshCw, Search, Plus } from "lucide-react"
import { Job } from "@/types/payload-types"
import JobTable from "./JobsTable"
import JobDetails from "./JobDetails"
import CreateJobDialog from "./CreateJobDialog"

export default function JobsTab({ jobs }: { jobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showNewJobDialog, setShowNewJobDialog] = useState(false)
  const [showJobDetails, setShowJobDetails] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Jobs Management</h2>
        <Button size="sm" onClick={() => setShowNewJobDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Job List</CardTitle>
              <CardDescription>Manage and monitor your proxy jobs</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search jobs..." className="pl-8 w-full sm:w-[200px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="stopped">Stopped</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <JobTable jobs={jobs} searchTerm={searchTerm} statusFilter={statusFilter} onJobClick={setSelectedJob} onShowDetails={setShowJobDetails} />
        </CardContent>
      </Card>

      {selectedJob && (
        <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
          <DialogContent className="sm:max-w-[800px]">
            <JobDetails job={selectedJob} onClose={() => setShowJobDetails(false)} />
          </DialogContent>
        </Dialog>
      )}

      <CreateJobDialog open={showNewJobDialog} onOpenChange={setShowNewJobDialog} />
    </div>
  )
}
