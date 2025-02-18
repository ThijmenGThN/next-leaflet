
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './src/backend/collections/Users'
import { Media } from './src/backend/collections/Media'

import { migrations } from './src/backend/migrations'

if (!process.env.PAYLOAD_SECRET) throw new Error('No environment variable for PAYLOAD_SECRET defined, use the .env.example file.')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const secret = process.env.PAYLOAD_SECRET

export default buildConfig({
  secret,
  serverURL: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000',
  collections: [
    Users,
    Media
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  db: sqliteAdapter({
    client: {
      url: "file:database.db",
      authToken: process.env.PAYLOAD_SECRET,
    },
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, './src/backend/migrations'),
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'info@upalert.me',
    defaultFromName: 'UpAlert',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  csrf: [process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"],
  cors: [process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000"],
  typescript: {
    outputFile: path.resolve(dirname, './src/types/payload-types.ts'),
  },
  sharp,
})
