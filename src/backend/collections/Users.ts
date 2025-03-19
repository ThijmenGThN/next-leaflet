import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
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
      name: "verified",
      type: "checkbox",
      defaultValue: false,
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
