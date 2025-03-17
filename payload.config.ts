import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { migrations } from '@/backend/migrations'
import { Users } from '@/backend/collections/Users'

const collections = [
  Users,
]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const email = process.env.SMTP_HOST ? nodemailerAdapter({
  defaultFromName: process.env.MAIL_DEFAULT_NAME ?? "Next Leaflet",
  defaultFromAddress: process.env.MAIL_DEFAULT_ADDRESS ?? "next@leaflet.app",
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
  },
}) : undefined

const db = !process.env.DATABASE_URI?.startsWith("file:")
  ? postgresAdapter({
    prodMigrations: migrations,
    pool: {
      connectionString: `${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATBASE_HOST}:${process.env.DATBASE_PORT}/${process.env.DATABASE_TABLE}`
    },
    migrationDir: path.resolve(dirname, './src/backend/migrations'),
  })
  : sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL ?? "file:database.db",
      authToken: process.env.DATABASE_PASS,
    }
  })

export default buildConfig({
  db,
  email,
  sharp,
  collections,
  secret: process.env.PAYLOAD_SECRET ?? '',
  serverURL: process.env.NEXT_PUBLIC_DOMAIN ?? 'http://localhost:3000',
  csrf: [process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"],
  cors: [process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, './src/types/payload-types.ts')
  },
})
