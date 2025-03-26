import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

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

export default buildConfig({
  email,
  sharp,
  collections,
  secret: process.env.PAYLOAD_SECRET as string,
  serverURL: process.env.NEXT_PUBLIC_DOMAIN as string,
  csrf: [process.env.NEXT_PUBLIC_DOMAIN as string],
  cors: [process.env.NEXT_PUBLIC_DOMAIN as string],
  db: postgresAdapter({
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, './src/backend/migrations'),
    pool: {
      connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${(process.env.DATABASE_HOST == "0.0.0.0" && process.env.COMPOSE_PROFILES == "prod") ? "database" : process.env.DATABASE_HOST == "0.0.0.0"}:${process.env.DATABASE_PORT}/${process.env.DATABASE_TABLE}`
    },
  }),
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
