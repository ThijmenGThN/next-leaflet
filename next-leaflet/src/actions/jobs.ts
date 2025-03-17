"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getJobs() {
  const payload = await getPayload({ config })
  const jobsResult = await payload.find({ collection: "jobs", limit: 1000 })
  const heartbeatsResult = await payload.find({ collection: "heartbeats", limit: 1000, sort: "-timestamp" })
  const jobsMap = jobsResult.docs.map((job) => {
    const latest = heartbeatsResult.docs.find((hb) => hb.job === job.id)
    return { ...job, lastHeartbeat: latest?.timestamp ?? null }
  })
  return jobsMap
}

export async function createJob(data: any) {
  const payload = await getPayload({ config })
  const newJob = await payload.create({
    collection: "jobs",
    data
  })
  return newJob
}
