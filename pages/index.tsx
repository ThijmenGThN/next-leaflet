
import Features from '@/components/Features'

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className='mx-8 flex flex-col gap-10 items-center'>
        <a className='text-white py-2 px-8 rounded border-b-primary-active border-b-4 bg-primary font-semibold text-2xl mt-14' target="_blank" rel="norefferer" href="https://github.com/ThijmenGThN/next-leaflet">next-leaflet</a>

        <div className='w-full max-w-[512px]'>
          <Features />
        </div>
      </div>
    </div>
  )
}
