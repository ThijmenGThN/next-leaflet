
import PocketBase from 'pocketbase'

import Login from '@/components/auth/Login'

export default function Page() {

    const pb = new PocketBase('http://10.0.0.112:8090')

    return (
        <div className='container mx-auto pt-16 flex flex-col gap-y-8'>
            <p className='text-3xl font-semibold'>
                next-leaflet
            </p>

            <div className='grid grid-cols-2 gap-8'>

                <div className='bg-gray-50 rounded-lg p-8 border shadow-sm'>
                    {
                        pb.authStore.isValid ? (
                            <button onClick={pb.authStore.clear} className='bg-black rounded text-white px-4 py-2'>
                                Logout
                            </button>
                        )
                            : <Login />
                    }
                </div>

                <div className='bg-gray-50 rounded-lg p-8 border shadow-sm'>
                    <p>
                        {JSON.stringify(pb.authStore)}
                    </p>
                </div>

            </div>
        </div>
    )
}
