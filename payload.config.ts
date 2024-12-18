
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './src/backend/collections/Users'
import { Media } from './src/backend/collections/Media'

import { migrations } from './src/backend/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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
  secret: process.env.PAYLOAD_SECRET || '',
  db: sqliteAdapter({
    client: {
      url: "file:./src/backend/database/data.db",
      authToken: process.env.PAYLOAD_SECRET,
    },
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, './src/backend/migrations'),
  }),
  typescript: {
    outputFile: path.resolve(dirname, './src/types/payload-types.ts'),
  },
  editor: lexicalEditor(),
  sharp,
})
