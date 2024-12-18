
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './src/backend/collections/Users'
import { Media } from './src/backend/collections/Media'

// import { migrations } from './src/backend/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: "file:/src/backend/database/data.db",
      authToken: process.env.PAYLOAD_SECRET,
    },
    // prodMigrations: migrations,
    migrationDir: path.resolve(dirname, 'backend/migrations'),
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
})
