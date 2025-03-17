import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: "jobs",
  labels: {
    singular: "Job",
    plural: "Jobs",
  },
  fields: [
    {
      name: "jobName",
      type: "text",
      required: true,
    },
    {
      name: "providerName",
      type: "text",
    },
    {
      name: "pool",
      type: "text",
    },
    {
      name: "URL",
      type: "text",
    },
    {
      name: "proxy",
      type: "text",
    },
    {
      name: "type",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Running", value: "running" },
        { label: "Pending", value: "pending" },
        { label: "Stopped", value: "stopped" },
        { label: "Failed", value: "failed" },
      ],
      defaultValue: "pending",
    },
    {
      name: "threads",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "lastHeartbeat",
      type: "date",
    },
  ],
}
