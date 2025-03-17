import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, XCircle } from "lucide-react"
import { Job } from "@/types/payload-types"

export default function JobTable({ jobs, searchTerm, statusFilter, onJobClick, onShowDetails }: { jobs: Job[], searchTerm: string, statusFilter: string, onJobClick: (job: Job) => void, onShowDetails: (open: boolean) => void }) {
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) || job.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) || job.pool?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status?.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Name</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Pool</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Threads</TableHead>
          <TableHead>Last Heartbeat</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No jobs found</TableCell>
          </TableRow>
        ) : (
          filteredJobs.map(job => (
            <TableRow key={job.id} className="cursor-pointer" onClick={() => { onJobClick(job); onShowDetails(true) }}>
              <TableCell className="font-medium">{job.jobName}</TableCell>
              <TableCell>{job.providerName}</TableCell>
              <TableCell>{job.pool}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>
                <Badge className={job.status === "running" ? "bg-green-500" : job.status === "stopped" ? "bg-gray-500" : "bg-yellow-500"}>
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>{job.threads}</TableCell>
              <TableCell>{job.lastHeartbeat}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  {job.status === "running" ? <XCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
