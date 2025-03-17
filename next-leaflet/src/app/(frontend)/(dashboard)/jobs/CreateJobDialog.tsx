"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogPortal } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createJob } from "@/actions/jobs"
import { useRouter } from "next/navigation"

export default function CreateJobDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const router = useRouter()

  const [jobName, setJobName] = useState("")
  const [provider, setProvider] = useState("")
  const [proxy, setProxy] = useState("")
  const [pool, setPool] = useState("")
  const [type, setType] = useState("")
  const [url, setUrl] = useState("")
  const [threads, setThreads] = useState(1)
  const [status, setStatus] = useState("pending")

  const handleCreateJob = async () => {
    await createJob({ jobName, providerName: provider, proxy, pool, type, url, threads, status })
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
          </DialogHeader>
          <Label>Job Name</Label>
          <Input value={jobName} onChange={(e) => setJobName(e.target.value)} placeholder="Job Name" />
          <Label>Provider</Label>
          <Input value={provider} onChange={(e) => setProvider(e.target.value)} placeholder="Provider" />
          <Label>Proxy</Label>
          <Input value={proxy} onChange={(e) => setProxy(e.target.value)} placeholder="Proxy" />
          <Label>Pool</Label>
          <Input value={pool} onChange={(e) => setPool(e.target.value)} placeholder="Pool" />
          <Label>Type</Label>
          <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
          <Label>URL</Label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
          <Label>Threads</Label>
          <Input type="number" value={threads} onChange={(e) => setThreads(Number(e.target.value))} placeholder="Threads" />
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="stopped">Stopped</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleCreateJob}>Create</Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
