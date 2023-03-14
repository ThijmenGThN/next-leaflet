import type { NextApiRequest, NextApiResponse } from 'next'

import Directus from '@/resources/lib/directus'

export default async function API(req: NextApiRequest, res: NextApiResponse) {

  const SDK = await Directus({ useAdmin: true })

  res.status(200).json('Pong!')

}
