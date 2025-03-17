import type { CollectionConfig } from 'payload'

export const Heartbeats: CollectionConfig = {
  slug: "heartbeats",
  labels: {
    singular: "Heartbeat",
    plural: "Heartbeats",
  },
  fields: [
    {
      name: "job",
      type: "relationship",
      relationTo: "jobs",
      required: true,
    },
    {
      name: "timestamp",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: "message",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "OK", value: "OK" },
        { label: "Error", value: "error" },
      ],
      defaultValue: "OK",
    },
  ],
}