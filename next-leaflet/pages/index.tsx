import Features from 'source/components/Features'

import Directus from '@/types/Directus'

export default function Index({ API }: { API: Directus }) {

  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-3 mt-5 font-bold">
        <p className="mt-1.5">NextJS</p>

        <span className="pt-2 pb-1 pl-3 pr-1 text-white bg-blue-500 rounded">
          TS
        </span>
      </div>

      <Features />
    </div>
  )
}
