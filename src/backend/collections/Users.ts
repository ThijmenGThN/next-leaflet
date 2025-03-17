import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  // {
  // cookies: {
  // secure: process.env.NODE_ENV === 'production',
  // sameSite: 'None',
  // },
  // },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "firstname",
      type: "text",
      required: true,
    },
    {
      name: "lastname",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "user",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    }
  ],
  timestamps: true,
}
